import { useEffect, useRef, useState } from 'react'
import { site } from '../content'
import './CaseStudy.css'

type Chapter = (typeof site.caseStudy.chapters)[number]

/** Full-screen case study: five chapters, a sticky chapter rail, one scrolling page. */
export default function CaseStudy({ onClose }: { onClose: () => void }) {
  const cs = site.caseStudy
  const closeRef = useRef<HTMLButtonElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(cs.chapters[0].id)

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; prev?.focus() }
  }, [onClose])

  useEffect(() => {
    const root = scroller.current
    if (!root) return
    const io = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      if (vis[0]) setActive((vis[0].target as HTMLElement).id.replace('cs-', ''))
    }, { root, rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.2, 0.5] })
    root.querySelectorAll('.cs-ch').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const go = (id: string) => scroller.current?.querySelector(`#cs-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <div className="cs" role="dialog" aria-modal="true" aria-labelledby="cs-title" ref={scroller}>
      <header className="cs__bar">
        <button ref={closeRef} className="cs__close" onClick={onClose} aria-label="Close case study">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <div className="cs__head">
          <h2 id="cs-title" className="cs__title">{cs.title}</h2>
          <p className="cs__sub">{cs.subtitle}</p>
        </div>
        <a className="btn btn--line cs__repo" href={cs.repo} target="_blank" rel="noreferrer">GitHub ↗</a>
      </header>

      <nav className="cs__rail" aria-label="Chapters">
        {cs.chapters.map((c) => (
          <button key={c.id} className={active === c.id ? 'is-on' : ''} onClick={() => go(c.id)}>{c.kicker}</button>
        ))}
      </nav>

      <main className="cs__main">
        {cs.chapters.map((c) => <Section key={c.id} c={c} />)}
      </main>

      <footer className="cs__footer">
        <img src="/wms/footer.jpg" alt="Pixel-art hills and clouds under a pale sky" width={1920} height={1072} loading="lazy" />
        <div className="cs__footer-line">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <nav aria-label="Case study footer">
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/TayseerLaz" target="_blank" rel="noreferrer">GitHub</a>
            <a href={cs.repo} target="_blank" rel="noreferrer">View the repo ↗</a>
          </nav>
          <span>© {new Date().getFullYear()} {site.name}</span>
        </div>
      </footer>
    </div>
  )
}

function Section({ c }: { c: Chapter }) {
  return (
    <section className={`cs-ch cs-ch--${c.id}`} id={`cs-${c.id}`} aria-labelledby={`cs-h-${c.id}`}>
      <div className="cs-ch__inner">
        <h3 id={`cs-h-${c.id}`} className="cs-ch__title">{c.title}</h3>
        <p className="cs-ch__body">{c.body}</p>

        {'questions' in c && c.questions && (
          <div className="ideas">
            <div className="page">
              <span className="page__holes" aria-hidden="true"><i /><i /><i /><i /><i /><i /></span>
              <p className="page__date">Page 1 · first week</p>
              <ol className="page__q">
                {c.questions.map((q) => <li key={q}>{q}</li>)}
              </ol>
              <p className="page__label">The flow, as sketched</p>
              <svg className="page__flow" viewBox="0 130 960 250" aria-label={c.flow.map((f) => f.name).join(' then ')}>
                <defs>
                  <filter id="wobble" x="-5%" y="-5%" width="110%" height="110%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="7" result="n" />
                    <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" />
                  </filter>
                </defs>
                <text x="20" y="282" className="sk-label">still to ask</text>
                {c.flow.map((f, i) => {
                  const x = 70 + i * 225
                  const tilt = [-1.5, 1, -1, 1.5][i % 4]
                  return (
                    <g key={f.name} filter="url(#wobble)">
                      {/* step box */}
                      <g transform={`translate(${x} 150) rotate(${tilt} 80 42)`}>
                        <path d="M6 10 q2-8 10-8 h128 q10 0 12 8 v62 q-2 10-12 10 h-128 q-10 0-12-10z" fill="#fff" stroke="var(--ink)" strokeWidth="2.6" strokeLinejoin="round" />
                        <path d="M10 14 q2-6 8-6 h120" fill="none" stroke="var(--ink)" strokeWidth="1.2" opacity="0.5" />
                        <text x="82" y="52" textAnchor="middle" className="sk-step">{f.name}</text>
                        <text x="22" y="24" className="sk-num">{i + 1}</text>
                      </g>
                      {i < c.flow.length - 1 && (
                        <path d={`M${x + 160} 192 q22 -10 44 2 M${x + 190} 182 l16 10 -14 12`} fill="none" stroke="var(--green)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                      )}
                      {/* question hook */}
                      <path d={`M${x + 80} 236 q10 20 -6 40`} fill="none" stroke="var(--green)" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 5" />
                      <g transform={`translate(${x - 10} 290) rotate(${-tilt})`}>
                        <circle cx="16" cy="16" r="13" fill="var(--mint)" stroke="var(--green)" strokeWidth="1.8" />
                        <text x="16" y="21" textAnchor="middle" className="sk-q">?</text>
                        <foreignObject x="36" y="-2" width="170" height="60">
                          <p className="sk-ask">{f.ask}</p>
                        </foreignObject>
                      </g>
                    </g>
                  )
                })}
                {/* marker underline */}
                <path d="M60 372 q220 -14 440 2 t400 -4" fill="none" stroke="var(--green)" strokeWidth="7" strokeLinecap="round" opacity="0.55" />
              </svg>
            </div>

          </div>
        )}

        {'decisions' in c && c.decisions && (
          <dl className="adr">
            {c.decisions.map((d) => (
              <div key={d.k} className="adr__row"><dt>{d.k}</dt><dd>{d.v}</dd></div>
            ))}
          </dl>
        )}

        {'code' in c && c.code && (
          <figure className="code">
            <figcaption className="code__file">{c.file}</figcaption>
            <pre><code>{c.code}</code></pre>
          </figure>
        )}

        {'groups' in c && c.groups && (
          <div className="outline">
            {c.groups.map((g) => (
              <div key={g.name} className="outline__group">
                <h4>{g.name}</h4>
                <ul>{g.screens.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
            ))}
          </div>
        )}

        {'shots' in c && c.shots && (
          <>
            <ul className="shots" aria-label="Screens">
              {c.shots.map((s) => (
                <li key={s}><img src={`/wms/${s}.jpg`} alt={s.slice(3).replace(/_/g, ' ')} width={416} height={900} loading="lazy" /></li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  )
}
