import { useEffect, useRef, useState } from 'react'
import CaseStudy from './CaseStudy'
import { site } from '../content'
import './Process.css'

/** Small illustrated mock screens, one per step, drawn in SVG. */
function Screen({ kind }: { kind: number }) {
  const frame = <><rect x="0" y="0" width="320" height="200" rx="10" fill="#fff" /><rect x="0" y="0" width="320" height="22" rx="10" fill="#EEF0EA" /><circle cx="14" cy="11" r="3" fill="#D0D4CC" /><circle cx="24" cy="11" r="3" fill="#D0D4CC" /><circle cx="34" cy="11" r="3" fill="#D0D4CC" /></>
  const views = [
    // 01 map the route
    <>{frame}<path d="M30 160C80 100 120 170 170 110s80 10 120-50" fill="none" stroke="#0F7A43" strokeWidth="6" strokeLinecap="round" strokeDasharray="14 10" /><circle cx="30" cy="160" r="9" fill="#0E220E" /><circle cx="290" cy="60" r="9" fill="#F6C945" stroke="#0E220E" strokeWidth="3" /><rect x="200" y="130" width="90" height="40" rx="6" fill="#F1E9D6" /><rect x="210" y="140" width="50" height="6" rx="3" fill="#0E220E" /><rect x="210" y="152" width="70" height="6" rx="3" fill="#B9C4B5" /></>,
    // 02 first mile
    <>{frame}<rect x="20" y="40" width="80" height="140" rx="6" fill="#F1E9D6" /><rect x="30" y="52" width="60" height="8" rx="4" fill="#0E220E" /><rect x="30" y="68" width="44" height="6" rx="3" fill="#B9C4B5" /><rect x="30" y="80" width="52" height="6" rx="3" fill="#B9C4B5" /><rect x="116" y="40" width="184" height="100" rx="6" fill="#0F7A43" /><rect x="132" y="58" width="90" height="10" rx="5" fill="#F1E9D6" /><rect x="132" y="78" width="140" height="6" rx="3" fill="#A8DBC1" /><rect x="132" y="92" width="110" height="6" rx="3" fill="#A8DBC1" /><rect x="132" y="112" width="56" height="16" rx="8" fill="#F6C945" /><rect x="116" y="152" width="184" height="28" rx="6" fill="#F1E9D6" /><rect x="128" y="162" width="120" height="8" rx="4" fill="#0F7A43" /></>,
    // 03 keep the pace
    <>{frame}{[0,1,2,3,4,5,6].map((i) => <rect key={i} x={28 + i * 40} y={170 - [60, 90, 70, 120, 100, 130, 110][i]} width="26" height={[60, 90, 70, 120, 100, 130, 110][i]} rx="5" fill={i === 5 ? '#F6C945' : '#0F7A43'} />)}<line x1="20" y1="172" x2="300" y2="172" stroke="#0E220E" strokeWidth="2" /><rect x="200" y="36" width="96" height="24" rx="12" fill="#F1E9D6" /><circle cx="214" cy="48" r="5" fill="#0F7A43" /><rect x="226" y="44" width="56" height="8" rx="4" fill="#0E220E" /></>,
    // 04 hand over the keys
    <>{frame}<rect x="24" y="40" width="170" height="140" rx="6" fill="#F1E9D6" /><rect x="40" y="56" width="110" height="10" rx="5" fill="#0E220E" />{[0,1,2,3].map((i) => <g key={i}><circle cx="48" cy={88 + i * 24} r="7" fill="#0F7A43" /><path d={`M44 ${88 + i * 24}l3 3 6-6`} fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><rect x="64" y={84 + i * 24} width={100 - i * 14} height="8" rx="4" fill="#B9C4B5" /></g>)}<path d="M236 80a22 22 0 1 1 0 44 22 22 0 0 1 0-44zm-6 22h32m-8-10v10m-10 0v8" fill="none" stroke="#F6C945" strokeWidth="8" strokeLinecap="round" /><circle cx="236" cy="102" r="7" fill="#fff" /></>,
  ]
  return <svg viewBox="0 0 320 200" className="feat__screen" aria-hidden="true">{views[kind % views.length]}</svg>
}

const TONES = ['#0B2F26', '#1E9A58', '#C9E265', '#A8DBC1', '#F6C945']

type Frame = { icons?: string[]; cover?: string; shots?: string[]; svg?: string }
type Step = { title: string; body: string; caseStudy?: string; study?: string; frame?: Frame }
const STEPS = site.process.steps as Step[]

