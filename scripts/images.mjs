// Prepares public/images for responsive loading and writes src/imageManifest.ts.
// Run after adding or replacing an image: `pnpm images` (macOS: needs `cwebp` from Homebrew and the built-in `sips`).
// The outputs are committed, so CI never needs these tools.
//
//  1. Derived files that make each image's natural shape match the box it is shown in:
//     - square project-icon logos (padded with white, the colour of the icon tile)
//     - a square crop of the portrait for the round hero avatar
//     - top-anchored 16:10 crops of "wide" gallery shots, matching the old CSS crop exactly
//  2. Smaller copies (`name-640w.webp`) for srcset, so each screen downloads only what it shows.
//  3. src/imageManifest.ts: real width/height and the available widths for every image.
import { execFileSync } from 'node:child_process'
import { mkdtemp, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import ts from 'typescript'

const PUBLIC = 'public'
const GENERATED = /-\d+w\.webp$/
const AVATAR = { from: '/images/site/about-photo.webp', to: '/images/site/about-avatar.webp', size: 216, focusY: 0.3 }
const WIDE = 16 / 10

function webpSize(buf) {
  const chunk = buf.toString('ascii', 12, 16)
  if (chunk === 'VP8X') return { w: 1 + buf.readUIntLE(24, 3), h: 1 + buf.readUIntLE(27, 3) }
  if (chunk === 'VP8 ') return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff }
  if (chunk === 'VP8L') { const b = buf.readUInt32LE(21); return { w: (b & 0x3fff) + 1, h: ((b >> 14) & 0x3fff) + 1 } }
  throw new Error(`Not a WebP file (chunk ${chunk})`)
}
const size = async (src) => webpSize(await readFile(PUBLIC + src))
const newer = async (out, src) => { try { return (await stat(PUBLIC + out)).mtimeMs >= (await stat(PUBLIC + src)).mtimeMs } catch { return false } }
const cwebp = (...args) => execFileSync('cwebp', ['-quiet', ...args])
async function walk(dir) {
  const out = []
  for (const e of await readdir(PUBLIC + dir, { withFileTypes: true })) {
    const p = `${dir}/${e.name}`
    if (e.isDirectory()) out.push(...await walk(p))
    else if (p.endsWith('.webp') && !GENERATED.test(p)) out.push(p)
  }
  return out
}

// content.ts has no imports, so a plain transpile is enough to read which images are icons and gallery shots.
const contentJs = ts.transpileModule(await readFile('src/content.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText
const { site } = await import(`data:text/javascript;base64,${Buffer.from(contentJs).toString('base64')}`)
const projects = Object.values(site.projects)

// 1a. Square project icons, padded in place.
const tmp = await mkdtemp(join(tmpdir(), 'images-'))
for (const icon of new Set(projects.map((p) => p.icon).filter(Boolean))) {
  const { w, h } = await size(icon)
  if (w === h) continue
  const side = Math.max(w, h), png = join(tmp, 'icon.png')
  execFileSync('sips', ['-s', 'format', 'png', PUBLIC + icon, '--out', png], { stdio: 'ignore' })
  execFileSync('sips', ['-p', String(side), String(side), '--padColor', 'FFFFFF', png, '--out', png], { stdio: 'ignore' })
  cwebp('-q', '90', png, '-o', PUBLIC + icon)
  console.log(`padded ${icon} ${w}x${h} -> ${side}x${side}`)
}
await rm(tmp, { recursive: true, force: true })

// 1b. Square avatar crop.
if (!await newer(AVATAR.to, AVATAR.from)) {
  const { w, h } = await size(AVATAR.from), side = Math.min(w, h)
  cwebp('-q', '85', '-crop', String(Math.round((w - side) / 2)), String(Math.round((h - side) * AVATAR.focusY)), String(side), String(side),
    '-resize', String(AVATAR.size), String(AVATAR.size), PUBLIC + AVATAR.from, '-o', PUBLIC + AVATAR.to)
  console.log(`cropped ${AVATAR.to}`)
}

// 1c. 16:10 crops for wide gallery shots that are not already 16:10 (top-anchored, like object-position: 50% 0).
const wideShots = projects.flatMap((p) => p.gallery?.kind === 'wide' ? p.gallery.shots.map((s) => s.src) : [])
for (const src of new Set(wideShots)) {
  const { w, h } = await size(src)
  if (Math.abs(w / h / WIDE - 1) <= 0.02) continue
  const out = src.replace(/\.webp$/, '-16x10.webp')
  if (await newer(out, src)) continue
  const cw = w / h > WIDE ? Math.round(h * WIDE) : w, ch = w / h > WIDE ? h : Math.round(w / WIDE)
  cwebp('-q', '85', '-crop', String(Math.round((w - cw) / 2)), '0', String(cw), String(ch), PUBLIC + src, '-o', PUBLIC + out)
  console.log(`cropped ${out}`)
}

// 2 + 3. Width variants and the manifest.
const manifest = {}
for (const src of (await walk('/images')).sort()) {
  const { w, h } = await size(src)
  const small = src === AVATAR.to ? [72, 144] : src.startsWith('/images/logos/') ? [64, 128, 160, 320] : w < 480 ? [160, 320] : [320, 640, 960, 1280]
  const widths = small.filter((n) => n <= w * 0.85)
  for (const n of widths) {
    const out = src.replace(/\.webp$/, `-${n}w.webp`)
    if (!await newer(out, src)) cwebp('-q', '80', '-resize', String(n), '0', PUBLIC + src, '-o', PUBLIC + out)
  }
  manifest[src] = { w, h, widths: [...widths, w] }
}
await writeFile('src/imageManifest.ts', `// Generated by scripts/images.mjs. Do not edit; run \`pnpm images\` after changing public/images.\nexport const images: Record<string, { w: number; h: number; widths: number[] }> = {\n${Object.entries(manifest).map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`).join('\n')}\n}\n`)
console.log(`manifest: ${Object.keys(manifest).length} images, ${Object.values(manifest).reduce((n, m) => n + m.widths.length - 1, 0)} smaller copies`)
