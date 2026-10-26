import { useEffect, useRef, useState, type ReactNode } from 'react'
import { site } from '../content'
import './CaseStudy.css'
import './OmniSign.css'
import './HaderAI.css'
import './Lancaster.css'
import './Bsheel.css'
import { img, SIZES, footerAlt } from '../img'
import Cover from './Cover'
import { MailLink } from './Email'

const B = site.bsheel
const CH = [
  { id: 'intro', k: '01 · Product' }, { id: 'site', k: '02 · The site' }, { id: 'role', k: '03 · My role' }, { id: 'plan', k: '04 · UX plan & design' },
  { id: 'screens', k: '05 · The screens' }, { id: 'features', k: '06 · What it does' }, { id: 'built', k: '07 · How it was built' }, { id: 'stack', k: '08 · Stack' },
]

export default function Bsheel({ onClose, standalone = false, related }: { onClose: () => void; standalone?: boolean; related?: ReactNode }) {
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
      if (vis[0]) setActive((vis[0].target as HTMLElement).id.replace('bs-', ''))
    }, { root: standalone ? null : root, rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.2, 0.5] })
    root.querySelectorAll('.cs-ch').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [standalone])
  const go = (id: string) => scroller.current?.querySelector(`#bs-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <div className="cs os hd bs" role={standalone ? undefined : "dialog"} aria-modal={standalone ? undefined : true} aria-labelledby="bs-title" ref={scroller}>
      <header className="cs__bar">
        {standalone ? <a className="cs__close" href="/#work" aria-label="Back to portfolio">←</a> : (<button ref={closeRef} className="cs__close" onClick={onClose} aria-label="Close project">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>)}
        <div className="cs__head">
          <Title id="bs-title" className="cs__title">{B.title}</Title>
          <p className="cs__sub">{B.subtitle}</p>
        </div>
        <div className="os-links">
          <a className="btn btn--line cs__repo" href={B.site} target="_blank" rel="noreferrer">bsheel.app</a>
          <a className="btn btn--line cs__repo" href={B.appStore} target="_blank" rel="noreferrer">App Store</a>
          <a className="btn btn--line cs__repo" href={B.playStore} target="_blank" rel="noreferrer">Google Play</a>
        </div>
      </header>
      <nav className="cs__rail" aria-label="Chapters">
        {CH.map((c) => <a key={c.id} href={`#bs-${c.id}`} className={active === c.id ? 'is-on' : ''} onClick={(event) => { event.preventDefault(); go(c.id) }}>{c.k}</a>)}
      </nav>

      <main className="cs__main">
        <section className="cs-ch os-hero" id="bs-intro">
          <div className="cs-ch__inner os-hero__grid">
            <div className="os-hero__copy">
              <img className="os-logo hd-logo bs-icon" {...img('/images/logos/bsheel.webp', SIZES.logo)} alt="Bsheel app icon" />
              <h3 className="cs-ch__title hd-title">Do the damn thing.</h3>
              <p className="cs-ch__body">{B.subtitle}</p>
              <p className="os-tags">{B.tags.join(' · ')}</p>
              <ul className="os-stats">
                {B.stats.map((s) => <li key={s.label}><strong>{s.num}</strong><span>{s.label}</span></li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="cs-ch bs-sitech" id="bs-site">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">The site</h3>
            <p className="cs-ch__body">bsheel.app: the quest of the day, highlights, the live leaderboard, how it works and the manifesto.</p>
            <a className="hd-shot bs-site" href={B.site} target="_blank" rel="noreferrer">
              <img {...img('/images/work/bsheel/site.webp', SIZES.hero)} alt="bsheel.app home page: Do the damn thing, with the quest of the day on a phone" loading="lazy" />
              <span className="bs-site__cap">bsheel.app, live. Click to open.</span>
            </a>
          </div>
        </section>

        <section className="cs-ch hd-role" id="bs-role">
          <div className="cs-ch__inner os-two">
            <div>
              <h3 className="cs-ch__title">{B.role.title}</h3>
              <p className="cs-ch__body hd-role__body">{B.role.body}</p>
              <ul className="hd-me">{B.role.me.map((m) => <li key={m}>{m}</li>)}</ul>
            </div>
            <div>
              <h4 className="os-h4 hd-h4">Three people in the loop</h4>
              <ul className="hd-team">
                {B.role.loops.map((l) => <li key={l.k}><strong>{l.k}</strong><p>{l.v}</p></li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="cs-ch lc-plan" id="bs-plan">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">{B.plan.title}</h3>
            <p className="cs-ch__body">{B.plan.intro}</p>

            <h4 className="os-h4">The core loop</h4>
            <ol className="bs-loop">
              {B.plan.loop.map((step, i) => <li key={step}><span>{i + 1}</span>{step}</li>)}
            </ol>

            <h4 className="os-h4">Screen outline</h4>
            <div className="lc-map">
              {B.plan.outline.map((g) => (
                <div key={g.name} className="lc-map__group">
                  <strong>{g.name}</strong>
                  <ul>{g.screens.map((p) => <li key={p}>{p}</li>)}</ul>
                </div>
              ))}
            </div>

            <h4 className="os-h4">{B.plan.design.label}</h4>
            <ul className="lc-swatches bs-swatches">
              {B.plan.design.tokens.map((t) => <li key={t.k}><span style={{ background: t.swatch }} /><strong>{t.k}</strong><em>{t.v}</em></li>)}
            </ul>
            <dl className="adr hd-adr lc-type">
              {B.plan.design.type.map((r) => <div key={r.k} className="adr__row"><dt>{r.k}</dt><dd>{r.v}</dd></div>)}
            </dl>
          </div>
        </section>

        <section className="cs-ch bs-screens" id="bs-screens">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">The screens</h3>
            <p className="cs-ch__body">The v1.1.6 release slides, straight from the app.</p>
            <ul className="bs-grid">
              {B.screens.map((s) => (
                <li key={s.src}>
                  <figure><img {...img(`/images/work/bsheel/${s.src}.webp`, SIZES.phone)} alt={s.cap} loading="lazy" /><figcaption>{s.cap}</figcaption></figure>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="cs-ch hd-built bs-features" id="bs-features">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">What it does</h3>
            <ol className="hd-built">
              {B.features.map((f, i) => (
                <li key={f.t}><span className="hd-built__num">{String(i + 1).padStart(2, '0')}</span><h4>{f.t}</h4><p>{f.d}</p></li>
              ))}
            </ol>
          </div>
        </section>

        <section className="cs-ch hd-meta" id="bs-built">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">How it was built</h3>
            <ol className="hd-meta">
              {B.built.map((it) => <li key={it.t}><strong>{it.t}</strong><p>{it.how}</p></li>)}
            </ol>
          </div>
        </section>

        <section className="cs-ch hd-stack lc-stack" id="bs-stack">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">Stack</h3>
            <dl className="adr hd-adr">
              {B.stack.map((r) => <div key={r.k} className="adr__row"><dt>{r.k}</dt><dd>{r.v}</dd></div>)}
            </dl>
          </div>
        </section>
      </main>

      {related}
      <footer className="cs__footer bs-footer">
        <Cover className="cs__footer-img" {...img('/images/footers/bsheel.webp', SIZES.footer)} alt={footerAlt['/images/footers/bsheel.webp']} loading="lazy" />
        <div className="cs__footer-line">
          <MailLink />
          <nav aria-label="Project footer"><a href="https://www.linkedin.com/in/tayseer-laz" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/TayseerLaz" target="_blank" rel="noreferrer">GitHub</a><a href={B.site} target="_blank" rel="noreferrer">bsheel.app</a></nav>
          <span>© {new Date().getFullYear()} {site.name}</span>
        </div>
      </footer>
    </div>
  )
}
