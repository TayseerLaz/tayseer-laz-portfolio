import { useEffect, useRef } from 'react'
import './ArrowField.css'

const COLS = 14
const ROWS = 8

export default function ArrowField() {
  const sectionRef = useRef(null)
  const wordRef = useRef(null)
  const arrowsRef = useRef([])
  const wrapsRef = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const state = {
      cursor: null,
      angles: new Array(COLS * ROWS).fill(0),
      positions: [],
      rect: section.getBoundingClientRect(),
      lockedToWord: false,
      wordCenter: null,
    }

    const computePositions = () => {
      state.rect = section.getBoundingClientRect()
      state.positions = []
      const cellW = state.rect.width / COLS
      const cellH = state.rect.height / ROWS
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          state.positions.push({
            x: cellW * (c + 0.5),
            y: cellH * (r + 0.5),
          })
        }
      }
    }

    const onMouseMove = (e) => {
      state.rect = section.getBoundingClientRect()
      state.cursor = {
        x: e.clientX - state.rect.left,
        y: e.clientY - state.rect.top,
      }
    }

    const onMouseLeave = () => {
      state.cursor = null
      state.lockedToWord = false
      section.classList.remove('af-section--locked')
    }

    const onTouchMove = (e) => {
      const t = e.touches[0]
      if (!t) return
      state.rect = section.getBoundingClientRect()
      state.cursor = {
        x: t.clientX - state.rect.left,
        y: t.clientY - state.rect.top,
      }
    }

    const onTouchEnd = () => {
      state.cursor = null
      state.lockedToWord = false
      section.classList.remove('af-section--locked')
    }

    // Direct hover detection on the central word — bulletproof
    const onWordEnter = () => {
      state.lockedToWord = true
      section.classList.add('af-section--locked')
    }
    const onWordLeave = () => {
      state.lockedToWord = false
      section.classList.remove('af-section--locked')
    }
    if (wordRef.current) {
      wordRef.current.addEventListener('mouseenter', onWordEnter)
      wordRef.current.addEventListener('mouseleave', onWordLeave)
    }

    let frameId
    const tick = () => {
      const fallback = { x: state.rect.width / 2, y: state.rect.height / 2 }
      const target = state.cursor || fallback

      for (let i = 0; i < state.positions.length; i++) {
        const arrow = arrowsRef.current[i]
        const wrap = wrapsRef.current[i]
        if (!arrow || !wrap) continue
        const pos = state.positions[i]
        const dx = target.x - pos.x
        const dy = target.y - pos.y

        // Only update rotation when arrows are visible (not locked).
        if (!state.lockedToWord) {
          const targetAngle = Math.atan2(dy, dx)
          let current = state.angles[i]
          let diff = ((targetAngle - current + Math.PI * 3) % (Math.PI * 2)) - Math.PI
          current += diff * 0.18
          state.angles[i] = current
          arrow.style.transform = `rotate(${current}rad)`

          // Proximity glow
          const dist = Math.hypot(dx, dy)
          const proximity = Math.max(0, 1 - dist / 280)
          wrap.style.opacity = String(0.28 + proximity * 0.65)
          wrap.style.color = proximity > 0.5
            ? `rgba(184, 84, 86, ${0.4 + proximity * 0.6})`
            : `rgba(251, 245, 234, ${0.18 + proximity * 0.4})`
        } else {
          // Locked — let CSS handle the YOU text styling
          wrap.style.opacity = ''
          wrap.style.color = ''
        }
      }
      frameId = requestAnimationFrame(tick)
    }

    computePositions()
    const ro = new ResizeObserver(computePositions)
    ro.observe(section)
    section.addEventListener('mousemove', onMouseMove, { passive: true })
    section.addEventListener('mouseleave', onMouseLeave)
    section.addEventListener('touchmove', onTouchMove, { passive: true })
    section.addEventListener('touchend', onTouchEnd)
    frameId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frameId)
      ro.disconnect()
      section.removeEventListener('mousemove', onMouseMove)
      section.removeEventListener('mouseleave', onMouseLeave)
      section.removeEventListener('touchmove', onTouchMove)
      section.removeEventListener('touchend', onTouchEnd)
      if (wordRef.current) {
        wordRef.current.removeEventListener('mouseenter', onWordEnter)
        wordRef.current.removeEventListener('mouseleave', onWordLeave)
      }
    }
  }, [])

  const cells = []
  for (let i = 0; i < COLS * ROWS; i++) {
    const c = i % COLS
    const r = Math.floor(i / COLS)
    cells.push(
      <div
        key={i}
        ref={(el) => (wrapsRef.current[i] = el)}
        className="af-arrow-wrap"
        style={{
          left: `${((c + 0.5) / COLS) * 100}%`,
          top: `${((r + 0.5) / ROWS) * 100}%`,
        }}
      >
        <svg
          ref={(el) => (arrowsRef.current[i] = el)}
          className="af-arrow"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M3 12 L21 12 M14 5 L21 12 L14 19"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="af-mini-word" aria-hidden="true">YOU</span>
      </div>
    )
  }

  return (
    <section className="af-section" ref={sectionRef}>
      <div className="af-arrows" aria-hidden="true">{cells}</div>

      <div className="af-center">
        <span className="af-eyebrow">All eyes on</span>
        <h2 className="af-word" ref={wordRef}>YOU</h2>
      </div>
    </section>
  )
}
