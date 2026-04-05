import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'
import { debounce } from 'lodash'
import Matter from 'matter-js'
import decomp from 'poly-decomp'

const { Bodies, Common, Engine, Mouse, MouseConstraint, Query, Runner, World } = Matter

Common.setDecomp(decomp)

function calcPos(value, containerSize, elementSize) {
  if (typeof value === 'string' && value.endsWith('%')) {
    return containerSize * (parseFloat(value) / 100)
  }
  return typeof value === 'number' ? value : elementSize - containerSize + elementSize / 2
}

const GravityContext = createContext(null)

function MatterBody({
  children,
  style,
  matterBodyOptions = { friction: 0.1, restitution: 0.1, density: 0.001 },
  x = 0,
  y = 0,
  angle = 0,
}) {
  const elementRef = useRef(null)
  const idRef = useRef(Math.random().toString(36).substring(7))
  const context = useContext(GravityContext)

  useEffect(() => {
    if (!elementRef.current || !context) return
    const id = idRef.current
    context.registerElement(id, elementRef.current, { matterBodyOptions, x, y, angle })
    return () => context.unregisterElement(id)
  }, [])

  return (
    <div ref={elementRef} style={{ position: 'absolute', pointerEvents: 'none', ...style }}>
      {children}
    </div>
  )
}

