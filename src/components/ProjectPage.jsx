import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import projects from '../data/projects'
import './ProjectPage.css'

export default function ProjectPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const ref = useRef(null)
  const project = projects.find(p => p.slug === slug)
  const currentIndex = projects.findIndex(p => p.slug === slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.pp-reveal').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, delay: i * 0.1, ease: 'expo.out' }
        )
      })
    }, ref)
    return () => ctx.revert()
  }, [slug])

  if (!project) {
    return (
      <div className="pp-not-found">
        <h2>Project not found</h2>
        <Link to="/">Back to home</Link>
      </div>
    )
  }

  return (
    <div className="pp" ref={ref}>
      <nav className="pp-nav">
        <button className="pp-back" onClick={() => navigate('/')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>
        <span className="pp-nav-num">{project.num} / 0{projects.length}</span>
      </nav>

      {/* Hero */}
      <header className="pp-hero">
        <div className="pp-hero-img">
          {project.image ? (
            <img src={project.image} alt={project.title} className="pp-hero-image" />
          ) : (
            <div className="pp-hero-placeholder" style={{ '--hue': project.hue }}>
              <span>{project.num}</span>
            </div>
          )}
        </div>

        <div className="pp-hero-info pp-reveal">
          <span className="pp-company">{project.company}</span>
          <h1 className="pp-title">{project.title}</h1>
          <div className="pp-meta">
            <div className="pp-meta-item">
              <span className="pp-meta-label">Role</span>
              <span className="pp-meta-val">{project.role}</span>
            </div>
            <div className="pp-meta-item">
              <span className="pp-meta-label">Year</span>
              <span className="pp-meta-val">{project.year}</span>
            </div>
          </div>
          <div className="pp-tags">
            {project.tags.map(t => <span key={t} className="pp-tag">{t}</span>)}
          </div>
        </div>
      </header>

      {/* Overview */}
      <section className="pp-section pp-reveal">
        <h2 className="pp-section-title">Overview</h2>
        <p className="pp-overview">{project.overview}</p>
      </section>

      {/* Highlights */}
      <section className="pp-section pp-reveal">
        <h2 className="pp-section-title">Key Highlights</h2>
        <ul className="pp-highlights">
          {project.highlights.map((h, i) => (
            <motion.li
              key={i}
              className="pp-highlight"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <span className="pp-highlight-num">0{i + 1}</span>
              {h}
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Tech Stack */}
      <section className="pp-section pp-reveal">
        <h2 className="pp-section-title">Tech Stack</h2>
        <div className="pp-stack">
          {project.techStack.map((t, i) => (
            <motion.span
              key={t}
              className="pp-stack-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              {t}
            </motion.span>
          ))}
        </div>
      </section>

      {/* Next Project */}
      <section className="pp-next">
        <span className="pp-next-label">Next Project</span>
        <Link to={`/work/${nextProject.slug}`} className="pp-next-link">
          <motion.span
            className="pp-next-title"
            whileHover={{ x: 20 }}
            transition={{ duration: 0.3 }}
          >
            {nextProject.title}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </motion.span>
        </Link>
      </section>
    </div>
  )
}
