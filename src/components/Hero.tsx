import { site } from '../content'
import './Hero.css'

/** Hero after the review poster: giant cream letters, rotated hashtag strips, a cream card. */
export default function Hero() {
  return (
    <section className="hero" id="top">
      <img className="hero__bg" src="/hero-bg.jpg" alt="" width={1672} height={941} fetchPriority="high" />
      <div className="hero__letters" aria-hidden="true">
        <span className="hero__row hero__row--1">“tay</span>
        <span className="hero__row hero__row--2">seer”</span>
      </div>

      <div className="hero__card">
        <img className="hero__avatar" src="/about-photo.jpg" alt="" width={56} height={56} />
        <div className="hero__cardbody">
          <h1 className="hero__name">{site.name}</h1>
          <p className="hero__stars" aria-label="Five stars">★★★★★</p>
          <p className="hero__role">{site.role} in {site.location}.</p>
          <p className="hero__text">
            I take an idea from the first sketch to the thing people use every day,
            and keep building until it holds. Builds products that last.
          </p>
        </div>
      </div>
    </section>
  )
}
