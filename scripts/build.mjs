import { build, createServer } from 'vite'
import { mkdir, readFile, writeFile } from 'node:fs/promises'

// Render the same React tree for humans and crawlers; no bot detection or extra dependencies.
await build()
const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false, watch: null }, appType: 'custom' })
try {
  const { render, origin, projects, projectSlugs, projectPath, pageMetadata, structuredData } = await server.ssrLoadModule('/src/entry-server.tsx')
  const template = await readFile('dist/index.html', 'utf8')
  const escape = (value) => value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
  const paths = ['/', ...projectSlugs.map(projectPath)]
  for (const path of paths) {
    const meta = pageMetadata(path)
    const html = template
      .replace(/<title>[^<]*<\/title>/, `<title>${escape(meta.title)}</title>`)
      .replace(/(<meta (?:name|property)="(?:description|og:description|twitter:description)" content=")[^"]*("\s*\/?>)/g, `$1${escape(meta.description)}$2`)
      .replace(/(<meta (?:name|property)="(?:og:title|twitter:title)" content=")[^"]*("\s*\/?>)/g, `$1${escape(meta.title)}$2`)
      .replace(/(<link rel="canonical" href=")[^"]*("\s*\/?>)/, `$1${meta.url}$2`)
      .replace(/(<meta property="og:url" content=")[^"]*("\s*\/?>)/, `$1${meta.url}$2`)
      .replace(/(<meta property="og:type" content=")[^"]*("\s*\/?>)/, `$1${meta.type}$2`)
      .replace('<!--structured-data-->', `<script type="application/ld+json">${JSON.stringify(structuredData(path)).replace(/</g, '\\u003c')}</script>`)
      .replace('<div id="root"></div>', `<div id="root">${render(path)}</div>`)
    const dir = path === '/' ? 'dist' : `dist${path}`
    await mkdir(dir, { recursive: true })
    await writeFile(`${dir}/index.html`, html)
  }
  // No invented lastmod dates: omit until per-page editorial dates are maintained.
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((path) => `  <url><loc>${origin}${path}</loc></url>`).join('\n')}\n</urlset>\n`)
  await writeFile('dist/llms.txt', `# Tayseer Laz\n\n> Product developer based in Beirut, Lebanon. Product strategy, UI/UX design, SaaS platforms, mobile apps and websites.\n\nContact: laztayseer@gmail.com\n\n## Canonical pages\n\n- [Portfolio](${origin}/): Profile, experience, work and contact.\n${projectSlugs.map((slug) => `- [${projects[slug].title}](${origin}${projectPath(slug)}): ${projects[slug].subtitle}`).join('\n')}\n\nThese are first-person portfolio case studies. Roles, collaborators, project status and limitations are described on the linked pages. This file is an optional index; it does not establish indexing or AI citation.\n`)
  console.log(`Prerendered ${paths.length} pages; generated sitemap.xml and llms.txt.`)
} finally {
  await server.close()
}
