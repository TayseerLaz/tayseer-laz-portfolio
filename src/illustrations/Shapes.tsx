import type { SVGProps } from 'react'

/** Matisse-style cut-out shapes. Every path lives in a 100×100 box and is drawn in currentColor. */
export const SHAPES = {
  leaf:   'M18 92C18 44 46 16 90 8c-2 42-24 76-72 84z',
  blob:   'M52 6c24 0 42 18 40 44S74 94 48 94 6 76 8 50 28 6 52 6z',
  arch:   'M12 92V54a38 38 0 0 1 76 0v38H62V56a12 12 0 0 0-24 0v36z',
  drop:   'M50 6c22 30 34 48 34 62a34 34 0 0 1-68 0C16 54 28 36 50 6z',
  moon:   'M12 42a38 38 0 0 0 76 0z',
  pebble: 'M26 20c20-12 50-8 60 10s0 44-18 54-44 8-54-8-8-44 12-56z',
  comma:  'M62 10a26 26 0 1 1-28 26c-2 22-12 38-28 50 24-4 42-20 48-46z',
  sprout: 'M50 94V50M50 56C38 34 24 28 8 32c8 20 24 30 42 24zM50 56c12-22 26-28 42-24-8 20-24 30-42 24z',
  seed:   'M50 10c16 0 28 14 28 32v16c0 18-12 32-28 32S22 76 22 58V42c0-18 12-32 28-32z',
  bolt:   'M58 6 20 56h26l-8 38 42-52H54z',
  tri:    'M50 10 92 86H8z',
  bean:   'M30 14c20-8 42 2 50 20s-2 36-22 46-40 8-48-8 0-50 20-58z',
  fan:    'M50 92C20 92 8 70 8 48c14 10 22 22 42 24 20-2 28-14 42-24 0 22-12 44-42 44z',
  dots:   'M30 30a12 12 0 1 1 0 .1zM70 30a12 12 0 1 1 0 .1zM30 70a12 12 0 1 1 0 .1zM70 70a12 12 0 1 1 0 .1z',
  star:   'M50 6l10 30 32 2-26 19 10 31-26-19-26 19 10-31L8 38l32-2z',
  wave:   'M4 60c14-24 26-24 40 0s26 24 40 0 12-10 12-10v30H4z',
  ring:   'M50 8a42 42 0 1 1 0 84 42 42 0 0 1 0-84zm0 22a20 20 0 1 0 0 40 20 20 0 0 0 0-40z',
  sun:    'M50 24a26 26 0 1 1 0 52 26 26 0 0 1 0-52zM50 4v12M50 84v12M4 50h12M84 50h12M17 17l9 9M74 74l9 9M17 83l9-9M74 26l9-9',
} as const

export type ShapeName = keyof typeof SHAPES

type Props = SVGProps<SVGSVGElement> & { name: ShapeName }

export function Shape({ name, ...rest }: Props) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" {...rest}>
      <path d={SHAPES[name]} fill="currentColor" />
    </svg>
  )
}

/** Hand-drawn flower line art for the footer, in currentColor strokes. */
export function Flowers(props: SVGProps<SVGSVGElement>) {
  const petal = (cx: number, cy: number, r: number, n: number, rot = 0) =>
    Array.from({ length: n }, (_, i) => {
      const a = ((i / n) * Math.PI * 2) + rot
      const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r
      const px = cx + Math.cos(a + 0.9) * r * 0.9, py = cy + Math.sin(a + 0.9) * r * 0.9
      const qx = cx + Math.cos(a - 0.9) * r * 0.9, qy = cy + Math.sin(a - 0.9) * r * 0.9
      return `M${cx} ${cy} C${qx} ${qy} ${x} ${y} ${x} ${y} C${x} ${y} ${px} ${py} ${cx} ${cy}`
    }).join(' ')
  return (
    <svg viewBox="0 0 1200 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true" {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
        <path d={petal(220, 200, 130, 5)} />
        <circle cx="220" cy="200" r="14" />
        <path d={petal(620, 150, 110, 6, 0.4)} />
        <circle cx="620" cy="150" r="12" />
        <path d={petal(1010, 230, 150, 5, 0.9)} />
        <circle cx="1010" cy="230" r="16" />
        <path d="M60 420c20-80 60-150 110-170M110 420c30-60 70-100 130-120" />
        <path d="M430 420c10-70 50-130 110-160M520 420c20-50 60-80 110-90" />
        <path d="M820 420c0-70 40-120 90-150M900 420c20-40 60-70 120-80" />
        <path d="M300 380c40-30 90-40 150-30M700 380c40-20 100-20 150 0" />
      </g>
    </svg>
  )
}
