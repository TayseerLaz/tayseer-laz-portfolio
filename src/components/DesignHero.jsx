import './DesignHero.css'

export default function DesignHero() {
  return (
    <section className="dh-section">
      <div className="dh-dots" />

      <div className="dh-content">
        <div className="dh-row">
          <p className="dh-aside dh-aside--left">
            Product developer based in Beirut, Lebanon — turning ideas into shipped products.
          </p>
          <h2 className="dh-word">DIGITAL</h2>
        </div>

        <div className="dh-row">
          <h2 className="dh-word">
            <span>PR</span>
            <svg className="dh-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="var(--burgundy-light)">
              <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>
            <span>DUCTS</span>
          </h2>
          <p className="dh-aside dh-aside--right">
            Open to freelance, product roles, and collaborations worldwide.
          </p>
        </div>

        <div className="dh-row">
          <h2 className="dh-word">
            <span>DESIGN</span>
            <svg className="dh-heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="var(--burgundy)">
              <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
            </svg>
            <span>CODE</span>
          </h2>
        </div>
      </div>

      <div className="dh-bottom">
        <div className="dh-separator" />
        <div className="dh-bottom-row">
          <span className="dh-location">BEIRUT, LEBANON</span>
          <div className="dh-bottom-name">
            <span className="dh-role">DEVELOPER</span>
            <span className="dh-name">tayseer</span>
          </div>
        </div>
      </div>

      <div className="dh-badge">
        <span className="dh-badge-text">Available</span>
      </div>
    </section>
  )
}
