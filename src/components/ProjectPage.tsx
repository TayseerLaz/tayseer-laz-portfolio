import CaseStudy from './CaseStudy'
import HaderAI from './HaderAI'
import Lancaster from './Lancaster'
import SlaBridge from './SlaBridge'
import Bsheel from './Bsheel'
import IEvents from './IEvents'
import OmniSign from './OmniSign'
import Project from './Project'
import { projects, projectPath, type ProjectSlug } from '../seo'
import { site } from '../content'
import './ProjectPage.css'

const featured = {
  wms: CaseStudy, hader: HaderAI, lancaster: Lancaster, sla: SlaBridge,
  bsheel: Bsheel, ievents: IEvents, omnisign: OmniSign,
}
const close = () => { window.location.assign('/#work') }

export default function ProjectPage({ slug }: { slug: ProjectSlug }) {
  const Component = Object.hasOwn(featured, slug) ? featured[slug as keyof typeof featured] : undefined
  const others = site.work.items.filter((p) => p.caseStudy !== slug).slice(0, 3)
  // Rendered inside the case study, before its footer, so the footer image stays the last thing on the page.
  const related = (
    <aside className="project-page__related wrap" aria-label="More case studies">
      <h2 className="h2">More work by {site.name}</h2>
      <ul>{others.map((p) => <li key={p.caseStudy}><a href={projectPath(p.caseStudy)}>{p.name} →</a></li>)}</ul>
      <a className="btn btn--green" href={`mailto:${site.email}`}>Discuss a project</a>
    </aside>
  )
  return (
    <div className="project-page">
      <nav className="project-page__breadcrumbs" aria-label="Breadcrumb">
        <a href="/">{site.name}</a><span aria-hidden="true"> / </span>
        <span aria-current="page">{projects[slug].title}</span>
      </nav>
      {Component ? <Component standalone onClose={close} related={related} /> : <Project slug={slug} standalone onClose={close} related={related} />}
    </div>
  )
}
