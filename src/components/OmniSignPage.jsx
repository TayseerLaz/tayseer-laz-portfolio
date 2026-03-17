import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Iphone16Pro } from './Iphone16Pro'
import './OmniSignPage.css'

gsap.registerPlugin(ScrollTrigger)

/* ===== DATA ===== */

const stats = [
  { value: '50,000+', label: 'Signs Collected', sub: 'Raw data from campaigns across Lebanon' },
  { value: '80,000+', label: 'Processed Dataset', sub: 'After augmentation and cleaning' },
  { value: '98%', label: 'Accuracy', sub: 'Internal evaluation, controlled conditions' },
  { value: 'Self-funded', label: 'Funding', sub: 'No institutional or grant backing' },
]

const regions = ['Beqaa', 'South Lebanon', 'Beirut', 'School A — Beirut', 'School B — Beirut']

const dataStats = [
  { value: '50k+', label: 'raw signs collected across campaigns in Lebanon', sub: 'Represents initial source material before cleaning and augmentation.', tag: 'collection' },
  { value: '80k+', label: 'processed image flows after preprocessing and augmentation', sub: 'Includes transformed and quality-filtered samples for model training.', tag: 'processed' },
  { value: '30+', label: 'daily words and expressions plus Arabic alphabet support', sub: 'Current public-facing vocabulary in the MVP stage.', tag: 'vocabulary' },
]

const partners = [
  { name: 'Aaramoun Orphanage Center', desc: 'Data collection and community engagement' },
  { name: 'Sin El Fil Church', desc: 'Data collection with deaf community members' },
  { name: 'SignWithNaila', desc: "Instagram educator and leader in Lebanon's sign language community" },
  { name: 'Rafik Hariri University', desc: 'Booth space at every campus event for data collection' },
]

const features = [
  { num: '01', title: 'Real-Time Translation', desc: 'Computer vision pipeline for live video calls. Instant recognition and translation of sign language gestures with sub-frame latency.' },
  { num: '02', title: 'AI Language Model', desc: 'Neural networks trained on diverse sign language datasets. 98% accuracy on internal evaluation. Real-world performance varies by conditions.' },
  { num: '03', title: 'Multi-Modal Output', desc: 'Simultaneous text and speech output. Real-time TTS generates natural spoken language from recognized signs.' },
  { num: '04', title: 'Learning Platform', desc: 'Interactive sign language lessons with progress tracking and personalized learning paths for ASL and LSL.' },
  { num: '05', title: 'Accessibility First', desc: 'WCAG-compliant interface with haptic feedback, screen reader support, and high-contrast modes.' },
  { num: '06', title: 'ASL & LSL Support', desc: 'Dedicated support for both American and Lebanese Sign Language. LSL support built from our own dataset — the first of its kind.' },
  { num: '07', title: 'Low Latency', desc: 'Under 100ms end-to-end using edge computing. Inference runs on-device where possible, with edge fallback for complex sequences.' },
  { num: '08', title: 'Privacy Protected', desc: 'Federated learning architecture. Sign data is processed on-device and never transmitted to central servers.' },
]

const timeline = [
  { period: 'Early 2025', title: 'Started as FYP', desc: 'OmniSign began as a Final Year Project at Rafik Hariri University. Six students chose to find their own challenge instead of picking from faculty-approved projects.' },
  { period: 'Mid 2025', title: '50,000 signs collected', desc: 'Data collection campaigns across Lebanon. Partnerships with Aaramoun Orphanage, Sin El Fil Church, and SignWithNaila. 80,000+ processed samples after augmentation.' },
  { period: 'Late 2025', title: '98% accuracy achieved', desc: 'LSTM model trained on full Arabic alphabet plus 30+ daily expressions. Internal evaluation shows 98% accuracy in controlled conditions.' },
  { period: 'Now', title: 'Weekly development', desc: 'Fresh graduates with jobs, putting in weekly one-hour meetings plus coding sessions. Self-funded, community-supported, still building.' },
  { period: 'Next', title: 'Clinical vocabulary', desc: 'Medical and clinical phrases — the most requested addition from the deaf community. Where miscommunication carries the highest cost.' },
  { period: 'Future', title: 'Scalable architecture', desc: 'Researching Transformer-based models for better real-world performance and easier scaling to new sign languages.' },
]

