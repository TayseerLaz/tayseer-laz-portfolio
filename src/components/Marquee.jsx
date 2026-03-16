import './Marquee.css'

const items = [
  'Product Development', 'UI/UX Design', 'SaaS Platforms', 'Mobile Apps',
  'AI Integration', 'Systems Architecture', 'Operations'
]

export default function Marquee() {
  const track = [...items, ...items]

  return (
    <div className="marquee-section">
      <div className="marquee">
        <div className="marquee-track">
          {track.map((item, i) => (
            <span key={i}>
              {i > 0 && <span className="marquee-dot">&#10022;</span>}
              <span className="marquee-word">{item}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
