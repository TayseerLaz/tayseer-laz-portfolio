import { useState, type FormEvent } from 'react'
import { Shape } from '../illustrations/Shapes'
import { site } from '../content'
import './Contact.css'

/** Contact as a postcard: message on the left, stamp, postmark and address on the right. */
export default function Contact() {
  const [name, setName] = useState('')
  const [from, setFrom] = useState('')
  const [msg, setMsg] = useState('')
  const [pigeon, setPigeon] = useState<string | null>(null)

  const send = (e: FormEvent) => {
    e.preventDefault()
    const missing = !name.trim() ? 'name' : !from.trim() || !from.includes('@') ? 'email' : !msg.trim() ? 'message' : null
    if (missing) {
      const lines: Record<string, string> = {
        name: 'Coo. No name, no delivery. Who do I say sent this?',
        email: 'Coo. I fly to real addresses only. Add your email.',
        message: 'Coo. The card is blank. I am not flying across the sea for nothing.',
      }
      setPigeon(lines[missing])
      window.clearTimeout((send as unknown as { t?: number }).t)
      ;(send as unknown as { t?: number }).t = window.setTimeout(() => setPigeon(null), 5000)
      return
    }
    const subject = encodeURIComponent(`Postcard from ${name || 'a visitor'}`)
    const body = encodeURIComponent(`${msg}\n\n— ${name}${from ? ` (${from})` : ''}`)
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
  }

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <h2 id="contact-title" className="h2 contact__title">Send me a postcard.</h2>

        <form className="postcard" onSubmit={send} noValidate>
          <div className="postcard__left">
            <label className="pc-field">
              <span>Your name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Rami Kronbi" autoComplete="name" required />
            </label>
            <label className="pc-field">
              <span>Your email</span>
              <input type="email" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="rami@company.com" autoComplete="email" required />
            </label>
            <label className="pc-field pc-field--grow">
              <span>Message</span>
              <textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Tell me what you are building." rows={5} required />
            </label>
          </div>

          <div className="postcard__divider" aria-hidden="true" />

          <div className="postcard__right">
            <div className="stamp" aria-hidden="true">
              <Shape name="leaf" className="stamp__art" />
              <span className="stamp__value">LB · 2026</span>
            </div>
            <div className="postmark" aria-hidden="true">
              <svg viewBox="0 0 100 100">
                <defs><path id="pm-arc" d="M50 50m-36 0a36 36 0 1 1 72 0a36 36 0 1 1-72 0" /></defs>
                <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <text fontSize="9.5" fontWeight="700" letterSpacing="2"><textPath href="#pm-arc">BEIRUT · LEBANON · BEIRUT · LEBANON ·</textPath></text>
                <text x="50" y="54" textAnchor="middle" fontSize="11" fontWeight="800">{new Date().getFullYear()}</text>
              </svg>
              <span className="postmark__waves" />
            </div>

            <address className="postcard__address">
              <span className="postcard__to">To</span>
              <strong>{site.name}</strong>
              <span>{site.role}</span>
              <span>{site.location}</span>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </address>

            <button type="submit" className="btn btn--green postcard__send">Send the postcard</button>
          </div>

          {pigeon && (
            <div className="pigeon" role="alert">
              <div className="pigeon__bubble">{pigeon}</div>
              <svg className="pigeon__bird" viewBox="0 0 160 120" aria-hidden="true">
                <defs>
                  <linearGradient id="pg-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#B9BFC9" /><stop offset="1" stopColor="#7E8694" /></linearGradient>
                  <linearGradient id="pg-wing" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8D95A3" /><stop offset="1" stopColor="#5C6472" /></linearGradient>
                  <linearGradient id="pg-neck" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5E9C72" /><stop offset="0.5" stopColor="#7A6FA8" /><stop offset="1" stopColor="#3F7A5A" /></linearGradient>
                </defs>
                {/* tail */}
                <path d="M30 76c-12 2-22 10-28 20 12-2 24-2 34-6z" fill="#5C6472" />
                <path d="M32 72c-10 0-20 4-28 10 10 1 20 0 30-4z" fill="#8D95A3" />
                {/* body */}
                <path d="M36 70c4-26 30-40 60-36 24 3 38 20 36 40-2 18-20 28-46 28-24 0-52-10-50-32z" fill="url(#pg-body)" />
                {/* wing */}
                <path d="M46 62c10-18 36-26 62-18-10 6-18 14-24 26-10 8-26 10-40 4 0-4 0-8 2-12z" fill="url(#pg-wing)" />
                <path d="M58 54c12-10 30-14 44-10M54 62c12-8 28-12 42-10M56 70c10-6 22-8 34-8" fill="none" stroke="#4A5260" strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
                {/* neck sheen */}
                <path d="M100 56c6-10 14-16 22-16 2 8 0 16-4 22-6 2-12 0-18-6z" fill="url(#pg-neck)" opacity="0.95" />
                {/* head */}
                <circle cx="126" cy="38" r="15" fill="#A9B0BB" />
                <path d="M114 30c6-8 18-9 25-3-8-1-16 2-21 8z" fill="#8D95A3" />
                {/* beak with cere */}
                <path d="M139 36l16 4-16 5z" fill="#2B2B2B" />
                <path d="M138 34c3-2 6-2 8 0-2 2-5 2-8 0z" fill="#F2F2F2" />
                {/* eye */}
                <circle cx="129" cy="34" r="3.8" fill="#F08A24" />
                <circle cx="129" cy="34" r="2.1" fill="#111" />
                <circle cx="128" cy="33" r="0.8" fill="#fff" />
                {/* legs and feet */}
                <path d="M74 100l-4 14M92 100l2 14" stroke="#D8572A" strokeWidth="3.2" strokeLinecap="round" />
                <path d="M62 114h18M86 114h18M70 114l-4 4M70 114l4 4M94 114l-4 4M94 114l4 4" stroke="#D8572A" strokeWidth="2.6" strokeLinecap="round" />
                {/* belly shading */}
                <path d="M50 92c20 10 50 10 70-2-14 14-50 16-70 2z" fill="#6B7380" opacity="0.5" />
              </svg>
            </div>
          )}
        </form>

        <p className="contact__alt">
          Or find me on <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a> and <a href="https://github.com/TayseerLaz" target="_blank" rel="noreferrer">GitHub</a>.
        </p>
      </div>
    </section>
  )
}