const faqs = [
  { q: 'Which sign languages do you support?', a: 'Currently Lebanese Sign Language (LSL) and American Sign Language (ASL). LSL support was built entirely from our own dataset — the first of its kind.' },
  { q: 'Is this real-time translation or batch processing?', a: 'Real-time. Our computer vision pipeline processes live video with sub-frame latency, running inference on-device where possible.' },
  { q: 'How accurate is it?', a: '98% accuracy in controlled conditions based on internal evaluation. Real-world performance varies depending on lighting, camera angle, and signing speed.' },
  { q: 'How are you collecting and labeling sign data?', a: 'Through in-person campaigns across Lebanon, partnerships with NGOs and deaf communities, and family volunteers we trained ourselves.' },
  { q: 'What model architecture are you using?', a: 'LSTM-based neural networks for sequential gesture recognition. Researching Transformer-based models for the next phase.' },
  { q: 'Who is this for?', a: 'Anyone who wants to communicate across the hearing-deaf divide — healthcare workers, educators, families, and the deaf community itself.' },
]

const team = [
  { name: 'Layth Ayache', role: 'AI & ML Lead', desc: 'Computer vision, model training, data pipeline, dataset cleaning & augmentation, community outreach, event planning' },
  { name: 'Tayseer Laz', role: 'Web & PR Lead', desc: 'Website development, model integration into mobile app, data collection, community communications, event coordination' },
  { name: 'Abu Baker Hussein El Khatib', role: 'App Developer', desc: 'Flutter mobile app, web app development, data collection at campus events and community booths' },
  { name: 'Noor El Hariri', role: 'Project Coordinator', desc: 'Flutter app development, academic documentation, project reports, research coordination' },
  { name: 'Rami Kronbi', role: 'Computer Vision Engineer', desc: 'ML engineering, CV pipeline development, data collection, next-phase technical lead' },
  { name: 'Dr. Oussama Mustapha', role: 'Research Advisor', desc: 'Academic guidance, research methodology, project oversight' },
]

/* ===== DEMO PLAYER ===== */

