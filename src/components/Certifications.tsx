import { site } from '../content'
import './Certifications.css'

export default function Certifications() {
  const c = site.certifications
  return (
    <section className="certs" id="certifications" aria-labelledby="certs-title">
      <div className="wrap">
        <h2 id="certs-title" className="h2 certs__title">{c.title}</h2>
        <ol className="certs__grid">
          {c.items.map((it, i) => (
            <li key={it.name} className={`cert cert--${i % 2 ? 'cream' : 'green'}`}>
              <span className="cert__num">{String(i + 1).padStart(2, '0')}</span>
              <p className="cert__issuer">{it.issuer}</p>
              <h3 className="cert__name">{it.name}</h3>
              {Array.isArray(it.detail)
                ? <ul className="cert__list">{it.detail.map((d) => <li key={d}>{d}</li>)}</ul>
                : <p className="cert__detail">{it.detail}</p>}
              {it.link && <a className="cert__link" href={it.link} target="_blank" rel="noreferrer">View credential ↗</a>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