/** Small drawn diagrams for the capability cards that have no screenshot. */
function CapSvg({ name }: { name: string }) {
  const frame = <><rect x="0" y="0" width="320" height="200" rx="10" fill="#fff" /><rect x="0" y="0" width="320" height="22" rx="10" fill="#EEF0EA" /><circle cx="14" cy="11" r="3" fill="#D0D4CC" /><circle cx="26" cy="11" r="3" fill="#D0D4CC" /><circle cx="38" cy="11" r="3" fill="#D0D4CC" /></>
  if (name === 'llm') return (
    <svg viewBox="0 0 320 200" className="feat__screen" aria-hidden="true">{frame}
      <rect x="22" y="44" width="96" height="132" rx="8" fill="#0E220E" />
      {[0, 1, 2, 3, 4].map((r) => <rect key={r} x="34" y={58 + r * 22} width="72" height="12" rx="3" fill={r === 2 ? '#F6C945' : '#1E9A58'} />)}
      <text x="70" y="172" textAnchor="middle" fontSize="9" fontWeight="700" fill="#F1E9D6">GPU</text>
      <path d="M124 110h40" stroke="#0F7A43" strokeWidth="4" strokeLinecap="round" strokeDasharray="6 6" />
      <rect x="170" y="70" width="128" height="80" rx="10" fill="#F1E9D6" />
      <text x="234" y="100" textAnchor="middle" fontSize="13" fontWeight="800" fill="#0E220E">vLLM</text>
      <text x="234" y="118" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0F7A43">Qwen2.5 + LoRA</text>
      <rect x="196" y="128" width="76" height="12" rx="6" fill="#0F7A43" /><text x="234" y="137" textAnchor="middle" fontSize="7" fontWeight="700" fill="#fff">/v1/chat</text>
    </svg>
  )
  return (
    <svg viewBox="0 0 320 200" className="feat__screen" aria-hidden="true">{frame}
      <text x="24" y="46" fontSize="11" fontWeight="800" fill="#0E220E">Turnout, live</text>
      {[62, 88, 44, 96, 72, 58].map((h, k) => <rect key={k} x={26 + k * 30} y={176 - h} width="20" height={h} rx="4" fill={k === 3 ? '#F6C945' : '#1E9A58'} />)}
      <line x1="20" y1="178" x2="200" y2="178" stroke="#0E220E" strokeWidth="2" />
      <rect x="214" y="36" width="88" height="140" rx="8" fill="#F1E9D6" />
      {[0, 1, 2, 3].map((r) => <g key={r}><circle cx="230" cy={60 + r * 30} r="7" fill={r < 3 ? '#0F7A43' : '#B9C4B5'} />{r < 3 && <path d={`M226 ${60 + r * 30}l3 3 6-6`} fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />}<rect x="244" y={56 + r * 30} width="46" height="8" rx="4" fill="#0E220E" /></g>)}
    </svg>
  )
}

function CapFrame({ frame, tone }: { frame?: Frame; tone: string }) {
  if (frame?.icons) return (
    <div className="feat__frame feat__frame--icons" style={{ background: tone }}>
      {frame.icons.map((src) => <img key={src} src={src} alt="" width={96} height={96} loading="lazy" />)}
    </div>
  )
  if (frame?.cover) return (
    <div className="feat__frame feat__frame--cover" style={{ background: tone }}>
      <img src={frame.cover} alt="" loading="lazy" />
    </div>
  )
  if (frame?.shots) return (
    <div className="feat__frame feat__frame--study feat__frame--plain" style={{ background: tone }}>
      {frame.shots.map((src) => <img key={src} src={src} alt="" loading="lazy" />)}
    </div>
  )
  return (
    <div className="feat__frame" style={{ background: tone }}>
      <CapSvg name={frame?.svg ?? 'vote'} />
    </div>
  )
}

export default function Process() {
  let num = 0
  const track = useRef<HTMLUListElement>(null)
  const [study, setStudyState] = useState(() => window.location.hash === '#work/wms-process')
  const setStudy = (v: boolean) => { setStudyState(v); if (v) history.pushState(null, '', '#work/wms-process'); else if (window.location.hash === '#work/wms-process') history.pushState(null, '', '#process') }
  useEffect(() => { const onPop = () => setStudyState(window.location.hash === '#work/wms-process'); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop) }, [])
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
        <ul className="carousel__track" ref={track} aria-label="How I work, step by step">
          {STEPS.map((s, i) => {
            if (s.caseStudy) return (
              <li key={s.title} className="feat feat--link">
                <button type="button" className="feat__btn" onClick={() => setStudy(true)} aria-haspopup="dialog">
                  <div className="feat__frame feat__frame--study" style={{ background: TONES[0] }}>
                    <img src="/wms/03_home.jpg" alt="" width={416} height={900} loading="lazy" />
                    <img src="/wms/11_inventory_list.jpg" alt="" width={416} height={900} loading="lazy" />
                    <img src="/wms/15_put_away.jpg" alt="" width={416} height={900} loading="lazy" />
                  </div>
                  <span className="feat__title">{s.title}</span>
                  <span className="feat__body">{s.body}</span>
                </button>
              </li>
            )
            if (s.study) return (
              <li key={s.title} className="feat feat--link">
                <button type="button" className="feat__btn" onClick={() => { window.location.hash = `#work/${s.study}` }} aria-haspopup="dialog">
                  <CapFrame frame={s.frame} tone={TONES[(i + 1) % 2 === 0 ? 0 : 1]} />
                  <span className="feat__title">{s.title}</span>
                  <span className="feat__body">{s.body}</span>
                </button>
              </li>
            )
            const n = ++num
            return (
              <li key={s.title} className="feat">
                <div className="feat__frame" style={{ background: TONES[n % TONES.length] }}>
                  <Screen kind={n - 1} />
                </div>
                <h3 className="feat__title">{String(n).padStart(2, '0')} {s.title}</h3>
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
      {study && <CaseStudy onClose={() => setStudy(false)} />}
    </section>
  )
}
