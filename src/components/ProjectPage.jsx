import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import projects from '../data/projects'
import SEO from './SEO'
import { ProjectStructuredData } from './StructuredData'
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
      <SEO
        title={`${project.title} | Tayseer Laz`}
        description={project.metaDescription || project.overview}
        path={`/work/${project.slug}`}
      />
      <ProjectStructuredData project={project} />
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
        <div className={`pp-hero-img${project.whiteBg ? ' pp-hero-img--white' : ''}`} style={{ '--hue': project.hue }}>
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className={`pp-hero-image${project.whiteBg ? ' pp-hero-image--contain' : ''}${project.invertLogo ? ' pp-hero-image--invert' : ''}`}
            />
          ) : (
            <div className="pp-hero-placeholder">
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

      {/* Store mockups — only shown when project has them */}
      {project.stores && project.stores.length > 0 && (
        <section className="pp-section pp-reveal">
          <h2 className="pp-section-title">Available now</h2>
          <div className="pp-stores">
            {project.stores.map((s) => (
              <a
                key={s.kind}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`pp-phone pp-phone--${s.kind}`}
                aria-label={`${s.title} on ${s.platform}`}
              >
                <div className="pp-phone-body">
                  <div className="pp-phone-bezel" />
                  {s.kind === 'ios' ? (
                    <div className="pp-phone-island" />
                  ) : (
                    <div className="pp-phone-hole" />
                  )}
                  <div className="pp-phone-screen">
                    <div className="pp-status">
                      <span className="pp-status-time">9:41</span>
                      <span className="pp-status-icons">
                        <svg viewBox="0 0 18 12" width="14" height="10" fill="currentColor"><rect x="0" y="6" width="3" height="6" rx="0.5"/><rect x="5" y="3" width="3" height="9" rx="0.5"/><rect x="10" y="0" width="3" height="12" rx="0.5"/></svg>
                        <svg viewBox="0 0 16 11" width="14" height="10" fill="currentColor"><path d="M8 2c2 0 3.7.8 5 2l-1 1c-1-1-2.5-1.7-4-1.7s-3 .7-4 1.7l-1-1C4.3 2.8 6 2 8 2zm0 3.5c1 0 2 .4 2.7 1l-1 1c-.5-.5-1-.7-1.7-.7s-1.2.2-1.7.7l-1-1c.7-.6 1.7-1 2.7-1zm0 3c.5 0 1 .2 1.4.6L8 10.5 6.6 9.1c.4-.4.9-.6 1.4-.6z"/></svg>
                        <svg viewBox="0 0 24 12" width="20" height="10" fill="none"><rect x="1" y="1" width="20" height="10" rx="2.5" stroke="currentColor" strokeOpacity="0.5"/><rect x="3" y="3" width="14" height="6" rx="1" fill="currentColor"/><rect x="22" y="4" width="1.5" height="4" rx="0.5" fill="currentColor" fillOpacity="0.5"/></svg>
                      </span>
                    </div>

                    <div className="pp-store-bar">
                      <span className="pp-store-name">{s.platform}</span>
                    </div>

                    <div className="pp-store-app">
                      <div className="pp-store-icon">
                        <img src={s.icon} alt={`${s.title} app icon`} />
                      </div>
                      <div className="pp-store-info">
                        <h3 className="pp-store-title">{s.title}</h3>
                        <p className="pp-store-sub">{s.subtitle}</p>
                        <div className="pp-store-actions">
                          <span className="pp-store-cta">
                            {s.kind === 'ios' ? 'GET' : 'Install'}
                          </span>
                          <span className="pp-store-share">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pp-store-rating">
                      <div className="pp-store-rating-cell">
                        <strong>4.9</strong>
                        <span>★★★★★</span>
                        <em>Rating</em>
                      </div>
                      <div className="pp-store-rating-cell">
                        <strong>{s.kind === 'ios' ? '12+' : 'E'}</strong>
                        <em>Age</em>
                      </div>
                      <div className="pp-store-rating-cell">
                        <strong>#1</strong>
                        <em>Lifestyle</em>
                      </div>
                    </div>

                    <div className="pp-store-shots">
                      {s.shots.map((shot, i) => (
                        <img key={i} src={shot} alt="" />
                      ))}
                    </div>
                  </div>
                  {s.kind === 'android' && (
                    <div className="pp-phone-nav">
                      <span /><span /><span />
                    </div>
                  )}
                </div>
                <span className="pp-phone-caption">{s.platform}</span>
              </a>
            ))}
          </div>
        </section>
      )}

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

      {/* Screenshots gallery — only shown when project has them */}
      {project.screenshots && project.screenshots.length > 0 && (
        <section className="pp-section pp-reveal">
          <h2 className="pp-section-title">Showcase</h2>
          <div className="pp-gallery">
            {project.screenshots.map((s, i) => (
              <motion.figure
                key={s.src}
                className="pp-shot"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: (i % 3) * 0.08, duration: 0.6, ease: 'easeOut' }}
              >
                <img src={s.src} alt={s.caption} loading="lazy" decoding="async" />
                {s.caption && <figcaption>{s.caption}</figcaption>}
              </motion.figure>
            ))}
          </div>
        </section>
      )}

      {/* App Links — only shown when project has them */}
      {project.links && project.links.length > 0 && (
        <section className="pp-section pp-reveal">
          <h2 className="pp-section-title">Get the apps</h2>
          <div className="pp-links">
            {project.links.map((l) => (
              <a
                key={l.label}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`pp-link pp-link--${l.kind}`}
              >
                {l.kind === 'appstore' && (
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                )}
                {l.kind === 'playstore' && (
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M3.609 1.814 13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893 2.302 2.302-10.937 6.333 8.635-8.635zm3.183-3.183 2.443 1.414c.84.485.84 1.7 0 2.185l-2.443 1.414L15.59 12l1.092-1.476zM5.864 2.658 16.802 8.99l-2.302 2.302-8.636-8.634z" />
                  </svg>
                )}
                {l.kind === 'web' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
                  </svg>
                )}
                <span>{l.label}</span>
              </a>
            ))}
          </div>
        </section>
      )}

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
