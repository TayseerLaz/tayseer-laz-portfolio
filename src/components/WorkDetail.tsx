import { useEffect, useRef } from 'react'
import { Shape, type ShapeName } from '../illustrations/Shapes'
import { site } from '../content'
import './WorkDetail.css'

type Item = (typeof site.work.items)[number]
const D = site.workDetail
const SHAPE: Record<string, ShapeName> = { dark: 'leaf', mid: 'comma', sage: 'arch', teal: 'drop' }

function fill(t: string, p: Item) {
  return t.replace('{year}', p.year).replace('{name}', p.name).replace('{tag}', p.tag.toLowerCase())
}
function Arrow() {
  return <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true"><path d="M3 9 9 3M4 3h5v5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

export default function WorkDetail({ item, onClose }: { item: Item; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; prev?.focus() }
  }, [onClose])

  const shape = SHAPE[item.tone] ?? 'blob'

  return (
    <div className="wd" role="dialog" aria-modal="true" aria-labelledby="wd-title">
      <div className="wd__bar">
        <button ref={closeRef} className="wd__close" onClick={onClose} aria-label="Close project">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <h2 id="wd-title" className="wd__title">{item.name}</h2>
        <span className="wd__meta">{item.tag} · {item.year} · {item.status}</span>
      </div>

      <div className="wd__grid">
        {/* 1 image */}
        <article className="wdt wdt--img wdt--p1">
          <img src="/hero-bg.jpg" alt="" />
          <p className="wdt__cap">Screens from {item.name}. Placeholder image.</p>
        </article>

        {/* 2 role */}
        <article className="wdt wdt--paper wdt--p2">
          <h3 className="wdt__h">{D.role}</h3>
          <p className="wdt__small">My role</p>
          <Shape name="dots" className="wdt__mark" />
        </article>

        {/* 3 intro, teal */}
        <article className="wdt wdt--teal wdt--p3">
          <p className="wdt__serif">{fill(D.intro, item)}</p>
          <a className="wdt__link" href={D.link}>Visit the project <Arrow /></a>
        </article>

        {/* 4 tall illustration, deep green */}
        <article className="wdt wdt--deep wdt--p4">
          <Shape name={shape} className="wdt__art" />
          <p className="wdt__cap wdt__cap--light">A cut-out for {item.name}, in the brand's green.</p>
        </article>

        {/* 5 tall image */}
        <article className="wdt wdt--img wdt--p5">
          <img src="/about-photo.jpg" alt="" />
          <p className="wdt__cap">Sometimes the work starts on paper. Placeholder image.</p>
        </article>

        {/* 6 logo, mint */}
        <article className="wdt wdt--mint wdt--p6">
          <p className="wdt__logo">{item.name}</p>
          <a className="wdt__link" href={D.link}>I like a good wordmark <Arrow /></a>
        </article>

        {/* 7 problem, sage */}
        <article className="wdt wdt--sage wdt--p7">
          <h3 className="wdt__h">The problem</h3>
          <p className="wdt__body">{fill(D.problem, item)}</p>
          <a className="wdt__link" href={D.link}>How it started <Arrow /></a>
        </article>

        {/* 8 approach, dark, wide */}
        <article className="wdt wdt--dark wdt--p8">
          <h3 className="wdt__h wdt__h--lg">I always come back to the first slice</h3>
          <p className="wdt__body">{fill(D.approach, item)}</p>
          <a className="wdt__link" href={D.link}>Scroll through the build log <Arrow /></a>
        </article>

        {/* 9 stack + outcome, paper */}
        <article className="wdt wdt--paper wdt--p9">
          <h3 className="wdt__h">Built with</h3>
          <ul className="wdt__stack">{D.stack.map((s) => <li key={s}>{s}</li>)}</ul>
          <p className="wdt__body">{fill(D.outcome, item)}</p>
          <a className="wdt__link" href={D.link}>Read the outcome <Arrow /></a>
        </article>
      </div>
    </div>
  )
}
