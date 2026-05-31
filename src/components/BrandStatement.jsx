import './BrandStatement.css'

const Mark = ({ small }) => (
  <div className={`bs-mark${small ? ' bs-mark--small' : ''}`}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" />
    </svg>
  </div>
)

export default function BrandStatement() {
  return (
    <section className="bs-section">
      <div className="bs-header">
        <h2 className="bs-title">Things I see <span className="bs-title-accent">interesting.</span></h2>
      </div>
      <div className="bs-frame">
        <div className="bs-grid">
          {/* Panel 1 — AI as a teammate */}
          <div className="bs-panel bs-panel--left">
            <div className="bs-silhouette">
              <div className="bs-blob bs-blob--vortex" />
              <div className="bs-grain" />
            </div>
            <div className="bs-statement">
              <h3 className="bs-headline">AI AS A<br />TEAMMATE.</h3>
              <div className="bs-footer-row">
                <p className="bs-meta">
                  AGENTS THAT DON'T JUST ANSWER — THEY EXECUTE.<br />
                  RESHAPING HOW WE BUILD, DESIGN, AND SHIP.
                </p>
                <Mark small />
              </div>
            </div>
          </div>

          {/* Panel 2 — Accessibility */}
          <div className="bs-panel bs-panel--center">
            <div className="bs-silhouette">
              <div className="bs-blob bs-blob--head" />
              <div className="bs-grain" />
            </div>
            <div className="bs-statement">
              <h3 className="bs-headline">
                ACCESSIBILITY<br />BY DESIGN.
              </h3>
              <div className="bs-footer-row">
                <p className="bs-meta">
                  PRODUCTS THAT WORK FOR EVERYONE.<br />
                  FROM SIGN LANGUAGE TECH TO LOW-TECH MARKETS.
                </p>
                <Mark small />
              </div>
            </div>
          </div>

          {/* Panel 3 — Beirut tech scene */}
          <div className="bs-panel bs-panel--right">
            <div className="bs-silhouette">
              <div className="bs-blob bs-blob--multi" />
              <div className="bs-grain" />
            </div>
            <div className="bs-statement">
              <h3 className="bs-headline">BUILDING<br />IN BEIRUT.</h3>
              <div className="bs-footer-row">
                <p className="bs-meta">
                  A QUIET RISE OF INDIE DEVS AND STUDIOS.<br />
                  SHIPPING WORLD-CLASS PRODUCT WORK FROM LEBANON.
                </p>
                <Mark small />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
