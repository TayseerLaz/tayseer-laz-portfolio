/** Hand-drawn brush textures for the work tiles, drawn in currentColor at low opacity. */
export type Texture = 'dashes' | 'streaks' | 'arcs' | 'loops'

const STROKE = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

export function Scribble({ kind, className }: { kind: Texture; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {kind === 'dashes' && (
        <g {...STROKE} strokeWidth="7">
          {Array.from({ length: 70 }, (_, i) => {
            const x = (i * 53) % 400, y = Math.floor(i / 7) * 42 + (i % 3) * 9
            return <path key={i} d={`M${x} ${y} l14 26`} />
          })}
        </g>
      )}
      {kind === 'streaks' && (
        <g {...STROKE} strokeWidth="14" strokeDasharray="60 18 120 26 40 30">
          {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M${-40 + i * 52} 420 C${20 + i * 52} 260 ${0 + i * 52} 120 ${60 + i * 52} -20`} />)}
        </g>
      )}
      {kind === 'arcs' && (
        <g {...STROKE} strokeWidth="9">
          {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M${40 - i * 22} 420 A${120 + i * 40} ${120 + i * 40} 0 0 1 ${440} ${200 - i * 30}`} />)}
        </g>
      )}
      {kind === 'loops' && (
        <g {...STROKE} strokeWidth="16">
          <path d="M-20 120 C80 20 160 60 180 140 S60 240 120 300 S300 240 300 140 S200 20 260 60 S420 160 400 240" />
          <path d="M-20 320 C60 220 160 260 170 340 S60 440 120 480" strokeDasharray="200 30" />
          <path d="M240 420 C300 340 420 360 420 300" />
        </g>
      )}
    </svg>
  )
}
