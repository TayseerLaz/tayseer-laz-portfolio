import { site } from '../content'
import './Footer.css'

/** The footer is the pasture photograph; its white sky runs on from the white section above. */
export default function Footer() {
  return (
    <footer className="ftr" id="footer">
      <img className="ftr__img" src="/footer-field.jpg" alt="Cows grazing on a green hill under a bright sky" width={1920} height={1071} loading="lazy" />
      <div className="ftr__line">
        <a className="ftr__mail" href={`mailto:${site.email}`}>{site.email}</a>
        <nav aria-label="Footer">
          <a href="https://www.linkedin.com/in/tayseer-laz" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/TayseerLaz" target="_blank" rel="noreferrer">GitHub</a>
        </nav>
        <span>© {new Date().getFullYear()} {site.name}</span>
      </div>
    </footer>
  )
}
