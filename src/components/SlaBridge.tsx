import { useEffect, useRef, useState, type ReactNode } from 'react'
import { site } from '../content'
import './CaseStudy.css'
import './OmniSign.css'
import './HaderAI.css'
import './SlaBridge.css'

const S = site.sla
const CH = [
  { id: 'intro', k: '01 · Product' }, { id: 'app', k: '02 · The app' }, { id: 'role', k: '03 · My role' }, { id: 'modules', k: '04 · Modules' },
  { id: 'integrations', k: '05 · Integrations' }, { id: 'jobs', k: '06 · Automation' }, { id: 'stack', k: '07 · Stack' },
]

export default function SlaBridge({ onClose, standalone = false, related }: { onClose: () => void; standalone?: boolean; related?: ReactNode }) {
  const Title = standalone ? 'h1' : 'h2'
  const closeRef = useRef<HTMLButtonElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState('intro')

  useEffect(() => {
    if (standalone) return
    const prev = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; prev?.focus() }
  }, [onClose, standalone])

  useEffect(() => {
    const root = scroller.current
    if (!root) return
    const io = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      if (vis[0]) setActive((vis[0].target as HTMLElement).id.replace('sb-', ''))
    }, { root: standalone ? null : root, rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.2, 0.5] })
    root.querySelectorAll('.cs-ch').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [standalone])
  const go = (id: string) => scroller.current?.querySelector(`#sb-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <div className="cs os hd sb" role={standalone ? undefined : "dialog"} aria-modal={standalone ? undefined : true} aria-labelledby="sb-title" ref={scroller}>
      <header className="cs__bar">
        {standalone ? <a className="cs__close" href="/#work" aria-label="Back to portfolio">←</a> : (<button ref={closeRef} className="cs__close" onClick={onClose} aria-label="Close project">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>)}
        <div className="cs__head">
          <Title id="sb-title" className="cs__title">{S.title}</Title>
          <p className="cs__sub">{S.subtitle}</p>
        </div>
        <div className="os-links">
          <a className="btn btn--line cs__repo" href={S.site} target="_blank" rel="noreferrer">bridge.aligned-tech.com</a>
        </div>
      </header>
      <nav className="cs__rail" aria-label="Chapters">
        {CH.map((c) => <a key={c.id} href={`#sb-${c.id}`} className={active === c.id ? 'is-on' : ''} onClick={(event) => { event.preventDefault(); go(c.id) }}>{c.k}</a>)}
      </nav>

      <main className="cs__main">
        <section className="cs-ch os-hero" id="sb-intro">
          <div className="cs-ch__inner os-hero__grid">
            <div className="os-hero__copy">
              <img className="sb-logo" src="/images/logos/aligned-white.webp" alt="Aligned" width={1235} height={204} />
              <h3 className="cs-ch__title hd-title">One system the company runs on.</h3>
              <p className="cs-ch__body">{S.subtitle}</p>
              <p className="os-tags">{S.tags.join(' · ')}</p>
              <ul className="os-stats">
                {S.stats.map((s) => <li key={s.label}><strong>{s.num}</strong><span>{s.label}</span></li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="cs-ch sb-app" id="sb-app">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">Behind the login</h3>
            <p className="cs-ch__body">Aligned ERP lives at bridge.aligned-tech.com, one sign-in for the whole company.</p>
            <figure className="hd-shot sb-hero__shot">
              <img src="/images/work/sla/login.webp" alt="Aligned ERP sign-in at bridge.aligned-tech.com" width={1440} height={900} loading="lazy" />
              <figcaption>bridge.aligned-tech.com. The app sits behind this login, so the screens past it hold client data and are not shown.</figcaption>
            </figure>
          </div>
        </section>

        <section className="cs-ch hd-role" id="sb-role">
          <div className="cs-ch__inner os-two">
            <div>
              <h3 className="cs-ch__title">{S.role.title}</h3>
              <p className="cs-ch__body hd-role__body">{S.role.body}</p>
              <ul className="hd-me">{S.role.me.map((m) => <li key={m}>{m}</li>)}</ul>
            </div>
            <div>
              <h4 className="os-h4 hd-h4">Who uses it</h4>
              <ul className="hd-team">
                {S.role.users.map((u) => <li key={u.k}><strong>{u.k}</strong><p>{u.v}</p></li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="cs-ch hd-built" id="sb-modules">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">What is in it</h3>
            <p className="cs-ch__body">Twelve modules, each a set of tables, an API module and a page in the staff app.</p>
            <ol className="hd-built">
              {S.modules.map((m, i) => (
                <li key={m.t}><span className="hd-built__num">{String(i + 1).padStart(2, '0')}</span><h4>{m.t}</h4><p>{m.d}</p></li>
              ))}
            </ol>
          </div>
        </section>

        <section className="cs-ch hd-meta" id="sb-integrations">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">Connected to the tools the team already uses</h3>
            <p className="cs-ch__body">Aligned ERP is the hub. The helpdesk, the project tool, the documentation system and WhatsApp all feed it or are fed by it.</p>
            <ol className="hd-meta">
              {S.integrations.map((it) => <li key={it.k}><strong>{it.k}</strong><p>{it.v}</p></li>)}
            </ol>
          </div>
        </section>

        <section className="cs-ch sb-jobs" id="sb-jobs">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">What runs on its own</h3>
            <p className="cs-ch__body">Five scheduled jobs in Beirut time, plus a catch-up run every time the API starts.</p>
            <ol className="sb-clock">
              {S.jobs.map((j) => <li key={j.when}><strong>{j.when}</strong><p>{j.what}</p></li>)}
            </ol>
          </div>
        </section>

        <section className="cs-ch hd-stack sb-stack" id="sb-stack">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">Stack</h3>
            <dl className="adr hd-adr">
              {S.stack.map((r) => <div key={r.k} className="adr__row"><dt>{r.k}</dt><dd>{r.v}</dd></div>)}
            </dl>
          </div>
        </section>
      </main>

      {related}
      <footer className="cs__footer os-footer">
        <img src="/images/footers/sla.webp" alt="" width={1920} height={1072} loading="lazy" />
        <div className="cs__footer-line">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <nav aria-label="Project footer"><a href="https://www.linkedin.com/in/tayseer-laz" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/TayseerLaz" target="_blank" rel="noreferrer">GitHub</a><a href={S.site} target="_blank" rel="noreferrer">bridge.aligned-tech.com</a></nav>
          <span>© {new Date().getFullYear()} {site.name}</span>
        </div>
      </footer>
    </div>
  )
}
