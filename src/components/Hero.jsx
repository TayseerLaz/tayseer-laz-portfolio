import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import MusicPlayer from './MusicPlayer'
import GLSLHills from './GLSLHills'
import './Hero.css'

const services = [
  { num: '#01', label: 'Product Development' },
  { num: '#02', label: 'UI/UX' },
  { num: '#03', label: 'Mobile Apps' },
  { num: '#04', label: 'Systems Workflow' },
]

export default function Hero() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      tl.from('.hero-title-line', {
        yPercent: 120, rotateX: -40, duration: 0.4, ease: 'expo.out', stagger: 0.04
      })
      .from('.hero-portrait', {
        opacity: 0, scale: 0.9, duration: 0.4, ease: 'expo.out'
      }, '-=0.3')
      .from('.hero-right', {
        opacity: 0, x: 40, duration: 0.25, ease: 'expo.out'
      }, '-=0.3')
      .from('.music-player', {
        opacity: 0, y: 30, duration: 0.25, ease: 'expo.out'
      }, '-=0.25')
      .from('.hero-service', {
        opacity: 0, y: 30, duration: 0.35, ease: 'expo.out', stagger: 0.04
      }, '-=0.25')
      .from('.hero-scroll-hint', {
        opacity: 0, y: 20, duration: 0.3, ease: 'expo.out'
      }, '-=0.2')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" id="home" ref={sectionRef}>
      <div className="hero-gradient" />
      <div className="hero-vignette" />

      {/* ===== GLSL Hills Background ===== */}
      <div className="hero-hills">
        <GLSLHills speed={0.4} />
      </div>

      <div className="hero-player-wrap">
        <MusicPlayer />
      </div>

      <div className="hero-content">
        <div className="hero-left">
          <h1 className="hero-title">
            <span className="sr-only">Tayseer Laz — </span>
            <span className="hero-title-overflow">
              <span className="hero-title-line">Product</span>
            </span>
            <span className="hero-title-overflow">
              <span className="hero-title-line">Developer</span>
            </span>
          </h1>
        </div>

        <div className="hero-right">
          <h2 className="hero-tagline">
            Aligning business strategy<br />with technical execution.
          </h2>
          <p className="hero-desc">
            End-to-end product development, from vision to scalable, user-centered solutions. Based in Beirut, Lebanon.
          </p>
          <a href="#work" className="hero-cta-btn" data-magnetic
            onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }) }}>
            <span>View My Work</span>
            <span className="hero-cta-arrow">&#8599;</span>
          </a>
        </div>
      </div>

      <div className="hero-services">
        {services.map((s, i) => (
          <div className="hero-service" key={i}>
            <span className="hero-service-num">{s.num}</span>
            <span className="hero-service-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="hero-scroll-hint">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  )
}
