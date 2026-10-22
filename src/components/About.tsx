import AboutPanel from './AboutPanel'
import { site } from '../content'
import './About.css'

export default function About() {
  const a = site.about
  return (
    <section className="about" id="about">
      <div className="wrap about__grid">
        <div className="about__copy">
          <h2 className="h2">{a.title}</h2>
          <div className="about__actions">
            <a className="btn btn--green" href="#contact">Get in touch</a>
            <a className="btn btn--line" href="#work">See the work</a>
          </div>
        </div>
        <ul className="about__stats">
          {a.stats.map((s) => <li key={s.label}><strong>{s.num}</strong><span>{s.label}</span></li>)}
        </ul>
      </div>
      <div className="wrap">
        <AboutPanel />
      </div>
    </section>
  )
}
