import { Gravity, MatterBody } from './Gravity'
import './GravitySection.css'

const pills = [
  { label: 'Ship Fast', bg: 'var(--burgundy)', x: '15%', y: '10%' },
  { label: '0 → 1 Builder', bg: 'var(--burgundy-dark)', x: '35%', y: '15%', large: true },
  { label: 'Pixel Perfect', bg: 'var(--orange-warm)', x: '55%', y: '8%' },
  { label: 'Cross-Platform', bg: 'var(--burgundy-light)', x: '75%', y: '12%' },
  { label: 'Team Player', bg: 'var(--burgundy-deep)', x: '25%', y: '25%' },
  { label: 'Problem Solver', bg: 'var(--orange-glow)', x: '45%', y: '20%' },
  { label: 'Full Stack', bg: 'var(--burgundy)', x: '65%', y: '18%' },
  { label: 'API Design', bg: 'var(--burgundy-dark)', x: '20%', y: '30%' },
  { label: 'CI/CD', bg: 'var(--orange-warm)', x: '80%', y: '25%' },
  { label: 'Automation', bg: 'var(--burgundy-light)', x: '50%', y: '5%' },
]

export default function GravitySection() {
  return (
    <section className="gravity-section">
      <div className="gravity-header">
        <span className="gravity-accent">How I work</span>
        <h2 className="gravity-title">What Sets Me Apart</h2>
        <p className="gravity-subtitle">
          Drag them around — these define my approach to every product.
        </p>
      </div>
      <div className="gravity-arena">
        <Gravity gravity={{ x: 0, y: 1 }} grabCursor>
          {pills.map((pill, i) => (
            <MatterBody
              key={i}
              matterBodyOptions={{ friction: 0.5, restitution: 0.3 }}
              x={pill.x}
              y={pill.y}
            >
              <div
                className={`gravity-pill${pill.large ? ' gravity-pill--lg' : ''}`}
                style={{ background: pill.bg }}
              >
                {pill.label}
              </div>
            </MatterBody>
          ))}
        </Gravity>
      </div>
    </section>
  )
}
