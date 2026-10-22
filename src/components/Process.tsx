import { useRef } from 'react'
import { site } from '../content'
import './Process.css'

const INK = '#0E220E', GREEN = '#0F7A43', MID = '#1E9A58', YEL = '#F6C945', CREAM = '#F1E9D6', GREY = '#B9C4B5', MINT = '#A8DBC1'

/** One drawn thumbnail per capability card, in the site's greens. */
function Art({ name }: { name: string }) {
  const frame = <><rect x="0" y="0" width="320" height="200" rx="10" fill="#fff" /><rect x="0" y="0" width="320" height="22" rx="10" fill="#EEF0EA" /><circle cx="14" cy="11" r="3" fill="#D0D4CC" /><circle cx="26" cy="11" r="3" fill="#D0D4CC" /><circle cx="38" cy="11" r="3" fill="#D0D4CC" /></>
  const check = (x: number, y: number) => <path d={`M${x - 4} ${y}l3 3 6-6`} fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  const views: Record<string, React.ReactNode> = {
    // phone of apps, then build → sign → ship
    stores: <>
      <rect x="28" y="36" width="84" height="150" rx="14" fill={INK} /><rect x="36" y="48" width="68" height="126" rx="8" fill={CREAM} />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((k) => <rect key={k} x={42 + (k % 3) * 20} y={56 + Math.floor(k / 3) * 22} width="16" height="16" rx="4" fill={[GREEN, YEL, MID, MINT, GREEN, INK, YEL, MID, GREEN][k]} />)}
      <rect x="44" y="132" width="52" height="10" rx="5" fill={GREY} /><rect x="44" y="148" width="36" height="10" rx="5" fill={GREY} />
      <path d="M128 110h150" stroke={GREY} strokeWidth="3" strokeDasharray="6 6" />
      {[0, 1, 2].map((k) => <g key={k}><circle cx={150 + k * 58} cy="110" r="17" fill={k === 2 ? YEL : GREEN} />{k < 2 ? check(150 + k * 58, 110) : <path d="M266 118v-15m-6 6 6-6 6 6" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}</g>)}
      {['Build', 'Sign', 'Ship'].map((t, k) => <rect key={t} x={134 + k * 58} y="138" width="32" height="7" rx="3.5" fill={INK} opacity={0.75} />)}
      <rect x="146" y="46" width="132" height="34" rx="17" fill={CREAM} /><circle cx="164" cy="63" r="9" fill={INK} /><rect x="180" y="58" width="80" height="9" rx="4.5" fill={INK} />
    </>,
    // messy samples → funnel → clean rows
    datasets: <>
      {[[34, 52, GREEN], [62, 70, YEL], [44, 96, MID], [80, 48, GREY], [30, 132, MINT], [70, 118, GREEN], [96, 92, YEL], [56, 150, GREY], [92, 140, MID], [40, 74, GREY], [84, 168, GREEN]].map(([x, y, c], k) => <rect key={k} x={x as number} y={y as number} width="16" height="16" rx="4" fill={c as string} transform={`rotate(${(k * 23) % 40 - 20} ${(x as number) + 8} ${(y as number) + 8})`} />)}
      <path d="M128 56h56l-18 46v42l-20 12v-54z" fill={CREAM} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M150 162v16" stroke={GREEN} strokeWidth="4" strokeLinecap="round" />
      <rect x="200" y="48" width="98" height="132" rx="8" fill={CREAM} />
      {[0, 1, 2, 3, 4].map((r) => <g key={r}><circle cx="214" cy={68 + r * 24} r="6" fill={GREEN} /><rect x="226" y={64 + r * 24} width={56 - (r % 2) * 14} height="8" rx="4" fill={INK} /></g>)}
    </>,
    // GPU box → vLLM endpoint
    llm: <>
      <rect x="22" y="44" width="96" height="132" rx="8" fill={INK} />
      {[0, 1, 2, 3, 4].map((r) => <rect key={r} x="34" y={58 + r * 22} width="72" height="12" rx="3" fill={r === 2 ? YEL : MID} />)}
      <path d="M124 110h40" stroke={GREEN} strokeWidth="4" strokeLinecap="round" strokeDasharray="6 6" />
      <rect x="170" y="62" width="128" height="96" rx="10" fill={CREAM} />
      <circle cx="198" cy="92" r="14" fill={GREEN} /><path d="M192 92h12M198 86v12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="220" y="84" width="62" height="8" rx="4" fill={INK} /><rect x="220" y="98" width="44" height="6" rx="3" fill={GREY} />
      <rect x="184" y="122" width="100" height="22" rx="11" fill={GREEN} /><rect x="198" y="130" width="72" height="6" rx="3" fill={CREAM} />
    </>,
    // a chat thread with a bot
    whatsapp: <>
      <rect x="24" y="34" width="272" height="150" rx="10" fill={CREAM} />
      <rect x="40" y="48" width="140" height="26" rx="13" fill="#fff" /><rect x="52" y="57" width="100" height="8" rx="4" fill={GREY} />
      <rect x="132" y="84" width="148" height="34" rx="14" fill={GREEN} /><rect x="146" y="94" width="108" height="6" rx="3" fill={MINT} /><rect x="146" y="105" width="76" height="6" rx="3" fill={MINT} />
      <path d="M254 112l3 3 6-6M260 112l3 3 6-6" fill="none" stroke={YEL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="40" y="128" width="112" height="26" rx="13" fill="#fff" /><rect x="52" y="137" width="72" height="8" rx="4" fill={GREY} />
      <rect x="40" y="162" width="200" height="14" rx="7" fill="#fff" /><circle cx="270" cy="169" r="11" fill={GREEN} /><path d="M266 169h8m-3-3 3 3-3 3" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

    </>,
    // phone with a push, a crash flag and a chart
    firebase: <>
      <rect x="30" y="34" width="92" height="152" rx="14" fill={INK} /><rect x="38" y="46" width="76" height="128" rx="8" fill={CREAM} />
      <rect x="44" y="54" width="64" height="30" rx="8" fill="#fff" /><circle cx="56" cy="69" r="7" fill={YEL} /><rect x="68" y="63" width="34" height="5" rx="2.5" fill={INK} /><rect x="68" y="72" width="24" height="4" rx="2" fill={GREY} />
      {[0, 1, 2].map((r) => <rect key={r} x="46" y={96 + r * 22} width={60 - r * 10} height="10" rx="5" fill={GREY} />)}
      <path d="M150 168l28-34 24 16 28-46 30 20 24-40" fill="none" stroke={GREEN} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="146" y1="176" x2="298" y2="176" stroke={INK} strokeWidth="2" />
      <path d="M176 44l20 34h-40z" fill={YEL} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" /><path d="M176 56v10" stroke={INK} strokeWidth="2.5" strokeLinecap="round" /><circle cx="176" cy="71" r="1.8" fill={INK} />
      <circle cx="262" cy="60" r="16" fill={MID} /><path d="M262 52v6l5 3" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
    </>,
    // search results, one starred, and an AI answer
    seo: <>
      <rect x="24" y="36" width="168" height="22" rx="11" fill={CREAM} /><circle cx="40" cy="47" r="6" fill="none" stroke={INK} strokeWidth="2.5" /><path d="M44.5 51.5l4 4" stroke={INK} strokeWidth="2.5" strokeLinecap="round" /><rect x="56" y="43" width="100" height="8" rx="4" fill={GREY} />
      <rect x="24" y="70" width="168" height="38" rx="8" fill={MINT} /><rect x="36" y="80" width="96" height="8" rx="4" fill={INK} /><rect x="36" y="94" width="130" height="6" rx="3" fill={GREEN} />
      <path d="M176 82l2.6 5.2 5.8.8-4.2 4 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.2-4 5.8-.8z" fill={YEL} stroke={INK} strokeWidth="1.2" />
      {[0, 1].map((r) => <g key={r}><rect x="36" y={122 + r * 30} width="88" height="7" rx="3.5" fill={INK} opacity={0.7} /><rect x="36" y={134 + r * 30} width="140" height="5" rx="2.5" fill={GREY} /></g>)}
      <rect x="206" y="58" width="92" height="98" rx="14" fill={GREEN} /><path d="M222 156l-6 16 18-16" fill={GREEN} />
      <path d="M252 72l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill={YEL} />
      {[0, 1, 2].map((r) => <rect key={r} x="220" y={102 + r * 14} width={64 - r * 12} height="7" rx="3.5" fill={CREAM} />)}
    </>,
    // a face in a scan frame and a result card
    skin: <>
      <path d="M40 48v-12h14M146 36h14v12M160 152v12h-14M54 164H40v-12" fill="none" stroke={GREEN} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="100" cy="100" rx="40" ry="50" fill={CREAM} stroke={INK} strokeWidth="2.5" />
      <path d="M84 92h8M108 92h8M92 124q8 6 16 0" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      {[[76, 108], [124, 108], [100, 70], [86, 116], [116, 114]].map(([x, y], k) => <circle key={k} cx={x} cy={y} r="3.5" fill={k % 2 ? YEL : GREEN} />)}
      <line x1="44" y1="100" x2="156" y2="100" stroke={MID} strokeWidth="2" strokeDasharray="4 4" opacity={0.7} />
      <rect x="184" y="40" width="114" height="136" rx="10" fill={CREAM} />
      <rect x="198" y="54" width="60" height="8" rx="4" fill={INK} />
      {[0.8, 0.55, 0.35].map((v, k) => <g key={k}><rect x="198" y={74 + k * 22} width="86" height="8" rx="4" fill="#fff" /><rect x="198" y={74 + k * 22} width={86 * v} height="8" rx="4" fill={k === 0 ? GREEN : k === 1 ? MID : YEL} /></g>)}
      <rect x="198" y="144" width="86" height="20" rx="10" fill={GREEN} /><rect x="212" y="151" width="58" height="6" rx="3" fill={CREAM} />
    </>,
    // turnout bars and a delegate checklist
    vote: <>
      {[62, 88, 44, 96, 72, 58].map((h, k) => <rect key={k} x={26 + k * 30} y={176 - h} width="20" height={h} rx="4" fill={k === 3 ? YEL : MID} />)}
      <line x1="20" y1="178" x2="200" y2="178" stroke={INK} strokeWidth="2" />
      <rect x="24" y="38" width="80" height="10" rx="5" fill={INK} />
      <rect x="214" y="36" width="88" height="140" rx="8" fill={CREAM} />
      {[0, 1, 2, 3].map((r) => <g key={r}><circle cx="230" cy={60 + r * 30} r="7" fill={r < 3 ? GREEN : GREY} />{r < 3 && check(230, 60 + r * 30)}<rect x="244" y={56 + r * 30} width="46" height="8" rx="4" fill={INK} /></g>)}
    </>,
  }
  return <svg viewBox="0 0 320 200" className="feat__screen" aria-hidden="true">{frame}{views[name] ?? views.vote}</svg>
}

