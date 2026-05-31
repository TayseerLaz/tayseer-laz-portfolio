/**
 * Post-build script: generates a sitemap.xml + image sitemap entries
 * Reads from src/data/projects.js so the sitemap is always in sync.
 */

import { writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const DIST = join(ROOT, 'dist')
const PUBLIC = join(ROOT, 'public')
const SITE_URL = 'https://tayseerlaz.com'

const projectsModule = await import(pathToFileURL(join(ROOT, 'src/data/projects.js')).href)
const projects = projectsModule.default

const today = new Date().toISOString().slice(0, 10)

function urlEntry({ loc, lastmod = today, changefreq = 'monthly', priority = 0.7, images = [] }) {
  const imageXml = images
    .map(
      (img) =>
        `    <image:image>\n      <image:loc>${img.loc}</image:loc>\n      <image:title>${img.title}</image:title>\n    </image:image>`
    )
    .join('\n')

  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${imageXml}
  </url>`
}

const entries = []

// Homepage
entries.push(
  urlEntry({
    loc: `${SITE_URL}/`,
    changefreq: 'weekly',
    priority: 1.0,
    images: [
      { loc: `${SITE_URL}/og-image.png`, title: 'Tayseer Laz — Product Developer Portfolio' },
      { loc: `${SITE_URL}/IMG_1283.jpg`, title: 'Tayseer Laz' },
    ],
  })
)

// Project pages
for (const p of projects) {
  const images = []
  if (p.image) {
    images.push({
      loc: `${SITE_URL}${p.image}`,
      title: `${p.title} — case study screenshot`,
    })
  }
  images.push({ loc: `${SITE_URL}/og-image.png`, title: p.title })

  entries.push(
    urlEntry({
      loc: `${SITE_URL}/work/${p.slug}`,
      changefreq: 'monthly',
      priority: p.slug === 'omnisign' ? 0.9 : 0.8,
      images,
    })
  )
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join('\n')}
</urlset>
`

// Write to both dist (for production) and public (so dev/preview work too)
writeFileSync(join(DIST, 'sitemap.xml'), xml, 'utf-8')
writeFileSync(join(PUBLIC, 'sitemap.xml'), xml, 'utf-8')

console.log(`[seo] ✓ sitemap.xml (${entries.length} URLs)`)
