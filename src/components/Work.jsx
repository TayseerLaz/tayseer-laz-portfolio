import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectOverlay from './ProjectOverlay'
import './Work.css'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    num: '01',
    title: 'Alinia,SaaS Platform',
    desc: 'Leading product vision and end-to-end execution including UI/UX design, multi-role agency panels, workflow systems, and AI-powered tools.',
    tags: ['SaaS', 'UI/UX', 'AI Chatbots', 'Dashboards'],
    hue: 10,
    company: 'Aligned Tech',
    sections: [],
  },
  {
    num: '02',
    title: 'Dyafa,Event & Hospitality',
    desc: 'Multi-vendor event platform with POS, AI chatbot, admin panel, and mobile apps published on Play Store & App Store.',
    tags: ['Firebase', 'Mobile', 'POS', 'Cross-functional'],
    hue: 25,
    company: 'IEvents Qatar',
    sections: [],
  },
  {
    num: '03',
    title: 'Real Estate SaaS Platform',
    desc: 'Led product vision, designed UI/UX, developed web app and multi-role panels, and initiated the mobile application.',
    tags: ['Product Dev', 'UI/UX', 'Web App', 'Mobile'],
    hue: 350,
    company: 'Freelance',
    sections: [],
  },
  {
    num: '04',
    title: 'OmniSign,AI Sign Language',
    desc: 'AI-powered sign language platform featuring gesture recognition and real-time translation for accessibility.',
    tags: ['AI', 'Accessibility', 'Product Direction'],
    hue: 15,
    company: 'Founder',
    sections: [],
  },
]

export default function Work() {
  const ref = useRef(null)
  const [activeProject, setActiveProject] = useState(null)

  const handleClose = useCallback(() => setActiveProject(null), [])

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

  const handleTilt = (e, card) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rx = (y - rect.height / 2) / rect.height * -5
    const ry = (x - rect.width / 2) / rect.width * 5
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`
    card.style.transition = 'none'
  }

  const resetTilt = (card) => {
    card.style.transform = ''
    card.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
  }

  return (
    <>
      <section className="section work" id="work" ref={ref}>
        <div className="section-container">
          <div className="section-header work-reveal">
            <h2 className="section-title">Selected <span className="accent">Work</span></h2>
          </div>

          <div className="work-grid">
            {projects.map((p, i) => (
              <article key={i} className="work-card"
                onMouseMove={(e) => handleTilt(e, e.currentTarget)}
                onMouseLeave={(e) => resetTilt(e.currentTarget)}
                onClick={() => setActiveProject(p)}
                style={{ cursor: 'pointer' }}>
                <div className="work-card-img">
                  <div className="work-card-placeholder" style={{ '--hue': p.hue }}>
                    <span>{p.num}</span>
                  </div>
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

      <ProjectOverlay project={activeProject} onClose={handleClose} />
    </>
  )
}
