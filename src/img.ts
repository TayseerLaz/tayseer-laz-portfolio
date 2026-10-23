import { images } from './imageManifest'

/** How wide each kind of image is drawn; the browser picks the smallest copy that covers it. */
export const SIZES = {
  // Full-bleed bands cropped with object-fit: cover; on phones the band is taller, so the image is drawn wider than the screen.
  footer: '(max-width: 52rem) 190vw, 100vw',
  logo: '(max-width: 52rem) 120px, 160px',
  shot: '(max-width: 52rem) 92vw, 760px',
  hero: '(max-width: 52rem) 92vw, 1100px',
  half: '(max-width: 52rem) 92vw, 640px',
  wide: '(max-width: 52rem) 92vw, 1240px',
  phone: '(max-width: 52rem) 46vw, 300px',
}

/** Alt text for the painted footer bands shared across case studies. */
export const footerAlt: Record<string, string> = {
  '/images/footers/bsheel.webp': 'Grassy cliff path above a calm blue sea',
  '/images/footers/field.webp': 'Cows grazing on a green hill under a bright sky',
  '/images/footers/ievents.webp': 'Green hillside with a small hut below white clouds',
  '/images/footers/lancaster.webp': 'Open green field under a pale sky',
  '/images/footers/omnisign.webp': 'Painted hills and trees under a bright sky',
  '/images/footers/sla.webp': 'Dune grass above a calm sea at dusk',
  '/images/footers/wms.webp': 'Pixel-art hills and clouds under a pale sky',
}

/**
 * Props for an <img>: the real width/height (no layout shift, correct aspect ratio) and a srcset of the
 * smaller copies made by scripts/images.mjs, so each screen downloads only the pixels it shows.
 * `sizes` describes how wide the image is drawn; `crop: '16x10'` uses the pre-cut 16:10 version when one exists.
 * Unknown images fall back to a plain src.
 */
export function img(src: string, sizes: string, { crop }: { crop?: '16x10' } = {}) {
  const cropped = crop && src.replace(/\.webp$/, `-${crop}.webp`)
  const file = cropped && images[cropped] ? cropped : src
  const m = images[file]
  if (!m) return { src }
  const srcSet = m.widths.length > 1
    ? m.widths.map((w) => `${w === m.w ? file : file.replace(/\.webp$/, `-${w}w.webp`)} ${w}w`).join(', ')
    : undefined
  return { src: file, srcSet, sizes: srcSet && sizes, width: m.w, height: m.h }
}
