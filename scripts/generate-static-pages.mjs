/**
 * Post-build script: generates static HTML for each project route.
 *
 * Each generated page includes:
 *   - Unique <title> and <meta description>
 *   - Visible H1 + body content (so Googlebot sees real content immediately)
 *   - JSON-LD CreativeWork + BreadcrumbList schema
 *   - The same React bundle so the SPA hydrates normally on top
 *
 * Run automatically after `vite build` via the npm "build" script.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const DIST = join(ROOT, 'dist')
const SITE_URL = 'https://tayseerlaz.com'

if (!existsSync(DIST)) {
  console.error('[seo] dist/ not found — run vite build first')
  process.exit(1)
}

// Load projects data (use dynamic import — projects.js is ESM)
const projectsModule = await import(pathToFileURL(join(ROOT, 'src/data/projects.js')).href)
const projects = projectsModule.default

const baseHtml = readFileSync(join(DIST, 'index.html'), 'utf-8')

function escapeHtml(s = '') {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function buildBreadcrumb(project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Work', item: SITE_URL + '/#work' },
      { '@type': 'ListItem', position: 3, name: project.title, item: `${SITE_URL}/work/${project.slug}` },
    ],
  }
}

function buildCreativeWork(project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    headline: project.title,
    description: project.metaDescription || project.overview || project.desc,
    url: `${SITE_URL}/work/${project.slug}`,
    image: project.image ? `${SITE_URL}${project.image}` : `${SITE_URL}/og-image.png`,
    creator: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Tayseer Laz',
      url: SITE_URL + '/',
    },
    author: { '@id': `${SITE_URL}/#person` },
    dateCreated: project.year || '',
    keywords: (project.tags || []).join(', '),
    inLanguage: 'en',
  }
}

function generateProjectHtml(project) {
  const title = `${project.title} — Case Study by Tayseer Laz`
  const description = project.metaDescription || project.overview || project.desc
  const url = `${SITE_URL}/work/${project.slug}`
  const image = project.image ? `${SITE_URL}${project.image}` : `${SITE_URL}/og-image.png`

  const creativeWorkLd = JSON.stringify(buildCreativeWork(project))
  const breadcrumbLd = JSON.stringify(buildBreadcrumb(project))

  // Visible static body (replaced by React on hydration)
  const body = `
    <div id="root">
      <header style="padding:2rem 1.5rem;text-align:center;font-family:system-ui,-apple-system,sans-serif;color:#fbf5ea;background:#0e0b0b;min-height:100vh;">
        <p style="font-size:0.85rem;letter-spacing:0.15em;text-transform:uppercase;color:#b85456;margin:0;">${escapeHtml(project.role || 'Case Study')}</p>
        <h1 style="font-size:2.5rem;margin:1rem auto;font-weight:800;max-width:800px;">${escapeHtml(project.title)}</h1>
        <p style="font-size:1.1rem;color:rgba(251,245,234,0.7);margin:0.5rem 0;">by <a href="/" style="color:#fbf5ea;">Tayseer Laz</a> — Product Developer, Beirut, Lebanon</p>
        <p style="max-width:720px;margin:1.5rem auto;line-height:1.6;color:rgba(251,245,234,0.8);">${escapeHtml(project.overview || project.desc)}</p>
        ${(project.highlights && project.highlights.length) ? `
        <section style="max-width:720px;margin:2rem auto;text-align:left;">
          <h2 style="font-size:1.4rem;margin-bottom:1rem;">Highlights</h2>
          <ul style="line-height:1.9;color:rgba(251,245,234,0.7);">
            ${project.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('')}
          </ul>
        </section>` : ''}
        ${(project.techStack && project.techStack.length) ? `
        <p style="margin:1rem 0;color:rgba(251,245,234,0.5);">Tech: ${project.techStack.map(escapeHtml).join(', ')}</p>` : ''}
        <p style="margin-top:2rem;color:rgba(251,245,234,0.4);font-size:0.85rem;">Loading interactive case study…</p>
        <p><a href="/" style="color:#b85456;">← Back to all projects</a></p>
      </header>
    </div>
    <noscript>
      <h1>${escapeHtml(project.title)} — Case Study by Tayseer Laz</h1>
      <p>${escapeHtml(project.overview || project.desc)}</p>
      ${(project.highlights || []).map((h) => `<p>${escapeHtml(h)}</p>`).join('')}
      <p><a href="/">Back to Tayseer Laz portfolio</a></p>
    </noscript>
  `.trim()

  let html = baseHtml
    // Title
    .replace(
      /<title>[^<]*<\/title>/,
      `<title>${escapeHtml(title)}</title>`
    )
    // Description
    .replace(
      /<meta name="description" content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${escapeHtml(description)}" />`
    )
    // Canonical
    .replace(
      /<link rel="canonical" href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${url}" />`
    )
    // OG title/description/url/image
    .replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${escapeHtml(description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta property="og:image" content="[^"]*"\s*\/?>/, `<meta property="og:image" content="${image}" />`)
    .replace(/<meta property="og:type" content="[^"]*"\s*\/?>/, `<meta property="og:type" content="article" />`)
    // Twitter
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${escapeHtml(description)}" />`)
    .replace(/<meta name="twitter:image" content="[^"]*"\s*\/?>/, `<meta name="twitter:image" content="${image}" />`)

  // Append CreativeWork + Breadcrumb JSON-LD before </head>
  const extraSchema = `
    <script type="application/ld+json">${creativeWorkLd}</script>
    <script type="application/ld+json">${breadcrumbLd}</script>
  </head>`
  html = html.replace('</head>', extraSchema)

  // Replace the entire body content with the project-specific body
  // Match <body>...</body> and inject our content + the original script tag(s)
  const scriptMatch = baseHtml.match(/<script type="module"[^>]*><\/script>/)
  // Vite may inline more — capture all module scripts and link tags inside body
  const bodyScriptsMatch = baseHtml.match(/<body>([\s\S]*?)<\/body>/)
  let bodyScripts = ''
  if (bodyScriptsMatch) {
    // Extract all <script>, <link>, and <style> tags from the original body
    const tagRegex = /<(?:script|link|style)\b[^>]*(?:>[\s\S]*?<\/(?:script|style)>|\/?>)/g
    bodyScripts = (bodyScriptsMatch[1].match(tagRegex) || []).join('\n    ')
  }

  html = html.replace(
    /<body>[\s\S]*<\/body>/,
    `<body>\n    ${body}\n    ${bodyScripts}\n  </body>`
  )

  return html
}

let count = 0
for (const project of projects) {
  const dir = join(DIST, 'work', project.slug)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), generateProjectHtml(project), 'utf-8')
  count++
  console.log(`[seo] ✓ /work/${project.slug}/`)
}

console.log(`[seo] Generated ${count} static project pages`)
