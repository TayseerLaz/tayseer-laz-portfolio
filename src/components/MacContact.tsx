import { useEffect, useRef, useState, type FormEvent } from 'react'
import { site } from '../content'
import './MacContact.css'

type Item = { label: string; say?: string; action?: 'clear' | 'send' | 'about'; divider?: boolean; disabled?: boolean }
const MENUS: { name: string; items: Item[] }[] = [
  { name: '◆', items: [
    { label: 'About This Macintosh…', action: 'about' },
    { divider: true, label: '' },
    { label: 'Calculator', say: 'It says 3 years of work and 12 products. Checks out.' },
    { label: 'Chooser', say: 'You chose Tayseer. Good choice.' },
    { label: 'Key Caps', say: '⌘ ⌥ ⇧ ⌃. All the keys are here, do not lose them.' },
  ] },
  { name: 'File', items: [
    { label: 'New Message', say: 'That is the window you are already looking at.' },
    { label: 'Open…', say: 'Opening… it is just this message. Nothing else on the disk.' },
    { label: 'Save', say: 'Saved to a 1.44 MB floppy. 1.43 MB left.' },
    { divider: true, label: '' },
    { label: 'Print…', say: 'The ImageWriter is out of ribbon. Try email.' },
    { label: 'Send', action: 'send' },
    { divider: true, label: '' },
    { label: 'Quit', say: 'You cannot quit. This is a website.' },
  ] },
  { name: 'Edit', items: [
    { label: 'Undo', say: 'Undid the last thing. You did not notice, which proves it worked.' },
    { divider: true, label: '' },
    { label: 'Cut', say: 'Cut. Paste it somewhere nice.' },
    { label: 'Copy', say: 'Copied to the clipboard. The clipboard is from 1991.' },
    { label: 'Paste', say: 'Pasted. Looks the same as before, suspiciously.' },
    { label: 'Clear', action: 'clear' },
    { divider: true, label: '' },
    { label: 'Select All', say: 'Everything is selected. Feel the power.' },
  ] },
  { name: 'View', items: [
    { label: 'by Icon', say: 'Icons: one envelope. It is this one.' },
    { label: 'by Name', say: 'Names: New Message. That is the whole list.' },
    { label: 'by Date', say: 'Dates: today. Well, 1991 and today.' },
    { divider: true, label: '' },
    { label: 'Clean Up Window', say: 'Window cleaned. It was already tidy. Thanks for asking.' },
  ] },
  { name: 'Special', items: [
    { label: 'Empty Trash…', say: 'Trash emptied. It held a draft that started with “Dear Sir or Madam”.' },
    { label: 'Eject Disk', say: 'Disk ejected. Please insert the disk named “Portfolio” to continue.' },
    { divider: true, label: '' },
    { label: 'Restart', say: 'Restarting… just kidding, this machine is immortal.' },
    { label: 'Shut Down', say: 'It is now safe to turn off your Macintosh. Or keep scrolling.' },
  ] },
]

