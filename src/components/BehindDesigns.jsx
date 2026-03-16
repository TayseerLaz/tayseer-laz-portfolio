import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './BehindDesigns.css'

const cards = [
  {
    title: 'Product Vision',
    desc: 'End-to-end execution from concept to scalable, user-centered platforms.',
    gradient: 'linear-gradient(135deg, var(--burgundy), var(--burgundy-dark))',
    span: 'bd-col-4',
    expandKey: 'vision',
  },
  {
    title: 'Mobile Apps & UI/UX',
    desc: 'Designing interfaces and structuring workflows that feel intuitive and powerful.',
    gradient: 'linear-gradient(135deg, var(--orange-warm), var(--burgundy))',
    span: 'bd-col-8',
    expandKey: 'uiux',
  },
  {
    title: 'Systems & Softwares',
    desc: 'Building scalable systems, platforms, and software solutions from architecture to deployment.',
    gradient: 'linear-gradient(135deg, var(--burgundy-light), var(--orange-glow))',
    span: 'bd-col-8',
    expandKey: 'systems',
  },
  {
    title: 'AI Integration',
    desc: 'Embedding AI tools, chatbots, and smart workflows into real products.',
    gradient: 'linear-gradient(135deg, var(--orange-glow), var(--burgundy-light))',
    span: 'bd-col-4',
    expandKey: 'ai',
  },
]

