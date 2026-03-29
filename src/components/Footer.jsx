import './Footer.css'

export default function Footer() {
  const handleBackToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-bottom">
          <span className="footer-copy">&copy; 2026 <span className="name-styled">Tayseer Laz</span>. All rights reserved.</span>
          <span className="footer-credit">Designed & Built by <span className="name-styled">Tayseer</span></span>
          <a href="/" className="footer-back-top" onClick={handleBackToTop}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15" />
            </svg>
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
