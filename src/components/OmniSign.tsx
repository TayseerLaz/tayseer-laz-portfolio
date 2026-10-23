import { useEffect, useRef, useState, type ReactNode } from 'react'
import { site } from '../content'
import './CaseStudy.css'
import './OmniSign.css'
import { img, SIZES, footerAlt } from '../img'

const O = site.omnisign
const CH = [
  { id: 'demo', k: '01 · Demo' }, { id: 'story', k: '02 · Story' }, { id: 'found', k: '03 · Found' },
  { id: 'built', k: '04 · Built' }, { id: 'data', k: '05 · Data' }, { id: 'how', k: '06 · How' }, { id: 'code', k: '07 · Code' }, { id: 'next', k: '08 · Next' }, { id: 'team', k: '09 · Team' },
]

function fmt(s: number) { if (!isFinite(s)) return '0:00'; const m = Math.floor(s / 60); const r = Math.floor(s % 60); return `${m}:${String(r).padStart(2, '0')}` }

function Demo() {
  const v = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [t, setT] = useState(0)
  const [d, setD] = useState(0)
  const toggle = () => { const el = v.current; if (!el) return; if (el.paused) { el.play(); setPlaying(true) } else { el.pause(); setPlaying(false) } }
  const seek = (e: React.MouseEvent<HTMLDivElement>) => { const el = v.current; if (!el || !el.duration) return; const r = e.currentTarget.getBoundingClientRect(); el.currentTime = ((e.clientX - r.left) / r.width) * el.duration }
  return (
    <figure className="os-demo">
      <div className="os-phone">
        <div className="os-phone__notch" aria-hidden="true" />
        <div className="os-phone__screen">
          <video ref={v} className="os-video" src={O.video} playsInline muted={muted} preload="metadata"
            onTimeUpdate={(e) => setT(e.currentTarget.currentTime)} onLoadedMetadata={(e) => setD(e.currentTarget.duration)} onEnded={() => setPlaying(false)} />
          {!playing && (
            <button className="os-play" onClick={toggle} aria-label="Play demo">
              <svg viewBox="0 0 24 24" width="28" height="28"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
            </button>
          )}
        </div>
      </div>
      <div className="os-ctl">
        <button onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
          {playing ? <svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg> : <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>}
        </button>
        <span>{fmt(t)}</span>
        <div className="os-ctl__track" onClick={seek} role="slider" aria-label="Seek" aria-valuemin={0} aria-valuemax={d || 0} aria-valuenow={t}>
          <span style={{ width: `${d ? (t / d) * 100 : 0}%` }} />
        </div>
        <span>{fmt(d)}</span>
        <button onClick={() => { setMuted(!muted); if (v.current) v.current.muted = !muted }} aria-label={muted ? 'Unmute' : 'Mute'}>
          {muted ? <svg viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                 : <svg viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5zM19 5a10 10 0 010 14M15.5 8.5a5 5 0 010 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
        </button>
      </div>
      <figcaption className="os-demo__cap">{O.videoCaption}</figcaption>
    </figure>
  )
}

export default function OmniSign({ onClose, standalone = false, related }: { onClose: () => void; standalone?: boolean; related?: ReactNode }) {
  const Title = standalone ? 'h1' : 'h2'
  const closeRef = useRef<HTMLButtonElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState('demo')
  const [open, setOpen] = useState<number | null>(0)

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
      if (vis[0]) setActive((vis[0].target as HTMLElement).id.replace('os-', ''))
    }, { root: standalone ? null : root, rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.2, 0.5] })
    root.querySelectorAll('.cs-ch').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [standalone])
  const go = (id: string) => scroller.current?.querySelector(`#os-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <div className="cs os" role={standalone ? undefined : "dialog"} aria-modal={standalone ? undefined : true} aria-labelledby="os-title" ref={scroller}>
      <header className="cs__bar">
        {standalone ? <a className="cs__close" href="/#work" aria-label="Back to portfolio">←</a> : (<button ref={closeRef} className="cs__close" onClick={onClose} aria-label="Close project">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>)}
        <div className="cs__head">
          <Title id="os-title" className="cs__title">{O.title}</Title>
          <p className="cs__sub">{O.subtitle}</p>
        </div>
        <div className="os-links">
          {O.repos.items.map((r) => (
            <a key={r.name} className="btn btn--line cs__repo os-links__repo" href={r.url} target="_blank" rel="noreferrer" title={`${O.repos.orgName}/${r.name} on GitHub`}>
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" /></svg>
              {r.name}
            </a>
          ))}
          <a className="btn btn--line cs__repo" href={O.article} target="_blank" rel="noreferrer">RHU article</a>
        </div>
      </header>
      <nav className="cs__rail" aria-label="Chapters">
        {CH.map((c) => <a key={c.id} href={`#os-${c.id}`} className={active === c.id ? 'is-on' : ''} onClick={(event) => { event.preventDefault(); go(c.id) }}>{c.k}</a>)}
      </nav>

      <main className="cs__main">
        {/* 01 demo */}
        <section className="cs-ch os-hero" id="os-demo">
          <div className="cs-ch__inner os-hero__grid">
            <div className="os-hero__copy">
              <img className="os-logo" {...img('/images/logos/omnisign.webp', SIZES.logo)} alt="OmniSign logo" />
              <h3 className="cs-ch__title">{O.title}</h3>
              <p className="cs-ch__body">{O.subtitle}</p>
              <p className="os-tags">{O.tags.join(' · ')}</p>
              <ul className="os-stats">
                {O.stats.map((s) => <li key={s.label}><strong>{s.num}</strong><span>{s.label}</span><small>{s.note}</small></li>)}
              </ul>
            </div>
            <Demo />
          </div>
        </section>

        {/* award */}
        <section className="cs-ch os-award" aria-label="Award">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title os-award__title">{O.award.title}</h3>
            <p className="cs-ch__body">{O.award.body}</p>
            <a className="btn btn--cream" href={O.article} target="_blank" rel="noreferrer">Read the full article on RHU.edu.lb</a>
          </div>
        </section>

        {/* 02 story */}
        <section className="cs-ch os-story" id="os-story">
          <div className="cs-ch__inner os-two">
            <h3 className="cs-ch__title">{O.story.title}</h3>
            <div className="os-paras">{O.story.paras.map((p) => <p key={p}>{p}</p>)}</div>
          </div>
        </section>

        {/* 03 found */}
        <section className="cs-ch os-found" id="os-found">
          <div className="cs-ch__inner os-found__grid">
            <div className="os-found__text">
              <div className="os-paras">{O.found.paras.map((p) => <p key={p}>{p}</p>)}</div>
              <blockquote className="os-quote">“{O.found.quote}”</blockquote>
            </div>
            <div className="os-found__head">
              <h3 className="cs-ch__title">{O.found.title}</h3>
              <p className="os-regions" aria-label="Regions that sign differently">
                {O.found.regions.map((r, i) => <span key={r}>{i > 0 && <em aria-hidden="true">≠</em>}{r}</span>)}
              </p>
            </div>
          </div>
        </section>

        {/* 04 built */}
        <section className="cs-ch os-built" id="os-built">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">{O.built.title}</h3>
            <ul className="os-cards">
              {O.built.cards.map((c) => <li key={c.tag}><strong>{c.num}</strong><p>{c.label}</p><span>{c.tag}</span></li>)}
            </ul>
            <div className="os-paras os-paras--wide">{O.built.paras.map((p) => <p key={p}>{p}</p>)}</div>
            <h4 className="os-h4">Community partners</h4>
            <ul className="os-partners">
              {O.built.partners.map((p) => <li key={p.name}><strong>{p.name}</strong><span>{p.role}</span></li>)}
            </ul>
          </div>
        </section>

        {/* 05 dataset */}
        <section className="cs-ch os-data" id="os-data">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">{O.dataset.title}</h3>
            <p className="cs-ch__body">{O.dataset.intro}</p>
            <figure className="os-fig">
              <img {...img(O.dataset.sheet.src, SIZES.wide)} alt={O.dataset.sheet.alt} loading="lazy" />
              <figcaption>{O.dataset.sheet.caption}</figcaption>
            </figure>
            <div className="os-data__row">
              <figure className="os-fig os-fig--archi">
                <img {...img(O.dataset.archi.src, SIZES.shot)} alt={O.dataset.archi.alt} loading="lazy" />
                <figcaption>{O.dataset.archi.caption}</figcaption>
              </figure>
              <dl className="os-facts">
                {O.dataset.facts.map((f) => <div key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>)}
              </dl>
            </div>
          </div>
        </section>

        {/* why */}
        <section className="cs-ch os-why" aria-label="Why it matters">
          <div className="cs-ch__inner os-two">
            <blockquote className="os-quote os-quote--big">“{O.why.quote}”</blockquote>
            <div className="os-paras">{O.why.paras.map((p) => <p key={p}>{p}</p>)}</div>
          </div>
        </section>

        {/* 05 how */}
        <section className="cs-ch os-how" id="os-how">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">{O.how.title}</h3>
            <p className="cs-ch__body">{O.how.intro}</p>
            <ol className="os-how">
              {O.how.items.map((it, i) => <li key={it.t}><span>{String(i + 1).padStart(2, '0')}</span><strong>{it.t}</strong><p>{it.d}</p></li>)}
            </ol>
          </div>
        </section>

        {/* 07 code */}
        <section className="cs-ch os-code" id="os-code">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">The code</h3>
            <p className="cs-ch__body">Four repositories under the team organisation <a href={O.repos.org} target="_blank" rel="noreferrer">{O.repos.orgName}</a> on GitHub.</p>
            <ul className="os-repos">
              {O.repos.items.map((r) => (
                <li key={r.name}>
                  <a href={r.url} target="_blank" rel="noreferrer" className="os-repo">
                    <span className="os-repo__head">
                      <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" /></svg>
                      <strong>{O.repos.orgName}/{r.name}</strong>
                      <em>{r.lang}</em>
                    </span>
                    <p>{r.d}</p>
                  </a>
                </li>
              ))}
            </ul>
            <p className="os-repos__note">{O.repos.note}</p>
          </div>
        </section>

        {/* 08 next */}
        <section className="cs-ch os-next" id="os-next">
          <div className="cs-ch__inner os-next__grid">
            <div className="os-next__col">
              <h3 className="cs-ch__title">The road ahead</h3>
              <ol className="os-tl">
                {O.timeline.map((t) => <li key={t.when}><span className="os-tl__when">{t.when}</span><strong>{t.t}</strong><p>{t.d}</p></li>)}
              </ol>
            </div>
            <div className="os-next__col">
            <h4 className="os-h4 os-h4--top">Frequently asked</h4>
            <ul className="os-faq">
              {O.faq.map((f, i) => (
                <li key={f.q} className={open === i ? 'is-open' : ''}>
                  <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>{f.q}<span aria-hidden="true">{open === i ? '−' : '+'}</span></button>
                  {open === i && <p>{f.a}</p>}
                </li>
              ))}
            </ul>
            </div>
          </div>
        </section>

        {/* 07 team */}
        <section className="cs-ch os-team" id="os-team">
          <div className="cs-ch__inner">
            <h3 className="cs-ch__title">The people behind OmniSign</h3>
            <ul className="os-people">
              {O.team.map((m) => <li key={m.name}><span className="os-people__in">{m.in}</span><strong>{m.name}</strong><em>{m.role}</em><p>{m.d}</p></li>)}
            </ul>
          </div>
        </section>
      </main>

      {related}
      <footer className="cs__footer os-footer">
        <img {...img('/images/footers/omnisign.webp', SIZES.footer)} alt={footerAlt['/images/footers/omnisign.webp']} loading="lazy" />
        <div className="cs__footer-line">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <nav aria-label="Project footer"><a href="https://www.linkedin.com/in/tayseer-laz" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/TayseerLaz" target="_blank" rel="noreferrer">GitHub</a></nav>
          <span>© {new Date().getFullYear()} {site.name}</span>
        </div>
      </footer>
    </div>
  )
}
