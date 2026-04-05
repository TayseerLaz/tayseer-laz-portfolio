import Sparkles from './Sparkles'
import './TrustedBy.css'

const logos = [
  { name: 'OmniSign', svg: <img src="/omnisign-logo__1_-removebg-preview.png" alt="OmniSign" className="trusted-logo trusted-logo--img" /> },
  { name: 'Coco', svg: <img src="/cocos logo.png" alt="Coco" className="trusted-logo trusted-logo--img" /> },
  { name: 'Lancaster', svg: <img src="/lancaster logo.png" alt="Lancaster" className="trusted-logo trusted-logo--img" /> },
  { name: 'iEvents', svg: <img src="/ievents.png" alt="iEvents" className="trusted-logo trusted-logo--img" /> },
  { name: 'LazPress', svg: <img src="/lazpress logo.png" alt="LazPress" className="trusted-logo trusted-logo--img" /> },
  { name: 'ApexGlobal', svg: <img src="/apexglobal.png" alt="ApexGlobal" className="trusted-logo trusted-logo--img" /> },
  { name: 'Achour Holding', svg: <img src="/achour-holding-logo-removebg-preview.png" alt="Achour Holding" className="trusted-logo trusted-logo--img" /> },
  { name: 'Aligned', svg: <img src="/aligned-logo.png" alt="Aligned" className="trusted-logo trusted-logo--img" /> },
]

export default function TrustedBy() {
  return (
    <section className="trusted-section">
      <div className="trusted-content">
        <div className="trusted-text">
          <span className="trusted-highlight">Trusted by teams.</span>
          <br />
          <span>Built for product people.</span>
        </div>

        <div className="trusted-logos">
          {logos.map((l) => (
            <div key={l.name} className="trusted-logo-wrap">{l.svg}</div>
          ))}
        </div>
      </div>

      <div className="trusted-sparkle-area">
        <div className="trusted-gradient" />
        <div className="trusted-curve" />
        <Sparkles
          density={1200}
          color="#b85456"
          className="trusted-sparkles"
          size={1.2}
          speed={0.8}
        />
      </div>
    </section>
  )
}