const Gravity = forwardRef(function Gravity(
  {
    children,
    gravity = { x: 0, y: 1 },
    grabCursor = true,
    resetOnResize = true,
    addTopWall = true,
    style,
  },
  ref
) {
  const containerRef = useRef(null)
  const engineRef = useRef(null)
  const runnerRef = useRef(null)
  const canvasElRef = useRef(null)
  const mcRef = useRef(null)
  const bodiesMap = useRef(new Map())
  const pendingQueue = useRef([])
  const frameId = useRef(null)
  const dragging = useRef(false)
  const ready = useRef(false)

  function addBody(id, element, props) {
    const el = containerRef.current
    if (!engineRef.current || !el) return
    const rect = el.getBoundingClientRect()
    const w = element.offsetWidth
    const h = element.offsetHeight
    const body = Bodies.rectangle(
      calcPos(props.x, rect.width, w),
      calcPos(props.y, rect.height, h),
      w, h,
      { ...props.matterBodyOptions, angle: (props.angle || 0) * (Math.PI / 180), render: { visible: false } }
    )
    World.add(engineRef.current.world, body)
    bodiesMap.current.set(id, { element, body, props })
  }

  function registerElement(id, element, props) {
    if (!ready.current) { pendingQueue.current.push({ id, element, props }); return }
    addBody(id, element, props)
  }

  function unregisterElement(id) {
    const entry = bodiesMap.current.get(id)
    if (entry && engineRef.current) {
      World.remove(engineRef.current.world, entry.body)
      bodiesMap.current.delete(id)
    }
  }

  function syncElements() {
    bodiesMap.current.forEach(({ element, body }) => {
      const { x, y } = body.position
      const deg = body.angle * (180 / Math.PI)
      element.style.transform = `translate(${x - element.offsetWidth / 2}px, ${y - element.offsetHeight / 2}px) rotate(${deg}deg)`
    })
    frameId.current = requestAnimationFrame(syncElements)
  }

  function init() {
    const el = containerRef.current
    if (!el || ready.current) return

    const w = el.offsetWidth
    const h = el.offsetHeight

    const engine = Engine.create({ gravity })
    engineRef.current = engine

    // Hidden canvas — only used as mouse target for Matter.js internals
    const canvasEl = document.createElement('canvas')
    canvasEl.width = w
    canvasEl.height = h
    // pointer-events:none — scroll passes right through
    canvasEl.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background:transparent;z-index:5;pointer-events:none;'
    el.appendChild(canvasEl)
    canvasElRef.current = canvasEl

    const mouse = Mouse.create(canvasEl)

    // Remove ALL matter-js default listeners (they block scroll)
    const src = mouse.element
    src.removeEventListener('mousewheel', mouse.mousewheel)
    src.removeEventListener('DOMMouseScroll', mouse.mousewheel)
    src.removeEventListener('mousedown', mouse.mousedown)
    src.removeEventListener('mousemove', mouse.mousemove)
    src.removeEventListener('mouseup', mouse.mouseup)
    src.removeEventListener('touchstart', mouse.mousedown)
    src.removeEventListener('touchmove', mouse.mousemove)
    src.removeEventListener('touchend', mouse.mouseup)

    const mc = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    })
    mcRef.current = mc

    const walls = [
      Bodies.rectangle(w / 2, h + 10, w, 20, { isStatic: true }),
      Bodies.rectangle(w + 10, h / 2, 20, h, { isStatic: true }),
      Bodies.rectangle(-10, h / 2, 20, h, { isStatic: true }),
    ]
    if (addTopWall) walls.push(Bodies.rectangle(w / 2, -10, w, 20, { isStatic: true }))

    World.add(engine.world, [mc, ...walls])

    // Custom mouse handling on the CONTAINER (not the canvas)
    // so scroll is never blocked. We manually feed mouse position to Matter.
    const getPos = (e) => {
      const rect = el.getBoundingClientRect()
      return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const isTouchingBody = (pos) =>
      Query.point(engine.world.bodies.filter(b => !b.isStatic), pos).length > 0

    const onMouseMove = (e) => {
      const pos = getPos(e)
      mouse.position.x = pos.x
      mouse.position.y = pos.y
      mouse.absolute.x = pos.x
      mouse.absolute.y = pos.y
      if (grabCursor && !dragging.current) {
        el.style.cursor = isTouchingBody(pos) ? 'grab' : 'default'
      }
    }

    const onMouseDown = (e) => {
      const pos = getPos(e)
      mouse.position.x = pos.x
      mouse.position.y = pos.y
      mouse.absolute.x = pos.x
      mouse.absolute.y = pos.y

      if (isTouchingBody(pos)) {
        // Only start drag if clicking on a body
        dragging.current = true
        mouse.button = 0
        if (grabCursor) el.style.cursor = 'grabbing'
      }
    }

    const onMouseUp = () => {
      dragging.current = false
      mouse.button = -1
      if (grabCursor) el.style.cursor = 'default'
    }

    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    // Store cleanup refs
    el._gravityCleanup = () => {
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
    }

    const runner = Runner.create()
    runnerRef.current = runner
    ready.current = true

    // Flush queued child registrations
    pendingQueue.current.forEach(({ id, element, props }) => addBody(id, element, props))
    pendingQueue.current = []

    Runner.run(runner, engine)
    frameId.current = requestAnimationFrame(syncElements)
  }

  function teardown() {
    if (frameId.current) cancelAnimationFrame(frameId.current)
    frameId.current = null
    if (runnerRef.current) Runner.stop(runnerRef.current)
    if (mcRef.current && engineRef.current) World.remove(engineRef.current.world, mcRef.current)
    if (canvasElRef.current?.parentNode) canvasElRef.current.remove()
    if (containerRef.current?._gravityCleanup) {
      containerRef.current._gravityCleanup()
      delete containerRef.current._gravityCleanup
    }
    if (engineRef.current) { World.clear(engineRef.current.world, false); Engine.clear(engineRef.current) }
    bodiesMap.current.clear()
    ready.current = false
    engineRef.current = null
    runnerRef.current = null
    canvasElRef.current = null
  }

  // Pause/resume based on visibility
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!runnerRef.current) return
        if (entry.isIntersecting) {
          runnerRef.current.enabled = true
          if (!frameId.current) frameId.current = requestAnimationFrame(syncElements)
        } else {
          runnerRef.current.enabled = false
          if (frameId.current) { cancelAnimationFrame(frameId.current); frameId.current = null }
        }
      },
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => { init(); return teardown }, [])

  useEffect(() => {
    if (!resetOnResize) return
    const onResize = debounce(() => { teardown(); init() }, 500)
    window.addEventListener('resize', onResize)
    return () => { window.removeEventListener('resize', onResize); onResize.cancel() }
  }, [resetOnResize])

  useImperativeHandle(ref, () => ({
    start: () => { if (runnerRef.current) runnerRef.current.enabled = true },
    stop: () => { if (runnerRef.current) runnerRef.current.enabled = false },
    reset: () => { teardown(); init() },
  }))

  return (
    <GravityContext.Provider value={{ registerElement, unregisterElement }}>
      <div
        ref={containerRef}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', ...style }}
      >
        {children}
      </div>
    </GravityContext.Provider>
  )
})

export { Gravity, MatterBody }
