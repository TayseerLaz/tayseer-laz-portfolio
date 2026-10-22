import { useEffect, useMemo, useRef, useState } from 'react'
import { site } from '../content'
import './Notes.css'

type Note = { id: string; title: string; date: string; tone: string; pinned: boolean; source?: string; href?: string }
const KEY = 'tl-notes-v2' // bumped so browsers reload the starter notes after the list changed
const TONES = ['deep', 'mid', 'sage', 'teal', 'mint']

const REMOVED = new Set(['n6']) // starter notes deleted after launch; dropped from any saved list too
const SEEDED = 'tl-notes-seed-v3' // set once the press and article notes were added to a saved list
const STARTER = site.notes as Note[]

function load(): Note[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const byId = new Map(STARTER.map((n) => [n.id, n]))
      // keep the viewer's titles and pins, but always take links and sources from the content file
      let list = (JSON.parse(raw) as Note[]).filter((n) => !REMOVED.has(n.id)).map((n) => {
        const s = byId.get(n.id)
        return s ? { ...n, source: s.source, href: s.href, date: s.date } : n
      })
      if (!localStorage.getItem(SEEDED)) {
        const have = new Set(list.map((n) => n.id))
        list = [...STARTER.filter((n) => !have.has(n.id)), ...list]
        localStorage.setItem(SEEDED, '1')
      }
      return list
    }
  } catch { /* private mode or blocked storage: fall through */ }
  return STARTER
}
function fmt(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>(STARTER)
  const [loaded, setLoaded] = useState(false)
  const [q, setQ] = useState('')
  const [editing, setEditing] = useState<string | null>(null)
  const titleRefs = useRef<Record<string, HTMLHeadingElement | null>>({})

  useEffect(() => {
    setNotes(load())
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) {
      try { localStorage.setItem(KEY, JSON.stringify(notes)) } catch { /* ignore */ }
    }
  }, [notes, loaded])

  useEffect(() => {
    if (editing) {
      const el = titleRefs.current[editing]
      if (el) {
        el.focus()
        const r = document.createRange(); r.selectNodeContents(el); r.collapse(false)
        const sel = window.getSelection(); sel?.removeAllRanges(); sel?.addRange(r)
      }
    }
  }, [editing])

  const shown = useMemo(() => {
    const t = q.trim().toLowerCase()
    const list = t ? notes.filter((n) => n.title.toLowerCase().includes(t)) : notes
    return [...list].sort((a, b) => Number(b.pinned) - Number(a.pinned))
  }, [notes, q])

  const add = () => {
    const id = 'n' + Date.now()
    const tone = TONES[notes.length % TONES.length]
    setNotes([{ id, title: 'New note', date: new Date().toISOString().slice(0, 10), tone, pinned: false }, ...notes])
    setQ('')
    setEditing(id)
  }
  const commit = (id: string, text: string) => {
    const title = text.trim() || 'Untitled'
    setNotes((ns) => ns.map((n) => (n.id === id ? { ...n, title } : n)))
    setEditing(null)
  }
  const togglePin = (id: string) => setNotes((ns) => ns.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)))
  const remove = (id: string) => setNotes((ns) => ns.filter((n) => n.id !== id))

  return (
    <section className="notes" id="notes" aria-labelledby="notes-title">
      <div className="wrap notes__main">
        <div className="notes__head">
          <h2 id="notes-title" className="notes__title">Notes</h2>
          <label className="notes__search">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
            <input type="search" placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search notes" />
          </label>
          <button className="notes__add" onClick={add} aria-label="Add a note">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
          </button>
        </div>

          {shown.length === 0 ? (
            <p className="notes__empty">No notes match “{q}”.</p>
          ) : (
            <ul className="notes__grid">
              {shown.map((n) => (
                <li key={n.id} className={`note note--${n.tone}`}>
                  <button className={`note__pin ${n.pinned ? 'is-on' : ''}`} onClick={() => togglePin(n.id)} aria-pressed={n.pinned} aria-label={n.pinned ? 'Unpin note' : 'Pin note'}>
                    <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8l-5.4 2.9 1.1-6.1L3.2 9.4l6.1-.8z" fill="currentColor" /></svg>
                  </button>
                  <h3
                    className="note__text"
                    ref={(el) => { titleRefs.current[n.id] = el }}
                    contentEditable={editing === n.id}
                    suppressContentEditableWarning
                    onBlur={(e) => editing === n.id && commit(n.id, e.currentTarget.textContent ?? '')}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); (e.currentTarget as HTMLElement).blur() } if (e.key === 'Escape') { e.currentTarget.textContent = n.title; (e.currentTarget as HTMLElement).blur() } }}
                  >
                    {n.title}
                  </h3>
                  {n.href && (
                    <a className="note__src" href={n.href} target="_blank" rel="noreferrer">
                      {n.source} <svg viewBox="0 0 12 12" width="9" height="9" aria-hidden="true"><path d="M3 9 9 3M4 3h5v5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </a>
                  )}
                  <div className="note__foot">
                    {n.date ? <time dateTime={n.date}>{fmt(n.date)}</time> : <span>Credit</span>}
                    <div className="note__actions">
                      <button className="note__btn note__btn--ghost" onClick={() => remove(n.id)} aria-label="Delete note">
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M5 7h14M9 7V4h6v3M8 7l1 13h6l1-13" /></svg>
                      </button>
                      <button className="note__btn" onClick={() => setEditing(n.id)} aria-label="Edit note">
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16z" /></svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
      </div>
    </section>
  )
}
