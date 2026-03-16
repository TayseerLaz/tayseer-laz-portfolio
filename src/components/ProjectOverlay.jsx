import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ProjectOverlay.css'

export default function ProjectOverlay({ project, onClose }) {
  const overlayRef = useRef(null)

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [project])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          ref={overlayRef}
          className="project-overlay"
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0% 0 0 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="po-header">
            <motion.button
              className="po-close"
              onClick={onClose}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </motion.button>
          </div>

          <div className="po-scroll">
            <div className="po-container">
              <motion.div
                className="po-intro"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="po-company">{project.company}</span>
                <h2 className="po-title">{project.title}</h2>
                <p className="po-desc">{project.desc}</p>
                <div className="po-tags">
                  {project.tags.map(t => <span key={t}>{t}</span>)}
                </div>
              </motion.div>

              {project.sections?.map((section, i) => (
                <motion.div
                  key={i}
                  className="po-section"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {section.label && <span className="po-section-label">{section.label}</span>}
                  {section.heading && <h3 className="po-section-heading">{section.heading}</h3>}
                  {section.text && <p className="po-section-text">{section.text}</p>}
                  {section.images && (
                    <div className={`po-images po-images--${section.layout || 'grid'}`}>
                      {section.images.map((src, j) => (
                        <motion.img
                          key={j}
                          src={src}
                          alt=""
                          className="po-img"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + i * 0.12 + j * 0.08, duration: 0.5 }}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              {(!project.sections || project.sections.length === 0) && (
                <motion.div
                  className="po-coming-soon"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <span>Case study coming soon</span>
                </motion.div>
              )}

              {project.visitUrl && (
                <motion.div
                  className="po-visit"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <a href={project.visitUrl} target="_blank" rel="noopener noreferrer" className="po-visit-btn">
                    Visit Site &#8599;
                  </a>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
