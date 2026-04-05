import { useState, useEffect, useRef, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

const Dithering = lazy(() =>
  import('@paper-design/shaders-react').then((mod) => ({ default: mod.Dithering }))
)

const socials = [
  { name: 'LinkedIn', url: 'https://linkedin.com/in/tayseer-laz' },
  { name: 'GitHub', url: '#' },
  { name: 'Email', url: 'mailto:laztayseer@gmail.com' },
  { name: '+961 81 238 320', url: 'tel:+96181238320' },
]

const DURATION = 0.25
const STAGGER = 0.025

function FlipLink({ children, href, target, rel }) {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      target={target}
      rel={rel}
      className="flip-link"
    >
      <div className="flip-link-top">
        {children.split('').map((l, i) => (
          <motion.span
            key={i}
            variants={{ initial: { y: 0 }, hovered: { y: '-100%' } }}
            transition={{ duration: DURATION, ease: 'easeInOut', delay: STAGGER * i }}
            className="flip-letter"
          >{l}</motion.span>
        ))}
      </div>
      <div className="flip-link-bottom">
        {children.split('').map((l, i) => (
          <motion.span
            key={i}
            variants={{ initial: { y: '100%' }, hovered: { y: 0 } }}
            transition={{ duration: DURATION, ease: 'easeInOut', delay: STAGGER * i }}
            className="flip-letter"
          >{l}</motion.span>
        ))}
      </div>
    </motion.a>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.contact-reveal').forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 85%' }
          }
        )
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="contact-section" id="contact" ref={ref}>
      <div
        className="contact-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Dithering background */}
        <Suspense fallback={<div className="contact-dither-fallback" />}>
          <div className="contact-dither">
            <Dithering
              colorBack="#00000000"
              colorFront="#8c3839"
              shape="warp"
              type="4x4"
              speed={isHovered ? 0.6 : 0.2}
              style={{ width: '100%', height: '100%' }}
              minPixelRatio={1}
            />
          </div>
        </Suspense>

        {/* Content */}
        <div className="contact-card-content">
          <div className="contact-badge contact-reveal">
            <span className="contact-badge-dot" />
            <span className="contact-badge-ping" />
            Available for Work
          </div>

          <h2 className="contact-card-title contact-reveal">
            Let's build<br />
            <span className="contact-card-title-dim">something together.</span>
          </h2>

          <p className="contact-card-desc contact-reveal">
            Based in Beirut, Lebanon. Open to product roles, freelance projects, and collaborations worldwide.
          </p>

          <div className="contact-flip-links contact-reveal">
            {socials.map(s => (
              <FlipLink
                key={s.name}
                href={s.url}
                target={s.url.startsWith('http') ? '_blank' : undefined}
                rel={s.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {s.name}
              </FlipLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
