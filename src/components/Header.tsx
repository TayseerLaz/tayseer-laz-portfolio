import { useEffect, useState } from 'react'
import { site } from '../content'
import './Header.css'

/** The site header drawn as a Google Chrome window: tab strip, toolbar with omnibox, bookmarks bar. */

const TABS = [
  { id: 'top', label: `${site.name} — ${site.role}`, href: '#top', path: '' },
  ...site.nav.map((n) => ({ id: n.href.slice(1), label: n.label, href: n.href, path: n.href })),
]

const I = {
  back: <path d="M15 6l-6 6 6 6" />,
  fwd: <path d="M9 6l6 6-6 6" />,
  reload: <path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5" />,
  lock: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  star: <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9l-5.2 2.8 1-5.9L3.5 9.7l5.9-.8z" />,
  ext: <path d="M10 4a2 2 0 0 1 4 0h3v4a2 2 0 0 1 0 4v4h-4a2 2 0 0 1-4 0H5v-4a2 2 0 0 1 0-4V4z" />,
  more: <><circle cx="12" cy="5" r="1.4" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" /><circle cx="12" cy="19" r="1.4" fill="currentColor" stroke="none" /></>,
  down: <path d="M7 10l5 5 5-5" />,
  plus: <path d="M12 6v12M6 12h12" />,
  x: <path d="M7 7l10 10M17 7L7 17" />,
}
function Icon({ d, size = 16 }: { d: keyof typeof I; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {I[d]}
    </svg>
  )
}

function useHashPath() {
  const read = () => window.location.hash.replace(/^#/, '')
  const [path, setPath] = useState(read)
  useEffect(() => {
    const on = () => setPath(read())
    window.addEventListener('hashchange', on); window.addEventListener('popstate', on)
    return () => { window.removeEventListener('hashchange', on); window.removeEventListener('popstate', on) }
  }, [])
  return path
}

function useActiveSection() {
  const [active, setActive] = useState('top')
  useEffect(() => {
    const ids = TABS.map((t) => t.id)
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (vis[0]) setActive(vis[0].target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.1, 0.5] },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return active
}

export default function Header() {
  const active = useActiveSection()
  const hashPath = useHashPath()
  const current = TABS.find((t) => t.id === active) ?? TABS[0]
  const host = 'tayseerlaz.com'
  const shownPath = hashPath.startsWith('work/') ? hashPath : current.path.replace('#', '')

  return (
    <header className="chrome" role="banner">
      {/* Tab strip */}
      <div className="chrome__strip">
        <div className="chrome__lights" aria-hidden="true"><span /><span /><span /></div>
        <ul className="chrome__tabs" role="tablist" aria-label="Sections">
          {TABS.map((t) => (
            <li key={t.id} className={`tab ${t.id === active ? 'is-active' : ''}`} role="presentation">
              <a href={t.href} role="tab" aria-selected={t.id === active} aria-controls={t.id}>
                <span className="tab__fav" aria-hidden="true" />
                <span className="tab__title">{t.label}</span>
                <span className="tab__close" aria-hidden="true"><Icon d="x" size={12} /></span>
              </a>
            </li>
          ))}
          <li className="chrome__newtab" role="presentation"><a href="#contact" aria-label="New tab"><Icon d="plus" size={14} /></a></li>
        </ul>
        <button className="chrome__tabsearch" aria-label="Search tabs"><Icon d="down" size={14} /></button>
      </div>

      {/* Toolbar */}
      <div className="chrome__bar">
        <div className="chrome__navbtns">
          <a className="cbtn" href="#top" aria-label="Back"><Icon d="back" size={18} /></a>
          <span className="cbtn is-disabled" aria-hidden="true"><Icon d="fwd" size={18} /></span>
          <button className="cbtn" aria-label="Reload" onClick={() => window.location.reload()}><Icon d="reload" size={16} /></button>
        </div>
        <a className="omnibox" href={current.href} aria-label={`Address: ${host}/${shownPath}`}>
          <span className="omnibox__lock"><Icon d="lock" size={13} /></span>
          <span className="omnibox__url"><span className="omnibox__host">{host}</span><span className="omnibox__path">/{shownPath}</span></span>
          <span className="omnibox__star"><Icon d="star" size={15} /></span>
        </a>
        <div className="chrome__right">
          <span className="cbtn" aria-hidden="true"><Icon d="ext" size={16} /></span>
          <a className="chrome__profile" href="#about" aria-label="Profile">TL</a>
          <span className="cbtn" aria-hidden="true"><Icon d="more" size={16} /></span>
        </div>
      </div>

      {/* Bookmarks bar */}
      <nav className="chrome__bookmarks" aria-label="Bookmarks">
        <a href={`mailto:${site.email}`}><span className="bm__fav bm__fav--green" aria-hidden="true" />Email</a>
        <a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><span className="bm__fav bm__fav--blue" aria-hidden="true" />LinkedIn</a>
        <a href="https://github.com/TayseerLaz" target="_blank" rel="noreferrer"><span className="bm__fav bm__fav--dark" aria-hidden="true" />GitHub</a>
      </nav>
    </header>
  )
}
