import { useState, useEffect } from 'react'
import './Navbar.css'

const links = ['Home', 'About', 'Work', 'Contact']

export default function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    let lastScroll = 0
    const onScroll = () => {
      const cur = window.scrollY
      setHidden(cur > lastScroll && cur > 100)
      lastScroll = cur
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    if (id === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.getElementById(id.toLowerCase())
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <nav className={`nav ${hidden ? 'nav--hidden' : ''}`}>
        <a href="#" className="nav-logo" data-magnetic onClick={(e) => { e.preventDefault(); scrollTo('Home') }}>
          Tayseer <span>Laz</span>
        </a>
        <div className="nav-links">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link" data-magnetic
              onClick={(e) => { e.preventDefault(); scrollTo(l) }}>{l}</a>
          ))}
        </div>
        <a href="#contact" className="nav-cta" data-magnetic
          onClick={(e) => { e.preventDefault(); scrollTo('Contact') }}>
          <span>Get in touch</span>
          <span className="nav-cta-arrow">&#8599;</span>
        </a>
        <button className={`nav-burger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} className="mobile-menu-link"
            onClick={(e) => { e.preventDefault(); scrollTo(l) }}>{l}</a>
        ))}
      </div>
    </>
  )
}