/* ---- Shared animated block ---- */
function FadeIn({ children, className = '', index = 0, delay = 0.2 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay + index * 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ================= PRODUCT VISION SHOWCASE — User Flow ================= */

function FlowNode({ label, accent, index, delay = 0.2 }) {
  return (
    <motion.div
      className={`uf-node ${accent ? 'uf-node--accent' : ''}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay + index * 0.04, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {label}
    </motion.div>
  )
}

function FlowBranch({ label, accent, children, index = 0, delay = 0.2 }) {
  return (
    <motion.div
      className="uf-branch"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay + index * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={`uf-node ${accent ? 'uf-node--accent' : ''}`}>{label}</div>
      {children && <div className="uf-children">{children}</div>}
    </motion.div>
  )
}

function VisionShowcase({ onClose }) {
  return (
    <motion.div
      className="bd-expand-inner bd-expand-inner--compact"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ delay: 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <button className="bd-expand-close" onClick={onClose}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div className="uf-title">
        <span className="uf-title-accent">Product </span>Flow
      </div>

      <div className="uf-pipeline">
        <FlowNode label="Idea" accent index={0} />
        <div className="uf-arrow" />
        <FlowBranch label="Research" index={1} delay={0.25}>
          <FlowNode label="Market Gap" index={0} delay={0.3} />
          <FlowNode label="User Needs" index={1} delay={0.3} />
        </FlowBranch>
        <div className="uf-arrow" />
        <FlowBranch label="Strategy" accent index={2} delay={0.3}>
          <FlowNode label="Business Model" index={0} delay={0.35} />
          <FlowNode label="Roadmap" index={1} delay={0.35} />
        </FlowBranch>
        <div className="uf-arrow" />
        <FlowBranch label="Build" index={3} delay={0.35}>
          <FlowNode label="MVP" index={0} delay={0.4} />
          <FlowNode label="Test" index={1} delay={0.4} />
        </FlowBranch>
        <div className="uf-arrow" />
        <FlowNode label="Launch" accent index={4} delay={0.4} />
        <div className="uf-arrow" />
        <FlowBranch label="Growth" accent index={5} delay={0.45}>
          <FlowNode label="Scale" index={0} delay={0.5} />
          <FlowNode label="Iterate" index={1} delay={0.5} />
        </FlowBranch>
      </div>
    </motion.div>
  )
}

/* ================= UI/UX SHOWCASE ================= */

function PhoneFrame({ children, className = '', index = 0, delay = 0 }) {
  return (
    <motion.div
      className={`ph ${className}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay + index * 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function IdeaScreen({ title, notes, index }) {
  return (
    <PhoneFrame className="ph--idea" index={index} delay={0.25}>
      <div className="ph-idea-title">{title}</div>
      <div className="ph-idea-notes">
        {notes.map((n, i) => (
          <div key={i} className="ph-idea-note" style={{ '--rot': `${(i % 2 === 0 ? -2 : 2) + Math.random() * 2}deg` }}>
            {n}
          </div>
        ))}
      </div>
    </PhoneFrame>
  )
}

function SketchScreen({ title, index }) {
  return (
    <PhoneFrame className="ph--sketch" index={index} delay={0.3}>
      <div className="ph-sketch-bar" />
      <div className="ph-sketch-title">{title}</div>
      <div className="ph-sketch-body">
        <div className="ph-sketch-rect ph-sketch-rect--hero" />
        <div className="ph-sketch-line" style={{ width: '75%' }} />
        <div className="ph-sketch-line" style={{ width: '50%' }} />
        <div className="ph-sketch-row">
          <div className="ph-sketch-rect ph-sketch-rect--sm" />
          <div className="ph-sketch-rect ph-sketch-rect--sm" />
        </div>
        <div className="ph-sketch-line" style={{ width: '60%' }} />
        <div className="ph-sketch-line" style={{ width: '80%' }} />
      </div>
      <div className="ph-sketch-nav">
        <div className="ph-sketch-nav-dot" />
        <div className="ph-sketch-nav-dot" />
        <div className="ph-sketch-nav-dot" />
      </div>
    </PhoneFrame>
  )
}

function SkeletonScreen({ title, items, index }) {
  return (
    <PhoneFrame className="ph--skeleton" index={index} delay={0.35}>
      <div className="ph-skel-status">
        <span>9:41</span>
        <div className="ph-skel-notch" />
        <div className="ph-skel-batt" />
      </div>
      <div className="ph-skel-header">{title}</div>
      <div className="ph-skel-body">
        {items.map((item, i) => (
          <div key={i} className="ph-skel-row">
            <div className="ph-skel-thumb" />
            <div className="ph-skel-lines">
              <div className="ph-skel-line" style={{ width: '70%' }} />
              <div className="ph-skel-line ph-skel-line--short" style={{ width: '45%' }} />
            </div>
          </div>
        ))}
      </div>
      <div className="ph-skel-nav">
        <div className="ph-skel-nav-item ph-skel-nav-item--active" />
        <div className="ph-skel-nav-item" />
        <div className="ph-skel-nav-item" />
        <div className="ph-skel-nav-item" />
      </div>
    </PhoneFrame>
  )
}

function LiveScreen({ title, items, accent, index }) {
  return (
    <PhoneFrame className="ph--live" index={index} delay={0.4}>
      <div className="ph-live-status">
        <span>9:41</span>
        <div className="ph-live-notch" />
        <div className="ph-live-batt" />
      </div>
      <div className="ph-live-header" style={{ '--accent': accent }}>
        <span className="ph-live-title">{title}</span>
      </div>
      <div className="ph-live-body">
        {items.map((item, i) => (
          <div key={i} className="ph-live-card" style={{ '--accent': accent }}>
            <div className="ph-live-card-icon" style={{ background: accent }} />
            <div className="ph-live-card-info">
              <span className="ph-live-card-label">{item}</span>
              <div className="ph-live-card-bar">
                <div className="ph-live-card-fill" style={{ width: `${55 + i * 15}%`, background: accent }} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="ph-live-nav">
        <div className="ph-live-nav-item ph-live-nav-item--active" style={{ background: accent }} />
        <div className="ph-live-nav-item" />
        <div className="ph-live-nav-item" />
        <div className="ph-live-nav-item" />
      </div>
    </PhoneFrame>
  )
}

function UiuxShowcase({ onClose }) {
  return (
    <motion.div
      className="bd-expand-inner"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ delay: 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <button className="bd-expand-close" onClick={onClose}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div className="bd-stages">
        <div className="bd-stage">
          <div className="bd-stage-label">
            <span className="bd-stage-num">01</span>
            <span className="bd-stage-name">Ideas</span>
          </div>
          <div className="bd-stage-phones">
            <IdeaScreen index={0} title="Home" notes={['Feed', 'Trending', 'For You', 'Recs']} />
            <IdeaScreen index={1} title="Search" notes={['Filters', 'Categories', 'Nearby', 'Popular']} />
            <IdeaScreen index={2} title="Profile" notes={['Stats', 'History', 'Settings', 'Friends']} />
          </div>
        </div>

        <div className="bd-stage">
          <div className="bd-stage-label">
            <span className="bd-stage-num">02</span>
            <span className="bd-stage-name">Sketches</span>
          </div>
          <div className="bd-stage-phones">
            <SketchScreen title="Home" index={0} />
            <SketchScreen title="Search" index={1} />
            <SketchScreen title="Profile" index={2} />
          </div>
        </div>

        <div className="bd-stage">
          <div className="bd-stage-label">
            <span className="bd-stage-num">03</span>
            <span className="bd-stage-name">Skeletons</span>
          </div>
          <div className="bd-stage-phones">
            <SkeletonScreen title="Home" items={['Featured Event', 'Recommended', 'Near You']} index={0} />
            <SkeletonScreen title="Search" items={['Upcoming', 'Categories', 'Popular']} index={1} />
            <SkeletonScreen title="Profile" items={['My Events', 'Saved', 'Friends']} index={2} />
          </div>
        </div>

        <div className="bd-stage">
          <div className="bd-stage-label">
            <span className="bd-stage-num">04</span>
            <span className="bd-stage-name">Colored & Live</span>
          </div>
          <div className="bd-stage-phones">
            <LiveScreen title="Home" items={['Featured Event', 'Recommended', 'Near You']} accent="#8c3839" index={0} />
            <LiveScreen title="Search" items={['Upcoming', 'Categories', 'Popular']} accent="#c4652a" index={1} />
            <LiveScreen title="Profile" items={['My Events', 'Saved', 'Friends']} accent="#8c3839" index={2} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ================= AI INTEGRATION SHOWCASE ================= */

const chatMessages = [
  { role: 'user', text: 'How do I track my order?' },
  { role: 'bot', text: 'I can help! Your order #4821 is currently out for delivery. ETA: 25 min.' },
  { role: 'user', text: 'Can I change the address?' },
  { role: 'bot', text: 'Sure — I\'ve updated delivery to your saved work address. Driver notified.' },
]

const terminalLines = [
  '$ python train_model.py --epochs 50',
  '> Loading dataset... 12,480 samples',
  '> Preprocessing complete',
  '> Epoch 1/50 ━━━━━━━━━━ loss: 0.842',
  '> Epoch 25/50 ━━━━━━━━━━ loss: 0.214',
  '> Epoch 50/50 ━━━━━━━━━━ loss: 0.038',
  '> Model saved → /models/v2.1.pkl',
  '> Accuracy: 96.7% ✓',
  '$ deploy --prod --model v2.1',
  '> Deploying to production...',
  '> ✓ Live at api.example.com/predict',
]

function ChatBot() {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    if (visibleCount >= chatMessages.length) return
    const t = setTimeout(() => setVisibleCount(c => c + 1), 800)
    return () => clearTimeout(t)
  }, [visibleCount])

  return (
    <motion.div
      className="ai-chat"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
    >
      <div className="ai-chat-header">
        <div className="ai-chat-dot ai-chat-dot--green" />
        <span>AI Assistant</span>
      </div>
      <div className="ai-chat-body">
        {chatMessages.slice(0, visibleCount).map((msg, i) => (
          <motion.div
            key={i}
            className={`ai-chat-msg ai-chat-msg--${msg.role}`}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {msg.text}
          </motion.div>
        ))}
        {visibleCount < chatMessages.length && (
          <div className="ai-chat-typing">
            <span /><span /><span />
          </div>
        )}
      </div>
    </motion.div>
  )
}

function Terminal() {
  const [visibleCount, setVisibleCount] = useState(0)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (visibleCount >= terminalLines.length) return
    const delay = terminalLines[visibleCount]?.startsWith('$') ? 600 : 350
    const t = setTimeout(() => setVisibleCount(c => c + 1), delay)
    return () => clearTimeout(t)
  }, [visibleCount])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [visibleCount])

  return (
    <motion.div
      className="ai-terminal"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
    >
      <div className="ai-term-header">
        <div className="ai-term-dots">
          <span className="ai-term-dot ai-term-dot--red" />
          <span className="ai-term-dot ai-term-dot--yellow" />
          <span className="ai-term-dot ai-term-dot--green" />
        </div>
        <span className="ai-term-title">terminal</span>
      </div>
      <div className="ai-term-body" ref={scrollRef}>
        {terminalLines.slice(0, visibleCount).map((line, i) => (
          <motion.div
            key={i}
            className={`ai-term-line ${line.startsWith('$') ? 'ai-term-line--cmd' : ''} ${line.includes('✓') ? 'ai-term-line--ok' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            {line}
          </motion.div>
        ))}
        {visibleCount < terminalLines.length && (
          <span className="ai-term-cursor">▊</span>
        )}
      </div>
    </motion.div>
  )
}

function AiShowcase({ onClose }) {
  return (
    <motion.div
      className="bd-expand-inner bd-expand-inner--compact"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ delay: 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <button className="bd-expand-close" onClick={onClose}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div className="ai-showcase">
        <ChatBot />
        <Terminal />
      </div>
    </motion.div>
  )
}

/* ================= SYSTEMS & SOFTWARES SHOWCASE ================= */

function DashboardMockup() {
  const bars = [35, 55, 70, 45, 80, 60, 50]
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return (
    <motion.div className="dash" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.45 }}>
      {/* Sidebar */}
      <div className="dash-side">
        <div className="dash-logo" />
        {[...Array(6)].map((_, i) => <div key={i} className={`dash-nav-item ${i === 0 ? 'dash-nav-item--active' : ''}`} />)}
      </div>
      {/* Main */}
      <div className="dash-main">
        {/* Top bar */}
        <div className="dash-topbar">
          <div className="dash-search" />
          <div className="dash-avatar" />
        </div>
        {/* Greeting */}
        <div className="dash-greeting">
          <div className="dash-greeting-line dash-greeting-line--big" />
          <div className="dash-greeting-line" />
        </div>
        {/* Stat cards */}
        <div className="dash-stats">
          <div className="dash-stat dash-stat--blue">
            <div className="dash-stat-label" />
            <div className="dash-stat-val">12,480</div>
          </div>
          <div className="dash-stat dash-stat--purple">
            <div className="dash-stat-label" />
            <div className="dash-stat-val">1,376</div>
          </div>
          <div className="dash-stat dash-stat--green">
            <div className="dash-stat-label" />
            <div className="dash-stat-val">96.7%</div>
          </div>
        </div>
        {/* Chart */}
        <div className="dash-chart">
          <div className="dash-chart-header">
            <div className="dash-chart-title" />
            <div className="dash-chart-badge" />
          </div>
          <div className="dash-bars">
            {bars.map((h, i) => (
              <div key={i} className="dash-bar-col">
                <motion.div
                  className="dash-bar"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.5 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
                <span className="dash-bar-label">{days[i]}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Table */}
        <div className="dash-table">
          <div className="dash-table-header">
            {['Task', 'Date', 'Accuracy', 'Status'].map((h, i) => (
              <span key={i} className="dash-th">{h}</span>
            ))}
          </div>
          {[
            { task: 'Chat Analysis', date: '12 Dec', acc: '97%', status: 'success' },
            { task: 'Fraud Detection', date: '13 Dec', acc: '86%', status: 'warning' },
            { task: 'Data Processing', date: '14 Dec', acc: '74%', status: 'error' },
          ].map((row, i) => (
            <motion.div key={i} className="dash-tr" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + i * 0.08 }}>
              <span className="dash-td">{row.task}</span>
              <span className="dash-td dash-td--dim">{row.date}</span>
              <span className="dash-td">{row.acc}</span>
              <span className={`dash-td dash-td--${row.status}`}>●</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function FinanceMockup() {
  return (
    <motion.div className="dash dash--dark" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.45 }}>
      {/* Sidebar */}
      <div className="dash-side dash-side--dark">
        <div className="dash-logo dash-logo--dark" />
        {[...Array(6)].map((_, i) => <div key={i} className={`dash-nav-item dash-nav-item--dark ${i === 0 ? 'dash-nav-item--active-dark' : ''}`} />)}
      </div>
      {/* Main */}
      <div className="dash-main dash-main--dark">
        <div className="dash-topbar">
          <div className="dash-greeting-line dash-greeting-line--big dash-greeting-line--dark" />
          <div className="dash-avatar" />
        </div>
        {/* Portfolio + Assets */}
        <div className="dash-finance-top">
          <div className="dash-portfolio">
            <div className="dash-portfolio-label" />
            <div className="dash-portfolio-val">$17,643</div>
            {/* Mini line chart */}
            <svg className="dash-line-chart" viewBox="0 0 120 40" fill="none">
              <motion.path
                d="M0 35 Q15 30 25 28 T50 20 T75 25 T95 12 T120 8"
                stroke="#818cf8"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 1.2, ease: 'easeOut' }}
              />
            </svg>
          </div>
          <div className="dash-assets">
            {[
              { name: 'BTC', val: '1.25', color: '#f7931a' },
              { name: 'LTC', val: '0.32', color: '#bfbbbb' },
              { name: 'ETH', val: '1.25', color: '#627eea' },
            ].map((a, i) => (
              <motion.div key={i} className="dash-asset" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.08 }}>
                <div className="dash-asset-icon" style={{ background: a.color }} />
                <span className="dash-asset-name">{a.name}</span>
                <span className="dash-asset-val">{a.val}</span>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Market table */}
        <div className="dash-table dash-table--dark">
          <div className="dash-table-header">
            {['Name', 'Price', 'Change', 'Cap'].map((h, i) => (
              <span key={i} className="dash-th">{h}</span>
            ))}
          </div>
          {[
            { name: 'Band', price: '$2.42', change: '+13.38%', cap: '$399M' },
            { name: 'VeChain', price: '$7.48', change: '+11.19%', cap: '$152M' },
            { name: 'Aave', price: '$0.018', change: '+7.57%', cap: '$1.2B' },
          ].map((row, i) => (
            <motion.div key={i} className="dash-tr" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + i * 0.08 }}>
              <span className="dash-td">{row.name}</span>
              <span className="dash-td">{row.price}</span>
              <span className="dash-td dash-td--success">{row.change}</span>
              <span className="dash-td dash-td--dim">{row.cap}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function SystemsShowcase({ onClose }) {
  return (
    <motion.div
      className="bd-expand-inner"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ delay: 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <button className="bd-expand-close" onClick={onClose}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div className="sys-dashboards">
        <DashboardMockup />
        <FinanceMockup />
      </div>
    </motion.div>
  )
}

/* ================= MAIN COMPONENT ================= */

export default function BehindDesigns() {
  const [expanded, setExpanded] = useState(null) // 'vision' | 'uiux' | null

  const toggle = (key) => setExpanded(expanded === key ? null : key)

  return (
    <section className="bd section">
      <div className="section-container">
        <div className="bd-header">
          <h2 className="bd-title">
            Grow faster with
            <span className="bd-title-dim"> an all-in-one approach</span>
          </h2>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bd-btn"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
          >
            Get in touch
          </motion.a>
        </div>

        <div className="bd-grid bd-grid--top">
          {cards.slice(0, 2).map((card, i) => (
            <BounceCard
              key={i}
              className={card.span}
              onClick={card.expandKey ? () => toggle(card.expandKey) : undefined}
              expandable={!!card.expandKey}
            >
              <h3 className="bd-card-title">{card.title}</h3>
              <div className="bd-card-inner" style={{ background: card.gradient }}>
                <span className="bd-card-desc">{card.desc}</span>
              </div>
            </BounceCard>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {expanded === 'vision' && (
            <motion.div
              key="vision"
              className="bd-expand"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <VisionShowcase onClose={() => setExpanded(null)} />
            </motion.div>
          )}
          {expanded === 'uiux' && (
            <motion.div
              key="uiux"
              className="bd-expand"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <UiuxShowcase onClose={() => setExpanded(null)} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bd-grid bd-grid--bottom">
          {cards.slice(2).map((card, i) => (
            <BounceCard
              key={i}
              className={card.span}
              onClick={card.expandKey ? () => toggle(card.expandKey) : undefined}
              expandable={!!card.expandKey}
            >
              <h3 className="bd-card-title">{card.title}</h3>
              <div className="bd-card-inner" style={{ background: card.gradient }}>
                <span className="bd-card-desc">{card.desc}</span>
              </div>
            </BounceCard>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {expanded === 'systems' && (
            <motion.div
              key="systems"
              className="bd-expand bd-expand--bottom"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <SystemsShowcase onClose={() => setExpanded(null)} />
            </motion.div>
          )}
          {expanded === 'ai' && (
            <motion.div
              key="ai"
              className="bd-expand bd-expand--bottom"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <AiShowcase onClose={() => setExpanded(null)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

function BounceCard({ className, children, onClick, expandable }) {
  return (
    <motion.div
      whileHover={{ scale: 0.95, rotate: '-1deg' }}
      className={`bd-bounce-card ${className} ${expandable ? 'bd-bounce-card--expandable' : ''}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
