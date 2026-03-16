import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const followerPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    const onMouseMove = (e) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
    }

    const onHoverEnter = () => document.body.classList.add('cursor-hover')
    const onHoverLeave = () => document.body.classList.remove('cursor-hover')

    document.addEventListener('mousemove', onMouseMove)

    const hoverEls = document.querySelectorAll('a, button, [data-magnetic]')
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', onHoverEnter)
      el.addEventListener('mouseleave', onHoverLeave)
    })

    let raf
    const animate = () => {
      cursor.style.left = pos.current.x + 'px'
      cursor.style.top = pos.current.y + 'px'

      followerPos.current.x += (pos.current.x - followerPos.current.x) * 0.12
      followerPos.current.y += (pos.current.y - followerPos.current.y) * 0.12
      follower.style.left = followerPos.current.x + 'px'
      follower.style.top = followerPos.current.y + 'px'

      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      hoverEls.forEach(el => {
        el.removeEventListener('mouseenter', onHoverEnter)
        el.removeEventListener('mouseleave', onHoverLeave)
      })
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-follower" ref={followerRef} />
    </>
  )
}
