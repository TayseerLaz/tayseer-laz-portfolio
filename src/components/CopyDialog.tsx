import { useEffect, useRef, useState } from 'react'
import './CopyDialog.css'

/** Classic Mac OS "Copy" progress dialog: plays while a project opens. */
const DURATION = 700
const ITEMS = 4

export default function CopyDialog({ name, onDone, onStop }: { name: string; onDone: () => void; onStop: () => void }) {
  const [t, setT] = useState(0)
  const raf = useRef(0)
  const stopRef = useRef(onStop)
  stopRef.current = onStop

  useEffect(() => {
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION)
      setT(p)
      if (p < 1) raf.current = requestAnimationFrame(tick)
      else onDone()
    }
    raf.current = requestAnimationFrame(tick)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') stopRef.current() }
    window.addEventListener('keydown', onKey)
    return () => { cancelAnimationFrame(raf.current); window.removeEventListener('keydown', onKey) }
  }, [onDone])

  const remaining = Math.max(1, ITEMS - Math.floor(t * ITEMS))
  const seconds = Math.max(1, Math.ceil((1 - t) * (DURATION / 1000)))
  const segments = 32
  const filled = Math.round(t * segments)

  return (
    <div className="cd" role="dialog" aria-modal="true" aria-live="polite" aria-label={`Opening ${name}`}>
      <div className="cd__win">
        <div className="cd__title"><span className="cd__stripes" aria-hidden="true" /><span className="cd__name">Copy</span><span className="cd__stripes" aria-hidden="true" /></div>

        <div className="cd__body">
          <div className="cd__anim" aria-hidden="true">
            <Folder />
            <span className="cd__page" style={{ left: `calc(18% + ${t * 100}% * 0.64)`, transform: `translateY(${Math.sin(t * Math.PI) * -14}px)` }}>
              <svg viewBox="0 0 16 20"><path d="M1 1h9l5 5v13H1z" fill="#fff" stroke="#000" /><path d="M10 1v5h5" fill="none" stroke="#000" /><path d="M4 9h8M4 12h8M4 15h6" stroke="#000" /></svg>
            </span>
            <Folder />
          </div>

          <p className="cd__row"><strong>Copying:</strong> “{name}”</p>
          <p className="cd__row"><strong>To:</strong> “Tayseer Laz”</p>

          <div className="cd__bar" aria-hidden="true">
            {Array.from({ length: segments }, (_, i) => <span key={i} className={i < filled ? 'is-on' : ''} />)}
          </div>

          <p className="cd__row cd__row--small">Items remaining to be copied: {remaining}</p>
          <p className="cd__row cd__row--small">Time remaining: about {seconds} second{seconds === 1 ? '' : 's'}</p>

          <button className="cd__stop" onClick={onStop}>Stop</button>
        </div>
      </div>
    </div>
  )
}

function Folder() {
  return (
    <svg className="cd__folder" viewBox="0 0 40 30" aria-hidden="true">
      <path d="M1 7h13l3 3h22v18H1z" fill="#8FB3E6" stroke="#000" />
      <path d="M1 12h38v16H1z" fill="#C5DAF5" stroke="#000" />
    </svg>
  )
}
