import { site } from '../content'
import './Hero.css'
import { img } from '../img'
import Cover from './Cover'

/** Hero after the review poster: giant cream letters, rotated hashtag strips, a cream card. */
export default function Hero() {
  return (
    <section className="hero" id="top">
      <Cover className="hero__bg" src="/images/site/hero-bg.webp" alt="Abstract green camouflage pattern" width={1672} height={941} fetchPriority="high" />
      <div className="hero__letters" aria-hidden="true">
        <span className="hero__row hero__row--1">“tay</span>
        <span className="hero__row hero__row--2">seer”</span>
      </div>

      <div className="hero__card">
        <img className="hero__avatar" {...img('/images/site/about-avatar.webp', '(max-width: 52rem) 56px, 72px')} alt="Tayseer Laz" />
        <div className="hero__cardbody">
          {/* Name and role form the H1; CSS keeps the stars visually between them. */}
          <h1 className="hero__heading">
            <span className="hero__name">{site.name}</span>{' '}
            <span className="hero__role">{site.role} in {site.location}.</span>
          </h1>
          <p className="hero__stars" aria-label="Five stars">★★★★★</p>
          <p className="hero__text">
            I take an idea from the first sketch to the thing people use every day,
            and keep building until it holds. Builds products that last.
          </p>
        </div>
      </div>
    </section>
  )
}
