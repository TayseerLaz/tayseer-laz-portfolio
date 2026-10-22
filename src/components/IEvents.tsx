import { useEffect, useRef, useState } from 'react'
import { site } from '../content'
import './CaseStudy.css'
import './OmniSign.css'
import './HaderAI.css'
import './Lancaster.css'
import './Bsheel.css'
import './IEvents.css'

const E = site.ievents
const CH = [
  { id: 'intro', k: '01 · Product' }, { id: 'role', k: '02 · My role' }, { id: 'apps', k: '03 · The two apps' },
  { id: 'features', k: '04 · What it does' }, { id: 'built', k: '05 · How it was built' }, { id: 'stack', k: '06 · Stack' },
]

export default function IEvents({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState('intro')

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
      if (vis[0]) setActive((vis[0].target as HTMLElement).id.replace('ie-', ''))
    }, { root, rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.2, 0.5] })
    root.querySelectorAll('.cs-ch').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  const go = (id: string) => scroller.current?.querySelector(`#ie-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <div className="cs os hd bs ie" role="dialog" aria-modal="true" aria-labelledby="ie-title" ref={scroller}>
      <header className="cs__bar">
        <button ref={closeRef} className="cs__close" onClick={onClose} aria-label="Close project">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <div className="cs__head">
          <h2 id="ie-title" className="cs__title">{E.title}</h2>
          <p className="cs__sub">{E.subtitle}</p>
        </div>
        <div className="os-links">
          {E.links.map((l) => <a key={l.k} className="btn btn--line cs__repo" href={l.u} target="_blank" rel="noreferrer">{l.k}</a>)}
        </div>
      </header>
      <nav className="cs__rail" aria-label="Chapters">
        {CH.map((c) => <button key={c.id} className={active === c.id ? 'is-on' : ''} onClick={() => go(c.id)}>{c.k}</button>)}
      </nav>

      <main className="cs__main">
        <section className="cs-ch os-hero" id="ie-intro">
          <div className="cs-ch__inner os-hero__grid">
            <div className="os-hero__copy">
              <img className="os-logo hd-logo bs-icon ie-icon" src="/ievents-icon.png" alt="" width={512} height={512} />
              <h3 className="cs-ch__title hd-title">Every event in Qatar, one platform.</h3>
              <p className="cs-ch__body">{E.subtitle}</p>
              <p className="os-tags">{E.tags.join(' · ')}</p>
              <ul className="os-stats">
                {E.stats.map((s) => <li key={s.label}><strong>{s.num}</strong><span>{s.label}</span></li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="cs-ch hd-role" id="ie-role">
          <div className="cs-ch__inner os-two">
            <div>
              <h3 className="cs-ch__title">{E.role.title}</h3>
              <p className="cs-ch__body hd-role__body">{E.role.body}</p>
              <ul className="hd-me">{E.role.me.map((m) => <li key={m}>{m}</li>)}</ul>
            </div>
            <div>
              <h4 className="os-h4 hd-h4">Three people in the loop</h4>
              <ul className="hd-team">
                {E.role.loops.map((l) => <li key={l.k}><strong>{l.k}</strong><p>{l.v}</p></li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="cs-ch bs-screens ie-apps" id="ie-apps">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">The two apps</h3>
            <p className="cs-ch__body">One for the people planning an event, one for the vendors serving it. Both on the App Store and Google Play.</p>
            {E.apps.map((app) => (
              <div key={app.name} className="ie-app">
                <header className="ie-app__head">
                  <img src={app.icon} alt="" width={64} height={64} />
                  <div><strong>{app.name}</strong><span>{app.sub}</span></div>
                </header>
                <ul className="bs-grid ie-grid">
                  {app.shots.map((s) => (
                    <li key={s.src}>
                      <figure><img src={`/ievents/${s.src}.jpg`} alt={s.cap} width={552} height={1200} loading="lazy" /><figcaption>{s.cap}</figcaption></figure>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="cs-ch hd-built bs-features" id="ie-features">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">What it does</h3>
            <ol className="hd-built">
              {E.features.map((f, i) => (
                <li key={f.t}><span className="hd-built__num">{String(i + 1).padStart(2, '0')}</span><h4>{f.t}</h4><p>{f.d}</p></li>
              ))}
            </ol>
          </div>
        </section>

        <section className="cs-ch hd-meta" id="ie-built">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">How it was built</h3>
            <ol className="hd-meta">
              {E.built.map((it) => <li key={it.t}><strong>{it.t}</strong><p>{it.how}</p></li>)}
            </ol>
          </div>
        </section>

        <section className="cs-ch hd-stack lc-stack" id="ie-stack">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">Stack</h3>
            <dl className="adr hd-adr">
              {E.stack.map((r) => <div key={r.k} className="adr__row"><dt>{r.k}</dt><dd>{r.v}</dd></div>)}
            </dl>
          </div>
        </section>
      </main>

      <footer className="cs__footer ie-footer">
        <img src="/ievents-footer.jpg" alt="" width={2752} height={1536} loading="lazy" />
        <div className="cs__footer-line">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <nav aria-label="Project footer"><a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/TayseerLaz" target="_blank" rel="noreferrer">GitHub</a><a href={E.links[0].u} target="_blank" rel="noreferrer">App Store</a></nav>
          <span>© {new Date().getFullYear()} {site.name}</span>
        </div>
      </footer>
    </div>
  )
}
