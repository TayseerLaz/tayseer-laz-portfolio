import { useEffect, useRef, useState, type ReactNode } from 'react'
import { site } from '../content'
import type { ProjectData } from '../projectTypes'
import './CaseStudy.css'
import './OmniSign.css'
import './HaderAI.css'
import './Lancaster.css'
import './Bsheel.css'
import './Project.css'
import { img, SIZES, footerAlt } from '../img'

const PROJECTS = site.projects as Record<string, ProjectData>
export const hasProject = (slug: string) => slug in PROJECTS

/** One data-driven case study page. Chapters appear only when the content has them. */
export default function Project({ slug, onClose, standalone = false, related }: { slug: string; onClose: () => void; standalone?: boolean; related?: ReactNode }) {
  const P = PROJECTS[slug]
  const Title = standalone ? 'h1' : 'h2'
  const closeRef = useRef<HTMLButtonElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState('intro')

  const chapters = [
    { id: 'intro', k: 'Overview' },
    { id: 'role', k: 'My role' },
    ...(P.flow ? [{ id: 'flow', k: P.flow.title }] : []),
    ...(P.gallery ? [{ id: 'gallery', k: P.gallery.title }] : []),
    { id: 'features', k: 'What it does' },
    { id: 'built', k: 'How it was built' },
    { id: 'stack', k: 'Stack' },
  ].map((c, i) => ({ ...c, k: `${String(i + 1).padStart(2, '0')} · ${c.k}` }))

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
    root.scrollTop = 0
    setActive('intro')
    const io = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      if (vis[0]) setActive((vis[0].target as HTMLElement).id.replace('pj-', ''))
    }, { root: standalone ? null : root, rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.2, 0.5] })
    root.querySelectorAll('.cs-ch').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [slug, standalone])
  const go = (id: string) => scroller.current?.querySelector(`#pj-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  if (!P) return null
  // Wide shots use the pre-cut 16:10 file (same crop the CSS applies); a lone wide shot spans the full row.
  const gallery = P.gallery
  const shot = (src: string) => gallery?.kind === 'wide'
    ? img(src, gallery.shots.length === 1 ? SIZES.wide : SIZES.half, { crop: '16x10' })
    : img(src, SIZES.phone)

  return (
    <div className="cs os hd bs pj" role={standalone ? undefined : "dialog"} aria-modal={standalone ? undefined : true} aria-labelledby="pj-title" ref={scroller}>
      <header className="cs__bar">
        {standalone ? <a className="cs__close" href="/#work" aria-label="Back to portfolio">←</a> : (<button ref={closeRef} className="cs__close" onClick={onClose} aria-label="Close project">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>)}
        <div className="cs__head">
          <Title id="pj-title" className="cs__title">{P.title}</Title>
          <p className="cs__sub">{P.subtitle}</p>
        </div>
        {P.links.length > 0 && (
          <div className="os-links">
            {P.links.map((l) => <a key={l.k} className="btn btn--line cs__repo" href={l.u} target="_blank" rel="noreferrer">{l.k}</a>)}
          </div>
        )}
      </header>
      <nav className="cs__rail" aria-label="Chapters">
        {chapters.map((c) => <a key={c.id} href={`#pj-${c.id}`} className={active === c.id ? 'is-on' : ''} onClick={(event) => { event.preventDefault(); go(c.id) }}>{c.k}</a>)}
      </nav>

      <main className="cs__main">
        <section className="cs-ch os-hero" id="pj-intro">
          <div className="cs-ch__inner os-hero__grid">
            <div className="os-hero__copy">
              {P.icon && <img className="os-logo hd-logo bs-icon pj-icon" {...img(P.icon, SIZES.logo)} alt={`${P.title} logo`} />}
              <h3 className="cs-ch__title hd-title">{P.headline}</h3>
              <p className="cs-ch__body">{P.subtitle}</p>
              <p className="os-tags">{P.tags.join(' · ')}</p>
              <ul className="os-stats">
                {P.stats.map((s) => <li key={s.label}><strong>{s.num}</strong><span>{s.label}</span></li>)}
              </ul>
            </div>
            {P.hero && (
              P.hero.href ? (
                <a className="hd-shot bs-site pj-hero" href={P.hero.href} target="_blank" rel="noreferrer">
                  <img {...img(P.hero.src, SIZES.hero)} alt={P.hero.cap} />
                  <span className="bs-site__cap">{P.hero.cap}</span>
                </a>
              ) : (
                <figure className="hd-shot bs-site pj-hero">
                  <img {...img(P.hero.src, SIZES.hero)} alt={P.hero.cap} />
                  <figcaption className="bs-site__cap">{P.hero.cap}</figcaption>
                </figure>
              )
            )}
          </div>
        </section>

        <section className="cs-ch hd-role" id="pj-role">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">{P.role.title}</h3>
            <p className="cs-ch__body hd-role__body">{P.role.body}</p>
            <ul className="hd-me pj-me">{P.role.me.map((m) => <li key={m}>{m}</li>)}</ul>
          </div>
        </section>

        {P.flow && (
          <section className="cs-ch lc-plan" id="pj-flow">
            <div className="cs-ch__inner">
              <h3 className="cs-ch__title">{P.flow.title}</h3>
              <p className="cs-ch__body">{P.flow.intro}</p>
              <ol className="bs-loop">
                {P.flow.steps.map((step, i) => <li key={step}><span>{i + 1}</span>{step}</li>)}
              </ol>
            </div>
          </section>
        )}

        {P.gallery && (
          <section className="cs-ch bs-screens" id="pj-gallery">
            <div className="cs-ch__inner">
              <h3 className="cs-ch__title">{P.gallery.title}</h3>
              <p className="cs-ch__body">{P.gallery.intro}</p>
              <ul className={`bs-grid pj-grid pj-grid--${P.gallery.kind}`}>
                {P.gallery.shots.map((s) => (
                  <li key={s.src}><figure><img {...shot(s.src)} alt={s.cap} loading="lazy" /><figcaption>{s.cap}</figcaption></figure></li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="cs-ch hd-built bs-features" id="pj-features">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">What it does</h3>
            <ol className="hd-built">
              {P.features.map((f, i) => (
                <li key={f.t}><span className="hd-built__num">{String(i + 1).padStart(2, '0')}</span><h4>{f.t}</h4><p>{f.d}</p></li>
              ))}
            </ol>
          </div>
        </section>

        <section className="cs-ch hd-meta" id="pj-built">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">How it was built</h3>
            <ol className="hd-meta">
              {P.built.map((it) => <li key={it.t}><strong>{it.t}</strong><p>{it.how}</p></li>)}
            </ol>
          </div>
        </section>

        <section className="cs-ch hd-stack lc-stack" id="pj-stack">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">Stack</h3>
            <dl className="adr hd-adr">
              {P.stack.map((r) => <div key={r.k} className="adr__row"><dt>{r.k}</dt><dd>{r.v}</dd></div>)}
            </dl>
          </div>
        </section>
      </main>

      {related}
      <footer className="cs__footer pj-footer">
        <img {...img(P.footer, SIZES.footer)} alt={footerAlt[P.footer] ?? ''} loading="lazy" />
        <div className="cs__footer-line">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <nav aria-label="Project footer">
            <a href="https://www.linkedin.com/in/tayseer-laz" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/TayseerLaz" target="_blank" rel="noreferrer">GitHub</a>
            {P.links[0] && <a href={P.links[0].u} target="_blank" rel="noreferrer">{P.links[0].k}</a>}
          </nav>
          <span>© {new Date().getFullYear()} {site.name}</span>
        </div>
      </footer>
    </div>
  )
}
