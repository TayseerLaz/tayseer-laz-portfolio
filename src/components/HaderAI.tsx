import { useEffect, useRef, useState, type ReactNode } from 'react'
import { site } from '../content'
import './CaseStudy.css'
import './OmniSign.css'
import './HaderAI.css'
import { img, SIZES, footerAlt } from '../img'

const H = site.hader
const CH = [
  { id: 'intro', k: '01 · Product' }, { id: 'role', k: '02 · My role' }, { id: 'features', k: '03 · What it does' },
  { id: 'built', k: '04 · How it was built' }, { id: 'meta', k: '05 · WhatsApp & Meta' }, { id: 'stack', k: '06 · Stack' }, { id: 'voice', k: '07 · Voice' },
]

export default function HaderAI({ onClose, standalone = false, related }: { onClose: () => void; standalone?: boolean; related?: ReactNode }) {
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
      if (vis[0]) setActive((vis[0].target as HTMLElement).id.replace('hd-', ''))
    }, { root: standalone ? null : root, rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.2, 0.5] })
    root.querySelectorAll('.cs-ch').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [standalone])
  const go = (id: string) => scroller.current?.querySelector(`#hd-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <div className="cs os hd" role={standalone ? undefined : "dialog"} aria-modal={standalone ? undefined : true} aria-labelledby="hd-title" ref={scroller}>
      <header className="cs__bar">
        {standalone ? <a className="cs__close" href="/#work" aria-label="Back to portfolio">←</a> : (<button ref={closeRef} className="cs__close" onClick={onClose} aria-label="Close project">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>)}
        <div className="cs__head">
          <Title id="hd-title" className="cs__title">{H.title}</Title>
          <p className="cs__sub">{H.subtitle}</p>
        </div>
        <div className="os-links">
          <a className="btn btn--line cs__repo" href={H.site} target="_blank" rel="noreferrer">hader.ai</a>
        </div>
      </header>
      <nav className="cs__rail" aria-label="Chapters">
        {CH.map((c) => <a key={c.id} href={`#hd-${c.id}`} className={active === c.id ? 'is-on' : ''} onClick={(event) => { event.preventDefault(); go(c.id) }}>{c.k}</a>)}
      </nav>

      <main className="cs__main">
        {/* 01 product */}
        <section className="cs-ch os-hero" id="hd-intro">
          <div className="cs-ch__inner">
            <img className="os-logo hd-logo" {...img('/images/logos/hader.webp', SIZES.logo)} alt="Hader AI logo" />
            <h3 className="cs-ch__title hd-title">Every WhatsApp, answered.</h3>
            <p className="cs-ch__body">{H.subtitle}</p>
            <p className="os-tags">{H.tags.join(' · ')}</p>
            <ul className="os-stats">
              {H.stats.map((s) => <li key={s.label}><strong>{s.num}</strong><span>{s.label}</span></li>)}
            </ul>
          </div>
        </section>

        {/* 02 role */}
        <section className="cs-ch hd-role" id="hd-role">
          <div className="cs-ch__inner os-two">
            <div>
              <h3 className="cs-ch__title">{H.role.title}</h3>
              <p className="cs-ch__body hd-role__body">{H.role.body}</p>
              <ul className="hd-me">{H.role.me.map((m) => <li key={m}>{m}</li>)}</ul>
            </div>
            <div>
              <h4 className="os-h4 hd-h4">The team I led</h4>
              <ul className="hd-team">
                {H.role.team.map((m) => <li key={m.role}><strong>{m.role}</strong><p>{m.d}</p></li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* 03 features */}
        <section className="cs-ch hd-features" id="hd-features">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">{H.product.title}</h3>
            <p className="cs-ch__body">{H.product.intro}</p>
            <ol className="hd-feats">
              {H.product.features.map((f, i) => (
                <li key={f.t} className="hd-feat">
                  <figure className="hd-shot">
                    <img {...img(`/images/work/hader/${f.shot}.webp`, SIZES.shot)} alt={`${f.t} section of hader.ai`} loading="lazy" />
                  </figure>
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

        {/* 04 how it was built */}
        <section className="cs-ch hd-built" id="hd-built">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">{H.built.title}</h3>
            <p className="cs-ch__body">{H.built.intro}</p>
            <ol className="hd-built">
              {H.built.items.map((it, i) => (
                <li key={it.t}>
                  <span className="hd-built__num">{String(i + 1).padStart(2, '0')}</span>
                  <h4>{it.t}</h4>
                  <p>{it.how}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 05 whatsapp & meta */}
        <section className="cs-ch hd-meta" id="hd-meta">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">{H.meta.title}</h3>
            <p className="cs-ch__body">{H.meta.intro}</p>
            <ol className="hd-meta">
              {H.meta.points.map((pt) => (
                <li key={pt.t}><strong>{pt.t}</strong><p>{pt.d}</p></li>
              ))}
            </ol>
          </div>
        </section>

        {/* 06 stack */}
        <section className="cs-ch hd-stack" id="hd-stack">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">{H.stack.title}</h3>
            <p className="cs-ch__body">{H.stack.intro}</p>
            <dl className="adr hd-adr">
              {H.stack.rows.map((r) => <div key={r.k} className="adr__row"><dt>{r.k}</dt><dd>{r.v}</dd></div>)}
            </dl>
          </div>
        </section>

        {/* 07 voice */}
        <section className="cs-ch hd-voice" id="hd-voice">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">It speaks like a person who has read the room.</h3>
            <p className="cs-ch__body">Hader writes like the business’s best front-desk colleague: observant, direct, fast. One customer, one thread.</p>
            <ul className="hd-voice">
              {H.voice.map((v) => { const [a, b] = v.split(', '); return <li key={v}><strong>{a}.</strong><span>{b}.</span></li> })}
            </ul>
          </div>
        </section>
      </main>

      {related}
      <footer className="cs__footer os-footer">
        <img {...img('/images/footers/omnisign.webp', SIZES.footer)} alt={footerAlt['/images/footers/omnisign.webp']} loading="lazy" />
        <div className="cs__footer-line">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <nav aria-label="Project footer"><a href="https://www.linkedin.com/in/tayseer-laz" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/TayseerLaz" target="_blank" rel="noreferrer">GitHub</a><a href={H.site} target="_blank" rel="noreferrer">hader.ai</a></nav>
          <span>© {new Date().getFullYear()} {site.name}</span>
        </div>
      </footer>
    </div>
  )
}
