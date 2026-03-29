import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.about-reveal').forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 85%' }
          }
        )
      })

      gsap.utils.toArray('[data-count]').forEach(el => {
        gsap.to(el, {
          innerHTML: parseInt(el.dataset.count),
          duration: 2,
          ease: 'power2.out',
          snap: { innerHTML: 1 },
          scrollTrigger: { trigger: el, start: 'top 80%' }
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="about section" id="about" ref={ref}>
      <div className="section-container">
        <div className="section-header about-reveal">
          <h2 className="section-title">About <span className="accent">Me</span></h2>
        </div>

        <div className="about-grid">
          <div className="about-portrait about-reveal">
            <div className="about-portrait-inner">
              <img src="/IMG_1283.jpg" alt="Tayseer Laz, Product Developer based in Beirut, Lebanon" className="about-portrait-img" />
            </div>
            <div className="about-portrait-ring" />
          </div>

          <div className="about-body">
            <p className="about-lead about-reveal">
              I'm <span className="name-styled">Tayseer Laz</span>, a Product Developer with experience leading end-to-end web and mobile product development.
            </p>
            <p className="about-text about-reveal">
              Skilled at aligning business strategy with technical execution, building scalable systems, and delivering user-centered solutions. I've led product vision for SaaS platforms, managing UI/UX design, system workflows, and business logic.
            </p>
            <p className="about-text about-reveal">
              Experienced in mobile app development with Firebase and publishing on Google Play and the App Store. I hold a Bachelor of Engineering in Computer & Communication Engineering from Rafik Hariri University, Lebanon.
            </p>

            <div className="about-stats about-reveal">
              <div className="stat">
                <span className="stat-num" data-count="4">0</span><span className="stat-plus">+</span>
                <span className="stat-label">Products Built</span>
              </div>
              <div className="stat">
                <span className="stat-num" data-count="3">0</span><span className="stat-plus">+</span>
                <span className="stat-label">Companies</span>
              </div>
              <div className="stat">
                <span className="stat-num" data-count="2">0</span><span className="stat-plus">+</span>
                <span className="stat-label">Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
