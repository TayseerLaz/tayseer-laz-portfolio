import { useEffect, useState, type MouseEvent } from 'react'
import { Scribble, type Texture } from '../illustrations/Scribbles'
import { site } from '../content'
import { pageMetadata, projectFromPath, projectPath, projects, projectSlugs, type ProjectSlug } from '../seo'
import CopyDialog from './CopyDialog'
import Project from './Project'
import { featured } from './caseStudies'
import './Work.css'

type Tile = { name: string; tag: string; line: string; texture: string; year: string; status: string; caseStudy?: string; href?: string }

function TileLink({ project: p, onOpen }: { project: Tile; onOpen: (e: MouseEvent<HTMLAnchorElement>, p: Tile) => void }) {
  const href = p.caseStudy ? projectPath(p.caseStudy) : p.href ?? '#contact'
  return (
    <div className="wt__link">
      <Scribble kind={p.texture as Texture} className="wt__tex" />
      <span className="wt__cat">{p.tag}</span>
      <div className="wt__body">
        {/* Only the name is link text; its ::after stretches over the tile so the whole card stays clickable. */}
        <h3 className="wt__title"><a href={href} className="wt__hit" onClick={(e) => onOpen(e, p)}>{p.name}</a></h3>
        <p className="wt__line">{p.line}</p>
        <span className="wt__stats">
          <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8l-5.4 2.9 1.1-6.1L3.2 9.4l6.1-.8z" /></svg>{p.year}</span>
          <span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M8 12.5l2.6 2.6L16 9.6" fill="none" stroke="var(--tile)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>{p.status}</span>
        </span>
      </div>
    </div>
  )
}

const homeTitle = pageMetadata('/').title

/**
 * Tiles are real links to the pre-rendered /work/<slug>/ pages, so crawlers and new tabs get the page.
 * A plain click plays the Copy dialog and opens the same case study as a pop-up, with the URL set to
 * that page so Back closes it and a refresh lands on the standalone page.
 */
export default function Work() {
  const shown = new Set<string>([...site.work.items, ...site.more].flatMap((p) => p.caseStudy ? [p.caseStudy] : []))
  const further = projectSlugs.filter((slug) => !shown.has(slug))
  const [opening, setOpening] = useState<{ slug: ProjectSlug; name: string } | null>(null)
  const [study, setStudy] = useState<ProjectSlug | null>(null)

  useEffect(() => {
    const onPop = () => setStudy(projectFromPath(window.location.pathname) ?? null)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  useEffect(() => { document.title = study ? pageMetadata(projectPath(study)).title : homeTitle }, [study])

  const open = (e: MouseEvent<HTMLAnchorElement>, p: Tile) => {
    const slug = p.caseStudy ? projectFromPath(projectPath(p.caseStudy)) : undefined
    if (!slug || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    setOpening({ slug, name: p.name })
  }
  const show = (slug: ProjectSlug) => {
    window.history.pushState({ study: slug }, '', projectPath(slug))
    setStudy(slug)
  }
  const close = () => {
    if (window.history.state?.study) window.history.back()
    else { window.history.replaceState(null, '', '/#work'); setStudy(null) }
  }
  const Study = study && Object.hasOwn(featured, study) ? featured[study as keyof typeof featured] : undefined

  return (
    <section className="work screen" id="work">
      <div className="wrap">
        <header className="work__head"><h2 className="h2">{site.work.title}</h2></header>
        <ul className="bento-w">
          {site.work.items.map((p, i) => <li key={p.name} className={`wt wt--${p.tone} wt--${i === 2 || i === 3 ? 'lg' : 'sm'} wt--pos${i + 1}`}><TileLink project={p} onOpen={open} /></li>)}
        </ul>
        <ul className="work__grid" id="work-more" aria-label="More projects">
          {site.more.map((p) => <li key={p.name} className={`wt wt--${p.tone} wt--sm`}><TileLink project={p} onOpen={open} /></li>)}
        </ul>
        <nav className="work__index" aria-label="Engineering case studies">
          <h3>More on how I build</h3>
          <ul>{further.map((slug) => <li key={slug}><a href={projectPath(slug)}>{projects[slug].title} →</a></li>)}</ul>
        </nav>
      </div>
      {opening && <CopyDialog name={opening.name} onDone={() => { show(opening.slug); setOpening(null) }} onStop={() => setOpening(null)} />}
      {study && (Study ? <Study onClose={close} /> : <Project slug={study} onClose={close} />)}
    </section>
  )
}
