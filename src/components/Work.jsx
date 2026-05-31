import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import projects from '../data/projects'
import './Work.css'

gsap.registerPlugin(ScrollTrigger)

export default function Work() {
  const ref = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.work-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 80, rotateX: -8 },
          { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: 'expo.out',
            scrollTrigger: { trigger: card, start: 'top 85%' },
            delay: (i % 2) * 0.15
          }
        )
      })
    }, ref)
    return () => ctx.revert()
  }, [])


  return (
    <section className="section work" id="work" ref={ref}>
      <div className="section-container">
        <div className="section-header work-reveal">
          <h2 className="section-title">Selected <span className="accent">Work</span></h2>
        </div>

        <div className="work-grid">
          {projects.map((p, i) => (
            <article key={i} className="work-card"
              data-num={`${p.num} / ${String(projects.length).padStart(2, '0')}`}
              onClick={() => navigate(`/work/${p.slug}`)}
              style={{ cursor: 'pointer' }}>
              <div className="work-card-img">
                {p.image ? (
                  <div className={`work-card-placeholder${p.whiteBg ? ' white-bg' : ''}`} style={{ '--hue': p.hue }}>
                    <img src={p.image} alt={p.title} className={`work-card-image${p.whiteBg ? ' contain' : ''}${p.invertLogo ? ' invert' : ''}`} />
                  </div>
                ) : (
                  <div className="work-card-placeholder" style={{ '--hue': p.hue }}>
                    <span>{p.num}</span>
                  </div>
                )}
                <div className="work-card-overlay">
                  <span className="work-card-view" data-magnetic>View Project &#8599;</span>
                </div>
              </div>
              <div className="work-card-info">
                <span className="work-card-company">{p.company}</span>
                <h3 className="work-card-title">{p.title}</h3>
                <p className="work-card-desc">{p.desc}</p>
                <div className="work-card-tags">
                  {p.tags.map(t => <span key={t}>{t}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
