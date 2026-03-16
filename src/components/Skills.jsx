import { useEffect, useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Skills.css'

gsap.registerPlugin(ScrollTrigger)

const categories = [
  { title: 'Product & Design', items: ['Product Strategy', 'UI/UX Design', 'Wireframing & Prototyping', 'Design Systems', 'User Research'] },
  { title: 'Development', items: ['React / Next.js', 'React Native / Flutter', 'Node.js / Firebase', 'HTML / CSS / TypeScript', 'SharePoint Framework'] },
  { title: 'Tools & Platforms', items: ['Figma', 'Google Play / App Store', 'Git / GitHub', 'Jira / Linear', 'AI Tools & Chatbots'] },
]

const ROTATION_RANGE = 32.5
const HALF_ROTATION_RANGE = 32.5 / 2

function TiltCard({ title, items }) {
  const ref = useRef(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const xSpring = useSpring(x)
  const ySpring = useSpring(y)

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`

  const handleMouseMove = (e) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1
    const rY = mouseX / width - HALF_ROTATION_RANGE

    x.set(rX)
    y.set(rY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform,
      }}
      className="skill-card"
    >
      <div
        style={{
          transform: 'translateZ(40px)',
          transformStyle: 'preserve-3d',
        }}
        className="skill-card-inner"
      >
        <h3
          style={{ transform: 'translateZ(20px)' }}
          className="skill-card-title"
        >
          {title}
        </h3>
        <ul className="skill-list">
          {items.map(item => (
            <li
              key={item}
              style={{ transform: 'translateZ(30px)' }}
              className="skill-item"
              data-magnetic
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.skill-card').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 60, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
            delay: i * 0.12
          }
        )
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section skills" id="skills" ref={ref}>
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Skills & <span className="accent">Expertise</span></h2>
        </div>

        <div className="skills-grid">
          {categories.map((cat, i) => (
            <TiltCard key={i} title={cat.title} items={cat.items} />
          ))}
        </div>
      </div>
    </section>
  )
}
