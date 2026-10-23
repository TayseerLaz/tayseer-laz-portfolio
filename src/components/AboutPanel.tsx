import { useState } from 'react'
import { site } from '../content'
import './AboutPanel.css'
import { img } from '../img'

const P = site.panel

function Experience() {
  return (
    <article className="bc bc--exp">
      <ol className="tl">
        {[...P.experience].reverse().map((e) => (
          <li key={e.year + e.org}>
            <span className="tl__org">{e.org}</span>
            <span className="tl__meta">{e.role}</span>
            <span className="tl__date">{e.year}</span>
          </li>
        ))}
      </ol>
    </article>
  )
}

function Listening() {
  const [playing, setPlaying] = useState(true)
  const l = P.listening
  return (
    <article className="bc bc--music">
      <div className="vinyl-card">
        <div className={`vinyl ${playing ? 'is-spinning' : ''}`} aria-hidden="true">
          <svg viewBox="0 0 200 200">
            <defs><clipPath id="vinyl-label"><circle cx="100" cy="100" r="34" /></clipPath></defs>
            <circle cx="100" cy="100" r="98" fill="#0E0E0E" />
            {Array.from({ length: 14 }, (_, i) => <circle key={i} cx="100" cy="100" r={44 + i * 3.8} fill="none" stroke="#2A2A2A" strokeWidth="0.8" />)}
            <path d="M22 100a78 78 0 0 1 78-78" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="10" strokeLinecap="round" />
            <path d="M178 100a78 78 0 0 1-78 78" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" strokeLinecap="round" />
            <image href={l.cover} x="66" y="66" width="68" height="68" clipPath="url(#vinyl-label)" preserveAspectRatio="xMidYMid slice" />
            <circle cx="100" cy="100" r="34" fill="none" stroke="#0E0E0E" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="3.5" fill="var(--cream)" />
          </svg>
        </div>
        <p className="vinyl__title">{l.title}</p>
        <p className="vinyl__artist">1976 · {l.artist}</p>
        <div className="vinyl__row">
          <button className="vinyl__btn" onClick={() => setPlaying(!playing)} aria-label={playing ? 'Stop' : 'Play'} aria-pressed={playing}>
            {playing
              ? <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" /></svg>
              : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l12 7-12 7z" fill="currentColor" /></svg>}
          </button>
          <span className="vinyl__line" aria-hidden="true"><span /></span>
        </div>
      </div>
    </article>
  )
}

function MapCard() {
  const m = P.map
  return (
    <article className="bc bc--map">
      <svg className="map" viewBox="0 0 300 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.25">
          <path d="M-10 60h320M-10 130h320M-10 200h320M-10 250h320M60-10v320M140-10v320M220-10v320" />
          <path d="M-10 90c80 20 140-30 220 10s100 40 100 40" strokeWidth="1.6" />
          <path d="M100-10c-20 90 40 150 20 320" strokeWidth="1.2" />
        </g>
        <circle cx="150" cy="150" r="2.5" fill="var(--green)" />
        <circle cx="150" cy="150" r="6" fill="var(--green)" opacity="0.2" />
      </svg>
      <p className="map__city">{m.city}</p>
      <p className="map__area">{m.area}</p>
    </article>
  )
}

function Photo() {
  return (
    <article className="bc bc--photo">
      <img {...img('/images/site/about-photo.webp', '(max-width: 52rem) 90vw, 280px')} alt={P.photo.alt} loading="lazy" />
    </article>
  )
}

function HowIWork() {
  const [i, setI] = useState(0)
  const steps = P.how
  return (
    <article className="bc bc--how">
      <h3 className="how__title">{String(i + 1).padStart(2, '0')} {steps[i].title}</h3>
      <p className="how__body">{steps[i].body}</p>
      <div className="how__tabs" role="tablist" aria-label="Steps">
        {steps.map((s, k) => (
          <button key={s.title} role="tab" aria-selected={k === i} className={k === i ? 'is-on' : ''} onClick={() => setI(k)}>
            Step {String(k + 1).padStart(2, '0')}
          </button>
        ))}
      </div>
    </article>
  )
}

export default function AboutPanel() {
  return (
    <div className="bento">
      <Photo />
      <Experience />
      <MapCard />
      <Listening />
      <HowIWork />
    </div>
  )
}
