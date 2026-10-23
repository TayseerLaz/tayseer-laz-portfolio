import { useEffect, useRef, useState, type ReactNode } from 'react'
import { site } from '../content'
import './CaseStudy.css'
import './OmniSign.css'
import './HaderAI.css'
import './Lancaster.css'
import { img, SIZES, footerAlt } from '../img'

const L = site.lancaster
const CH = [
  { id: 'intro', k: '01 · Product' }, { id: 'role', k: '02 · My role' }, { id: 'plan', k: '03 · Structure & design' },
  { id: 'built', k: '04 · How it was built' }, { id: 'stack', k: '05 · Stack' }, { id: 'sites', k: '06 · Final product' }, { id: 'features', k: '07 · What they do' },
]

export default function Lancaster({ onClose, standalone = false, related }: { onClose: () => void; standalone?: boolean; related?: ReactNode }) {
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
      if (vis[0]) setActive((vis[0].target as HTMLElement).id.replace('lc-', ''))
    }, { root: standalone ? null : root, rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.2, 0.5] })
    root.querySelectorAll('.cs-ch').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [standalone])
  const go = (id: string) => scroller.current?.querySelector(`#lc-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <div className="cs os hd lc" role={standalone ? undefined : "dialog"} aria-modal={standalone ? undefined : true} aria-labelledby="lc-title" ref={scroller}>
      <header className="cs__bar">
        {standalone ? <a className="cs__close" href="/#work" aria-label="Back to portfolio">←</a> : (<button ref={closeRef} className="cs__close" onClick={onClose} aria-label="Close project">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>)}
        <div className="cs__head">
          <Title id="lc-title" className="cs__title">{L.title}</Title>
          <p className="cs__sub">{L.subtitle}</p>
        </div>
        <div className="os-links">
          <a className="btn btn--line cs__repo" href={L.site} target="_blank" rel="noreferrer">lancaster.world</a>
        </div>
      </header>
      <nav className="cs__rail" aria-label="Chapters">
        {CH.map((c) => <a key={c.id} href={`#lc-${c.id}`} className={active === c.id ? 'is-on' : ''} onClick={(event) => { event.preventDefault(); go(c.id) }}>{c.k}</a>)}
      </nav>

      <main className="cs__main">
        <section className="cs-ch os-hero" id="lc-intro">
          <div className="cs-ch__inner">
            <img className="os-logo hd-logo lc-logo" {...img('/images/logos/lancaster.webp', SIZES.logo)} alt="Lancaster Hotels logo" />
            <h3 className="cs-ch__title hd-title">Twenty-one hotels, one codebase.</h3>
            <p className="cs-ch__body">{L.subtitle}</p>
            <p className="os-tags">{L.tags.join(' · ')}</p>
            <ul className="os-stats">
              {L.stats.map((s) => <li key={s.label}><strong>{s.num}</strong><span>{s.label}</span></li>)}
            </ul>
          </div>
        </section>
        <section className="cs-ch hd-role" id="lc-role">
          <div className="cs-ch__inner os-two">
            <div>
              <h3 className="cs-ch__title">{L.role.title}</h3>
              <p className="cs-ch__body hd-role__body">{L.role.body}</p>
              <ul className="hd-me">{L.role.me.map((m) => <li key={m}>{m}</li>)}</ul>
            </div>
            <div>
              <h4 className="os-h4 hd-h4">Who did what</h4>
              <ul className="hd-team">
                {L.role.split.map((m) => <li key={m.k}><strong>{m.k}</strong><p>{m.v}</p></li>)}
              </ul>
            </div>
          </div>
        </section>
        <section className="cs-ch lc-plan" id="lc-plan">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">{L.plan.title}</h3>
            <p className="cs-ch__body">{L.plan.intro}</p>

            <h4 className="os-h4">{L.plan.structure.label}</h4>
            <div className="lc-map">
              {L.plan.structure.groups.map((g) => (
                <div key={g.name} className="lc-map__group">
                  <strong>{g.name}</strong>
                  <ul>{g.pages.map((p) => <li key={p}>{p}</li>)}</ul>
                </div>
              ))}
            </div>

            <h4 className="os-h4">{L.plan.design.label}</h4>
            <ul className="lc-swatches">
              {L.plan.design.tokens.map((t) => <li key={t.k}><span style={{ background: t.swatch }} /><strong>{t.k}</strong><em>{t.v}</em></li>)}
            </ul>
            <dl className="adr hd-adr lc-type">
              {L.plan.design.type.map((r) => <div key={r.k} className="adr__row"><dt>{r.k}</dt><dd>{r.v}</dd></div>)}
            </dl>

            <h4 className="os-h4">{L.plan.layout.label}</h4>
            <div className="lc-layout">
              <svg className="lc-wire" viewBox="0 0 320 420" aria-label="Wireframe of a hotel page: header, hero with title, sub-navigation, sections, footer">
                <rect x="1" y="1" width="318" height="418" rx="6" fill="#fff" stroke="var(--ink)" strokeWidth="1.5" />
                <rect x="1" y="1" width="318" height="26" fill="rgba(11,47,38,0.08)" />
                <rect x="10" y="10" width="14" height="8" rx="1" fill="var(--ink)" /><circle cx="160" cy="14" r="6" fill="#C41E3A" /><rect x="262" y="8" width="48" height="12" rx="6" fill="var(--ink)" />
                <rect x="1" y="27" width="318" height="150" fill="rgba(11,47,38,0.14)" />
                <rect x="14" y="140" width="150" height="20" rx="2" fill="rgba(11,47,38,0.55)" />
                <rect x="1" y="177" width="318" height="20" fill="#fff" stroke="rgba(11,47,38,0.15)" />
                {[0,1,2,3,4,5].map((i) => <rect key={i} x={30 + i * 44} y="185" width="30" height="4" rx="2" fill="rgba(11,47,38,0.4)" />)}
                <rect x="14" y="210" width="292" height="36" rx="2" fill="rgba(11,47,38,0.06)" />
                {[0,1,2].map((i) => <rect key={i} x={14 + i * 100} y="256" width="92" height="70" rx="2" fill="rgba(11,47,38,0.12)" />)}
                <rect x="14" y="336" width="292" height="30" rx="2" fill="rgba(11,47,38,0.06)" />
                <rect x="1" y="376" width="318" height="43" fill="rgba(11,47,38,0.85)" />
                <text x="14" y="34" fontSize="7" fill="var(--ink)" fontWeight="700">HEADER</text>
                <text x="14" y="120" fontSize="7" fill="var(--ink)" fontWeight="700">HERO SLIDESHOW</text>
                <text x="14" y="194" fontSize="6" fill="var(--ink)" fontWeight="700">SUB-NAV</text>
                <text x="18" y="231" fontSize="7" fill="var(--ink)" fontWeight="700">OVERVIEW</text>
                <text x="18" y="296" fontSize="7" fill="var(--ink)" fontWeight="700">CARD GRID</text>
                <text x="18" y="354" fontSize="7" fill="var(--ink)" fontWeight="700">NEWSLETTER</text>
                <text x="14" y="401" fontSize="7" fill="#fff" fontWeight="700">FOOTER</text>
              </svg>
              <dl className="adr hd-adr lc-parts">
                {L.plan.layout.parts.map((r) => <div key={r.k} className="adr__row"><dt>{r.k}</dt><dd>{r.v}</dd></div>)}
              </dl>
            </div>
          </div>
        </section>
        <section className="cs-ch hd-built" id="lc-built">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">How it was built</h3>
            <ol className="hd-built">
              {L.built.map((it, i) => (
                <li key={it.t}><span className="hd-built__num">{String(i + 1).padStart(2, '0')}</span><h4>{it.t}</h4><p>{it.how}</p></li>
              ))}
            </ol>
          </div>
        </section>
        <section className="cs-ch hd-stack lc-stack" id="lc-stack">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">Stack</h3>
            <dl className="adr hd-adr">
              {L.stack.map((r) => <div key={r.k} className="adr__row"><dt>{r.k}</dt><dd>{r.v}</dd></div>)}
            </dl>
          </div>
        </section>
        <section className="cs-ch lc-sites" id="lc-sites">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">The final product</h3>
            <p className="cs-ch__body">Eight of the twenty-one live sites, captured from the servers today.</p>
            <ul className="lc-grid">
              {L.sites.map((s) => (
                <li key={s.shot} className="lc-site">
                  <a className="lc-site__link" href={s.url} target="_blank" rel="noreferrer" aria-label={`Open ${s.name}`}>
                    <figure className="hd-shot"><img {...img(`/images/work/lancaster/${s.shot}.webp`, SIZES.shot)} alt={`${s.name} home page`} loading="lazy" /></figure>
                    <strong>{s.name} <span aria-hidden="true">↗</span></strong>
                  </a>
                  <em>{s.place}</em>
                  <p>{s.note}</p>
                </li>
              ))}
            </ul>
            <p className="lc-more">{L.more}</p>
          </div>
        </section>
        <section className="cs-ch hd-features" id="lc-features">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">What every site does</h3>
            <p className="cs-ch__body">The same pages and the same admin on every property, filled with that hotel’s own content.</p>
            <ol className="hd-feats">
              {L.features.map((f, i) => (
                <li key={f.t} className="hd-feat">
                  <figure className="hd-shot"><img {...img(`/images/work/lancaster/${f.shot}.webp`, SIZES.shot)} alt={f.t} loading="lazy" /></figure>
                  <div className="hd-feat__text">
                    <span className="hd-feat__num">{String(i + 1).padStart(2, '0')}</span>
                    <h4>{f.t}</h4>
                    <p>{f.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="cs-ch hd-built" id="lc-built">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">How it was built</h3>
            <ol className="hd-built">
              {L.built.map((it, i) => (
                <li key={it.t}><span className="hd-built__num">{String(i + 1).padStart(2, '0')}</span><h4>{it.t}</h4><p>{it.how}</p></li>
              ))}
            </ol>
          </div>
        </section>

        <section className="cs-ch hd-stack lc-stack" id="lc-stack">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">Stack</h3>
            <dl className="adr hd-adr">
              {L.stack.map((r) => <div key={r.k} className="adr__row"><dt>{r.k}</dt><dd>{r.v}</dd></div>)}
            </dl>
          </div>
        </section>
      </main>

      {related}
      <footer className="cs__footer os-footer">
        <img {...img('/images/footers/lancaster.webp', SIZES.footer)} alt={footerAlt['/images/footers/lancaster.webp']} loading="lazy" />
        <div className="cs__footer-line">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <nav aria-label="Project footer"><a href="https://www.linkedin.com/in/tayseer-laz" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/TayseerLaz" target="_blank" rel="noreferrer">GitHub</a><a href={L.site} target="_blank" rel="noreferrer">lancaster.world</a></nav>
          <span>© {new Date().getFullYear()} {site.name}</span>
        </div>
      </footer>
    </div>
  )
}
