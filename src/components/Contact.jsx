import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

const socials = [
  { name: 'LinkedIn', url: 'https://linkedin.com/in/tayseer-laz' },
  { name: 'GitHub', url: '#' },
  { name: 'Instagram', url: '#' },
  { name: 'Twitter', url: '#' },
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
            variants={{
              initial: { y: 0 },
              hovered: { y: '-100%' },
            }}
            transition={{ duration: DURATION, ease: 'easeInOut', delay: STAGGER * i }}
            className="flip-letter"
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="flip-link-bottom">
        {children.split('').map((l, i) => (
          <motion.span
            key={i}
            variants={{
              initial: { y: '100%' },
              hovered: { y: 0 },
            }}
            transition={{ duration: DURATION, ease: 'easeInOut', delay: STAGGER * i }}
            className="flip-letter"
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  )
}

export default function Contact() {
  const ref = useRef(null)

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
    <section className="section contact" id="contact" ref={ref}>
      <div className="section-container">
        <div className="section-header contact-reveal">
          <h2 className="section-title">Let's <span className="accent">Connect</span></h2>
        </div>

        <div className="contact-body">
          <p className="contact-text contact-reveal">
            Have a project in mind? Let's build something extraordinary together.
          </p>
          <a href="mailto:laztayseer@gmail.com" className="contact-email contact-reveal" data-magnetic>
            laztayseer@gmail.com
          </a>
          <div className="contact-details contact-reveal">
            <span className="contact-detail">Beirut, Lebanon</span>
            <span className="contact-detail-sep">|</span>
            <a href="tel:+96181238320" className="contact-detail">+961 81 238 320</a>
          </div>

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
