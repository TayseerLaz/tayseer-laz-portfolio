import { useEffect, useState } from 'react'
import { Scribble, type Texture } from '../illustrations/Scribbles'
import WorkDetail from './WorkDetail'
import CopyDialog from './CopyDialog'
import CaseStudy from './CaseStudy'
import OmniSign from './OmniSign'
import HaderAI from './HaderAI'
import Lancaster from './Lancaster'
import SlaBridge from './SlaBridge'
import Bsheel from './Bsheel'
import IEvents from './IEvents'
import Project, { hasProject } from './Project'
import { site } from '../content'
import './Process.css'
import './Work.css'

/** Bento of colour tiles with brush textures, after the reference board. */
export default function Work() {
  const [open, setOpen] = useState<number | null>(null)
  const [loading, setLoading] = useState<number | null>(null)
  const readHash = () => { const m = window.location.hash.match(/^#work\/([a-z0-9-]+)$/); return m ? m[1] : null }
  const [study, setStudyState] = useState<string | null>(readHash)
  const setStudy = (slug: string | null) => {
    setStudyState(slug)
    if (slug) history.pushState(null, '', `#work/${slug}`)
    else if (readHash()) history.pushState(null, '', '#work')
  }
  useEffect(() => {
    const onPop = () => setStudyState(readHash())
    window.addEventListener('popstate', onPop)
    window.addEventListener('hashchange', onPop)
    return () => { window.removeEventListener('popstate', onPop); window.removeEventListener('hashchange', onPop) }
  }, [])
  const [moreOpen, setMoreOpen] = useState<number | null>(null)
  const [moreLoading, setMoreLoading] = useState<number | null>(null)
  return (
    <section className="work screen" id="work">
      <div className="wrap">
        <header className="work__head">
          <h2 className="h2">{site.work.title}</h2>
        </header>
        <ul className="bento-w">
          {site.work.items.map((p, i) => (
            <li key={p.name} className={`wt wt--${p.tone} wt--${i === 2 || i === 3 ? 'lg' : 'sm'} wt--pos${i + 1}`}>
              {p.status === 'Open' ? (
              <a href="#contact" className="wt__link">
                <Scribble kind={p.texture as Texture} className="wt__tex" />
                <span className="wt__cat">{p.tag}</span>
                <span className="wt__body">
                  <h3 className="wt__title">{p.name}</h3>
                  <p className="wt__line">{p.line}</p>
                  <span className="wt__stats">
                    <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8l-5.4 2.9 1.1-6.1L3.2 9.4l6.1-.8z" /></svg>{p.year}</span>
                    <span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M8 12.5l2.6 2.6L16 9.6" fill="none" stroke="var(--tile)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>{p.status}</span>
                  </span>
                </span>
              </a>
              ) : (
              <button type="button" className="wt__link" onClick={() => setLoading(i)} aria-haspopup="dialog">
                <Scribble kind={p.texture as Texture} className="wt__tex" />
                <span className="wt__cat">{p.tag}</span>
                <span className="wt__body">
                  <span className="wt__title">{p.name}</span>
                  <span className="wt__line">{p.line}</span>
                  <span className="wt__stats">
                    <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8l-5.4 2.9 1.1-6.1L3.2 9.4l6.1-.8z" /></svg>{p.year}</span>
                    <span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M8 12.5l2.6 2.6L16 9.6" fill="none" stroke="var(--tile)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>{p.status}</span>
                  </span>
                </span>
              </button>
              )}
            </li>
          ))}
        </ul>

        <ul className="work__grid" id="work-more" aria-label="More projects">
              {site.more.map((p, i) => (
                <li key={p.name + i} className={`wt wt--${p.tone} wt--sm`}>
                  <button type="button" className="wt__link" onClick={() => setMoreLoading(i)} aria-haspopup="dialog">
                    <Scribble kind={p.texture as Texture} className="wt__tex" />
                    <span className="wt__cat">{p.tag}</span>
                    <span className="wt__body">
                      <span className="wt__title">{p.name}</span>
                      <span className="wt__line">{p.line}</span>
                      <span className="wt__stats">
                        <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8l-5.4 2.9 1.1-6.1L3.2 9.4l6.1-.8z" /></svg>{p.year}</span>
                        <span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M8 12.5l2.6 2.6L16 9.6" fill="none" stroke="var(--tile)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>{p.status}</span>
                      </span>
                    </span>
                  </button>
                </li>
              ))}
        </ul>
      </div>
      {loading !== null && (
        <CopyDialog
          name={site.work.items[loading].name}
          onDone={() => { const it = site.work.items[loading]; if ('caseStudy' in it) setStudy(it.caseStudy as string); else setOpen(loading); setLoading(null) }}
          onStop={() => setLoading(null)}
        />
      )}
      {open !== null && <WorkDetail item={site.work.items[open]} onClose={() => setOpen(null)} />}
      {moreLoading !== null && (
        <CopyDialog name={site.more[moreLoading].name} onDone={() => { const it = site.more[moreLoading]; if ('caseStudy' in it) setStudy(it.caseStudy as string); else setMoreOpen(moreLoading); setMoreLoading(null) }} onStop={() => setMoreLoading(null)} />
      )}
      {moreOpen !== null && <WorkDetail item={site.more[moreOpen] as unknown as (typeof site.work.items)[number]} onClose={() => setMoreOpen(null)} />}
      {study === 'wms' && <CaseStudy onClose={() => setStudy(null)} />}
      {study === 'omnisign' && <OmniSign onClose={() => setStudy(null)} />}
      {study === 'hader' && <HaderAI onClose={() => setStudy(null)} />}
      {study === 'lancaster' && <Lancaster onClose={() => setStudy(null)} />}
      {study === 'sla' && <SlaBridge onClose={() => setStudy(null)} />}
      {study === 'bsheel' && <Bsheel onClose={() => setStudy(null)} />}
      {study === 'ievents' && <IEvents onClose={() => setStudy(null)} />}
      {study && hasProject(study) && <Project slug={study} onClose={() => setStudy(null)} />}
    </section>
  )
}