function DemoPlayer() {
  const iphoneRef = useRef(null)
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState('0:00')
  const [duration, setDuration] = useState('0:00')
  const rafRef = useRef(null)

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const getVideo = () => iphoneRef.current?.getVideo()

  useEffect(() => {
    const tick = () => {
      const vid = getVideo()
      if (vid && vid.duration) {
        setProgress((vid.currentTime / vid.duration) * 100)
        setCurrentTime(formatTime(vid.currentTime))
        setDuration(formatTime(vid.duration))
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const togglePlay = () => {
    const vid = getVideo()
    if (!vid) return
    if (vid.paused) {
      vid.play()
      setPlaying(true)
    } else {
      vid.pause()
      setPlaying(false)
    }
  }

  const toggleMute = () => {
    const vid = getVideo()
    if (!vid) return
    vid.muted = !vid.muted
    setMuted(vid.muted)
  }

  const handleSeek = (e) => {
    const vid = getVideo()
    if (!vid || !vid.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const pct = x / rect.width
    vid.currentTime = pct * vid.duration
  }

  return (
    <div className="os-demo-video">
      <div className="os-iphone-wrap os-iphone-landscape">
        <Iphone16Pro
          ref={iphoneRef}
          width={392}
          height={798}
          videoRotate={-90}
          videoSrc="https://pub-f6654749f9534ed48b99cc5f4b614b9b.r2.dev/WhatsApp%20Video%202025-11-29%20at%2012.43.10%20PM.mp4"
        />
      </div>

      <div className="os-controls">
        <button className="os-ctrl-btn" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <span className="os-ctrl-time">{currentTime}</span>

        <div className="os-ctrl-track" onClick={handleSeek}>
          <div className="os-ctrl-track-bg" />
          <div className="os-ctrl-track-fill" style={{ width: `${progress}%` }} />
          <div className="os-ctrl-thumb" style={{ left: `${progress}%` }} />
        </div>

        <span className="os-ctrl-time">{duration}</span>

        <button className="os-ctrl-btn" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
          {muted ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M19.07 4.93a10 10 0 010 14.14" />
              <path d="M15.54 8.46a5 5 0 010 7.07" />
            </svg>
          )}
        </button>
      </div>

      <span className="os-video-caption">Live demo of OmniSign translating Lebanese Sign Language in real time</span>
    </div>
  )
}

/* ===== COMPONENTS ===== */

function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`os-faq-item ${open ? 'os-faq-item--open' : ''}`} onClick={() => setOpen(!open)}>
      <div className="os-faq-q">
        <span>{q}</span>
        <motion.span
          className="os-faq-icon"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
        >+</motion.span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="os-faq-a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ===== MAIN PAGE ===== */

export default function OmniSignPage() {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="os">

      {/* Hero */}
      <header className="os-hero">
        <Reveal>
          <div className="os-hero-logo">
            <img src="/Untitled design (1).svg" alt="OmniSign" className="os-logo-img" />
            <span className="os-logo-label name-styled">OmniSign</span>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <h1 className="os-hero-title">
            AI-Powered Lebanese Sign Language Translation
          </h1>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="os-hero-sub">
            AI-powered sign language translation — built from scratch for a language that technology forgot.
          </p>
        </Reveal>
        <Reveal delay={0.35}>
          <div className="os-hero-tags">
            <span className="os-tag os-tag--ongoing">ongoing</span>
            <span className="os-tag">accessibility</span>
            <span className="os-tag">computer vision</span>
            <span className="os-tag">self-funded</span>
          </div>
        </Reveal>
        <Reveal delay={0.45}>
          <DemoPlayer />
        </Reveal>
      </header>

      {/* Stats */}
      <section className="os-stats">
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 0.1} className="os-stat">
            <span className="os-stat-val">{s.value}</span>
            <span className="os-stat-label">{s.label}</span>
            <span className="os-stat-sub">{s.sub}</span>
          </Reveal>
        ))}
      </section>

      {/* How It Started */}
      <section className="os-section">
        <Reveal><h2 className="os-section-title">How It Started</h2></Reveal>
        <Reveal>
          <p className="os-lead">It started with a joke nobody laughed at.</p>
        </Reveal>
        <Reveal>
          <div className="os-story">
            <p>During COVID, I met a deaf man at a clinic. He wasn't struggling to be understood — the staff eventually figured out what he needed through context and gestures.</p>
            <p>What I noticed was different. He was trying to tell a joke. You could see it in his face, his timing, the way he paused for a reaction that never came. Nobody understood him enough to laugh with him.</p>
            <p>He had every right to share that moment with the people around him — easier than that. That was when OmniSign became more than an idea.</p>
            <p>Our university gave us the option to choose from faculty-approved projects. We chose to find our own challenge instead. It felt overwhelming. But it felt right.</p>
          </div>
        </Reveal>
        <Reveal>
          <blockquote className="os-quote">
            He had every right to share that moment with the people around him — easier than that.
          </blockquote>
        </Reveal>
      </section>

      {/* What We Found */}
      <section className="os-section">
        <Reveal><h2 className="os-section-title">What We Found</h2></Reveal>
        <Reveal><p className="os-lead">A language with no map</p></Reveal>
        <Reveal>
          <div className="os-regions">
            {regions.map((r, i) => (
              <span key={i} className="os-region">
                {r}
                {i < regions.length - 1 && <span className="os-region-neq">&ne;</span>}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <div className="os-story">
            <p>We entered this project assuming data existed. It didn't. We assumed sign language was universal across all spoken languages. It wasn't.</p>
            <p>Arabic sign language in Saudi Arabia is completely different from Lebanon. And Lebanon — in a way that surprised no one who knows the country — didn't have a unified sign language at all.</p>
            <p>Beqaa was different from the South. The South was different from Beirut. Even different sign language schools within Beirut signed differently from each other.</p>
            <p>We spent three months traveling the country trying to find common ground. We couldn't. We were close to giving up.</p>
            <p>Then the team got stubborn. All of us, by nature. We decided this was the step we had to take ourselves — not wait for someone else to take it.</p>
          </div>
        </Reveal>
        <Reveal>
          <blockquote className="os-quote os-quote--accent">
            "We decided this was the step we had to take ourselves — not wait for someone else to take it."
          </blockquote>
        </Reveal>
      </section>

      {/* What We Built */}
      <section className="os-section">
        <Reveal><h2 className="os-section-title">What We Built</h2></Reveal>
        <Reveal><p className="os-lead">50,000 signs, built by hand</p></Reveal>

        <div className="os-data-stats">
          {dataStats.map((d, i) => (
            <Reveal key={i} delay={i * 0.1} className="os-data-stat">
              <span className="os-data-val">{d.value}</span>
              <p className="os-data-label">{d.label}</p>
              <p className="os-data-sub">{d.sub}</p>
              <span className="os-data-tag">{d.tag}</span>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="os-story">
            <p>We held data collection campaigns across Lebanon. Volunteers signed at our homes — family members we taught ourselves. We partnered with NGOs and deaf communities who opened their doors to us.</p>
            <p>We collected over 50,000 signs in total. After processing, cleaning, and augmenting the data, we ended up with over 80,000 image flows — covering the full Arabic alphabet and around 30 words and expressions used in daily life.</p>
            <p>It was a messy process. If it wasn't for the team's chemistry, it never would have happened.</p>
          </div>
        </Reveal>

        {/* Partners */}
        <Reveal><h3 className="os-sub-title">Community Partners</h3></Reveal>
        <div className="os-partners">
          {partners.map((p, i) => (
            <Reveal key={i} delay={i * 0.08} className="os-partner">
              <span className="os-partner-name">{p.name}</span>
              <span className="os-partner-desc">{p.desc}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why It Matters */}
      <section className="os-section">
        <Reveal><h2 className="os-section-title">Why It Matters</h2></Reveal>
        <Reveal>
          <blockquote className="os-quote os-quote--large">
            "This isn't a final year project to them. This is a new life."
          </blockquote>
        </Reveal>
        <Reveal>
          <div className="os-story">
            <p>Deaf individuals in Lebanon reach out at least once a month asking how they can help. They don't see a university assignment — they see the beginning of something that could change their daily life.</p>
            <p>The community has been requesting clinical and medical phrases as a priority — the situations where miscommunication carries the highest cost.</p>
            <p>Lebanon's sign language translators are rare and expensive. Many deaf people can't afford consistent access. Even among translators, differences in regional signing mean understanding isn't guaranteed. OmniSign exists because this gap shouldn't depend on who you can afford to hire.</p>
          </div>
        </Reveal>
      </section>

      {/* How It Works */}
      <section className="os-section">
        <Reveal><h2 className="os-section-title">How It Works</h2></Reveal>
        <Reveal><p className="os-lead">From gesture to language</p></Reveal>
        <Reveal>
          <p className="os-story-p">OmniSign combines computer vision, neural language modeling, and edge computing to provide real-time gesture-to-text-and-speech translation — with privacy as a structural constraint, not an afterthought.</p>
        </Reveal>

        <div className="os-features">
          {features.map((f, i) => (
            <Reveal key={i} delay={i * 0.06} className="os-feature">
              <span className="os-feature-num">{f.num}</span>
              <h4 className="os-feature-title">{f.title}</h4>
              <p className="os-feature-desc">{f.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="os-section">
        <Reveal><h2 className="os-section-title">What's Next</h2></Reveal>
        <Reveal><p className="os-lead">The road ahead</p></Reveal>

        <div className="os-timeline">
          {timeline.map((t, i) => (
            <Reveal key={i} delay={i * 0.1} className="os-tl-item">
              <div className="os-tl-dot" />
              <div className="os-tl-content">
                <span className="os-tl-period">{t.period}</span>
                <h4 className="os-tl-title">{t.title}</h4>
                <p className="os-tl-desc">{t.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="os-section">
        <Reveal><h2 className="os-section-title">Frequently Asked</h2></Reveal>
        <div className="os-faqs">
          {faqs.map((f, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <FaqItem q={f.q} a={f.a} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="os-section">
        <Reveal><h2 className="os-section-title">The People Behind OmniSign</h2></Reveal>
        <div className="os-team">
          {team.map((t, i) => (
            <Reveal key={i} delay={i * 0.08} className="os-member">
              <div className="os-member-avatar">
                {t.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <h4 className="os-member-name">{t.name}</h4>
              <span className="os-member-role">{t.role}</span>
              <p className="os-member-desc">{t.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

    </div>
  )
}
