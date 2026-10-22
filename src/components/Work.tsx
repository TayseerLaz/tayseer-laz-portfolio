import { Scribble, type Texture } from '../illustrations/Scribbles'
import { site } from '../content'
import { projectPath, projects, projectSlugs } from '../seo'
import './Work.css'

type Tile = { name: string; tag: string; line: string; texture: string; year: string; status: string; caseStudy?: string; href?: string }

function TileLink({ project: p }: { project: Tile }) {
  const href = p.caseStudy ? projectPath(p.caseStudy) : p.href ?? '#contact'
  return (
    <a href={href} className="wt__link">
      <Scribble kind={p.texture as Texture} className="wt__tex" />
      <span className="wt__cat">{p.tag}</span>
      <div className="wt__body">
        <h3 className="wt__title">{p.name}</h3>
        <p className="wt__line">{p.line}</p>
        <span className="wt__stats">
          <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8l-5.4 2.9 1.1-6.1L3.2 9.4l6.1-.8z" /></svg>{p.year}</span>
          <span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M8 12.5l2.6 2.6L16 9.6" fill="none" stroke="var(--tile)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>{p.status}</span>
        </span>
      </div>
    </a>
  )
}

export default function Work() {
  const shown = new Set<string>([...site.work.items, ...site.more].flatMap((p) => p.caseStudy ? [p.caseStudy] : []))
  const further = projectSlugs.filter((slug) => !shown.has(slug))
  return (
    <section className="work screen" id="work">
      <div className="wrap">
        <header className="work__head"><h2 className="h2">{site.work.title}</h2></header>
        <ul className="bento-w">
          {site.work.items.map((p, i) => <li key={p.name} className={`wt wt--${p.tone} wt--${i === 2 || i === 3 ? 'lg' : 'sm'} wt--pos${i + 1}`}><TileLink project={p} /></li>)}
        </ul>
        <ul className="work__grid" id="work-more" aria-label="More projects">
          {site.more.map((p) => <li key={p.name} className={`wt wt--${p.tone} wt--sm`}><TileLink project={p} /></li>)}
        </ul>
        <nav className="work__index" aria-label="Engineering case studies">
          <h3>More on how I build</h3>
          <ul>{further.map((slug) => <li key={slug}><a href={projectPath(slug)}>{projects[slug].title} →</a></li>)}</ul>
        </nav>
      </div>
    </section>
  )
}