function MenuBar({ onSay, onAction }: { onSay: (t: string) => void; onAction: (a: Item['action']) => void }) {
  const [open, setOpen] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (open === null) return
    const close = (e: PointerEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(null) }
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null) }
    document.addEventListener('pointerdown', close); document.addEventListener('keydown', key)
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', key) }
  }, [open])
  const pick = (it: Item) => {
    setOpen(null)
    if (it.action) onAction(it.action)
    else if (it.say) onSay(it.say)
  }
  return (
    <div className="mac__menubar" ref={ref}>
      {MENUS.map((m, i) => (
        <div key={m.name} className={`menu ${open === i ? 'is-open' : ''}`}>
          <button type="button" className="menu__name" aria-haspopup="menu" aria-expanded={open === i}
            onClick={() => setOpen(open === i ? null : i)} onMouseEnter={() => { if (open !== null) setOpen(i) }}>
            {m.name}
          </button>
          {open === i && (
            <ul className="menu__list" role="menu">
              {m.items.map((it, k) => it.divider
                ? <li key={k} className="menu__divider" role="separator" />
                : <li key={k} role="none"><button type="button" role="menuitem" onClick={() => pick(it)}>{it.label}</button></li>)}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}

/** The same contact form, inside an illustrated classic Macintosh running a System 7 style mail window. */
export default function MacContact() {
  const [name, setName] = useState('')
  const [from, setFrom] = useState('')
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState<string | null>(null)
  const [note, setNote] = useState<string | null>(null)
  const [about, setAbout] = useState(false)

  const send = (e?: FormEvent) => {
    e?.preventDefault()
    const missing = !name.trim() ? 'ID = 01, sender not found.' : !from.trim() || !from.includes('@') ? 'ID = 02, address is not a valid address.' : !msg.trim() ? 'ID = 03, message body is empty.' : null
    if (missing) { setErr(missing); return }
    const subject = encodeURIComponent(`Message from ${name || 'a visitor'}`)
    const body = encodeURIComponent(`${msg}\n\n— ${name}${from ? ` (${from})` : ''}`)
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
  }

  return (
    <section className="mac" aria-labelledby="mac-title">
      <div className="wrap mac__inner">
        <h2 id="mac-title" className="h2 mac__title">Or write me on the old machine.</h2>

        <div className="mac__case" aria-hidden="false">
          <div className="mac__bezel">
            <div className="mac__screen">
              <MenuBar
                onSay={(t) => setNote(t)}
                onAction={(a) => {
                  if (a === 'clear') { setName(''); setFrom(''); setMsg(''); setNote('Cleared. A fresh start.') }
                  if (a === 'send') send()
                  if (a === 'about') setAbout(true)
                }}
              />

              <form className="mw" onSubmit={send} noValidate>
                <div className="mw__title">
                  <span className="mw__close" aria-hidden="true" />
                  <span className="mw__stripes" aria-hidden="true" />
                  <span className="mw__name">New Message</span>
                  <span className="mw__stripes" aria-hidden="true" />
                  <span className="mw__zoom" aria-hidden="true" />
                </div>
                <div className="mw__body">
                  <label className="mw__row"><span>From:</span><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Rami Kronbi" autoComplete="name" required /></label>
                  <label className="mw__row"><span>Email:</span><input type="email" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="rami@company.com" autoComplete="email" required /></label>
                  <label className="mw__row"><span>To:</span><input value={`${site.name} <${site.email}>`} readOnly /></label>
                  <label className="mw__row mw__row--area"><span>Message:</span><textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={5} placeholder="Type your message…" required /></label>
                  <div className="mw__foot">
                    <span className="mw__hint">⌘S to send</span>
                    <button type="submit" className="mw__send">Send</button>
                  </div>
                </div>
              </form>

              {note && (
                <div className="bomb" role="alertdialog" aria-labelledby="note-text">
                  <div className="bomb__box">
                    <div className="bomb__row">
                      <svg className="bomb__icon" viewBox="0 0 48 48" aria-hidden="true"><path d="M6 10h36v24H26l-10 8v-8H6z" fill="#fff" stroke="#000" strokeWidth="2.5" strokeLinejoin="round" /><circle cx="16" cy="22" r="2" /><circle cx="24" cy="22" r="2" /><circle cx="32" cy="22" r="2" /></svg>
                      <p id="note-text" className="bomb__text"><span>{note}</span></p>
                    </div>
                    <div className="bomb__btns"><button type="button" className="is-default" onClick={() => setNote(null)} autoFocus>OK</button></div>
                  </div>
                </div>
              )}

              {about && (
                <div className="bomb" role="dialog" aria-labelledby="about-title">
                  <div className="bomb__box about-box">
                    <p id="about-title" className="about-box__title">About This Macintosh</p>
                    <div className="about-box__grid">
                      <span>System software:</span><span>Portfolio 7.0.1</span>
                      <span>Built by:</span><span>{site.name}</span>
                      <span>Total memory:</span><span>4,096K · all of it ideas</span>
                      <span>Largest unused block:</span><span>your next project</span>
                      <span>Uptime:</span><span>3 years, 12 products, 0 crashes*</span>
                    </div>
                    <p className="about-box__fine">* the bomb dialog does not count.</p>
                    <div className="bomb__btns"><button type="button" className="is-default" onClick={() => setAbout(false)} autoFocus>OK</button></div>
                  </div>
                </div>
              )}

              {err && (
                <div className="bomb" role="alertdialog" aria-labelledby="bomb-text">
                  <div className="bomb__box">
                    <div className="bomb__row">
                      <svg className="bomb__icon" viewBox="0 0 48 48" aria-hidden="true">
                        <circle cx="20" cy="30" r="15" fill="#000" />
                        <rect x="24" y="10" width="8" height="8" fill="#000" />
                        <path d="M30 12c4-6 10-6 12-2" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M42 8l3-3M44 12l4-1M40 4l1-4" stroke="#000" strokeWidth="2" strokeLinecap="round" />
                        <path d="M13 26a8 8 0 0 1 6-6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      <p id="bomb-text" className="bomb__text">
                        Sorry, a system error occurred.<br /><span>{err}</span>
                      </p>
                    </div>
                    <div className="bomb__btns">
                      <button type="button" onClick={() => { setName(''); setFrom(''); setMsg(''); setErr(null) }}>Restart</button>
                      <button type="button" className="is-default" onClick={() => setErr(null)} autoFocus>Resume</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mac__chin" aria-hidden="true">
            <span className="mac__badge">TL</span>
            <span className="mac__slot" />
          </div>
        </div>
        <div className="mac__stand" aria-hidden="true">
          <span className="mac__neck" />
          <span className="mac__foot" />
        </div>
      </div>
    </section>
  )
}
