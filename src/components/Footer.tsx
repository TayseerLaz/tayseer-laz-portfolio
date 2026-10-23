import { site } from '../content'
import './Footer.css'
import { img, SIZES, footerAlt } from '../img'

/** The footer is the pasture photograph; its white sky runs on from the white section above. */
export default function Footer() {
  return (
    <footer className="ftr" id="footer">
      <img className="ftr__img" {...img('/images/footers/field.webp', SIZES.footer)} alt={footerAlt['/images/footers/field.webp']} loading="lazy" />
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
