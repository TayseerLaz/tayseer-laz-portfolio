import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import GooeyText from './GooeyText'
import './RainingLetters.css'

const ALL_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'

export default function RainingLetters() {
  const [characters, setCharacters] = useState([])
  const [activeIndices, setActiveIndices] = useState(new Set())
  const sectionRef = useRef(null)
  const visibleRef = useRef(false)
  const frameRef = useRef(null)

  const createCharacters = useCallback(() => {
    const chars = []
    for (let i = 0; i < 200; i++) {
      chars.push({
        char: ALL_CHARS[Math.floor(Math.random() * ALL_CHARS.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        speed: 0.08 + Math.random() * 0.2,
      })
    }
    return chars
  }, [])

  useEffect(() => {
    setCharacters(createCharacters())
  }, [createCharacters])

  useEffect(() => {
    const id = setInterval(() => {
      if (!visibleRef.current) return
      const s = new Set()
      const n = Math.floor(Math.random() * 3) + 2
      for (let i = 0; i < n; i++) s.add(Math.floor(Math.random() * 200))
      setActiveIndices(s)
    }, 80)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const update = () => {
      if (!visibleRef.current) { frameRef.current = requestAnimationFrame(update); return }
      setCharacters((prev) =>
        prev.map((c) => {
          const ny = c.y + c.speed
          if (ny >= 100) {
            return { ...c, y: -5, x: Math.random() * 100, char: ALL_CHARS[Math.floor(Math.random() * ALL_CHARS.length)] }
          }
          return { ...c, y: ny }
        })
      )
      frameRef.current = requestAnimationFrame(update)
    }
    frameRef.current = requestAnimationFrame(update)
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { visibleRef.current = e.isIntersecting }, { threshold: 0.05 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="rain-section" ref={sectionRef}>
      <div className="rain-center">
        <div className="rain-circle-wrap">
          <motion.svg
            className="rain-circle-svg"
            viewBox="0 0 500 200"
            fill="none"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <title>Circle accent</title>
            <motion.path
              d="M 420 40
                 C 500 120, 440 180, 250 185
                 C 80 185, 20 150, 25 100
                 C 30 50, 120 15, 250 15
                 C 380 15, 430 60, 420 80"
              fill="none"
              strokeWidth="3"
              stroke="#b85456"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: {
                  pathLength: 1,
                  opacity: 1,
                  transition: { pathLength: { duration: 2, ease: [0.43, 0.13, 0.23, 0.96] }, opacity: { duration: 0.3 } },
                },
              }}
            />
          </motion.svg>
          <GooeyText
            texts={['Building Products', 'Crafting Interfaces', 'Shipping Solutions', 'Designing Systems', 'Writing Code']}
            morphTime={1}
            cooldownTime={2}
          />
        </div>
      </div>
      {characters.map((c, i) => (
        <span
          key={i}
          className={`rain-char${activeIndices.has(i) ? ' rain-char--active' : ''}`}
          style={{ left: `${c.x}%`, top: `${c.y}%` }}
        >
          {c.char}
        </span>
      ))}
    </section>
  )
}
