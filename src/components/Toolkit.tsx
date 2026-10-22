import { Shape, type ShapeName } from '../illustrations/Shapes'
import { site } from '../content'
import './Toolkit.css'

/** Green tiles with cream cut-outs, one per category, listing the tools inside. */
export default function Toolkit() {
  return (
    <section className="kit" aria-labelledby="kit-title">
      <div className="wrap">
        <h2 id="kit-title" className="h2 kit__title">What I work with.</h2>
        <ul className="kit__grid">
          {site.toolkit.map((g) => (
            <li key={g.name} className="tile">
              <Shape name={g.shape as ShapeName} className="tile__shape" />
              <h3 className="tile__name">{g.name}</h3>
              <ul className="tile__items">
                {g.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