const TONES = ['#0B2F26', '#1E9A58', '#C9E265', '#A8DBC1', '#F6C945']

type Step = { title: string; body: string; art?: string }
const STEPS = site.process.steps as Step[]

export default function Process() {
  const track = useRef<HTMLUListElement>(null)
  const step = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('.feat')
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 320) + 20), behavior: 'smooth' })
  }

  return (
    <section className="proc" id="process">
      <div className="wrap proc__inner">
        <h2 className="h2 proc__title">
          {site.process.title.split('\n').map((l) => <span key={l}>{l}</span>)}
        </h2>
      </div>

      <div className="carousel">
        <ul className="carousel__track" ref={track} aria-label="What I do, card by card">
          {STEPS.map((s, i) => {
            return (
              <li key={s.title} className="feat">
                <div className="feat__frame" style={{ background: TONES[(i + 1) % TONES.length] }}>
                  <Art name={s.art ?? 'vote'} />
                </div>
                <h3 className="feat__title">{s.title}</h3>
                <p className="feat__body">{s.body}</p>
              </li>
            )
          })}
        </ul>
        <div className="carousel__nav">
          <button onClick={() => step(-1)} aria-label="Previous step"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
          <button onClick={() => step(1)} aria-label="Next step"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
        </div>
      </div>
    </section>
  )
}
