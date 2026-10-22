import { useRef } from 'react'
import { site } from '../content'
import './Process.css'

/** Card colours in the site palette; the first two are dark, so their text is cream. */
const TONES = [
  { bg: '#0B2F26', dark: true }, { bg: '#1E9A58', dark: true }, { bg: '#C9E265', dark: false },
  { bg: '#A8DBC1', dark: false }, { bg: '#F6C945', dark: false },
]

type Step = { title: string; body: string }
const STEPS = site.process.steps as Step[]

export default function Process() {
  const track = useRef<HTMLUListElement>(null)
  const step = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('.feat')
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 320) + 20), behavior: 'smooth' })
  }

  return (
    <section className="proc" id="process">
      <div className="wrap proc__inner">
        <h2 className="h2 proc__title">
          {site.process.title.split('\n').map((l) => <span key={l}>{l}</span>)}
        </h2>
      </div>

      <div className="carousel">
        <ul className="carousel__track" ref={track} aria-label="What I do, card by card">
          {STEPS.map((s, i) => {
            const tone = TONES[i % TONES.length]
            return (
              <li key={s.title} className={`feat ${tone.dark ? 'feat--dark' : ''}`} style={{ background: tone.bg }}>
                <span className="feat__num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="feat__title">{s.title}</h3>
                <p className="feat__body">{s.body}</p>
              </li>
            )
          })}
        </ul>
        <div className="carousel__nav">
          <button onClick={() => step(-1)} aria-label="Previous card"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
          <button onClick={() => step(1)} aria-label="Next card"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
        </div>
      </div>
    </section>
  )
}
