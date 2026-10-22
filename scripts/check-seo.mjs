import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '../dist')
const origin = 'https://tayseerlaz.com'
const sitemap = await readFile(resolve(dist, 'sitemap.xml'), 'utf8')
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
assert(urls.length > 1, 'Sitemap must include case studies')
assert.equal(new Set(urls).size, urls.length, 'Duplicate sitemap entries')
const titles = new Set()
const descriptions = new Set()
let linksChecked = 0
let imagesChecked = 0

for (const url of urls) {
  assert(url.startsWith(origin + '/') && url.endsWith('/'), `Noncanonical sitemap URL: ${url}`)
  const path = new URL(url).pathname
  const html = await readFile(resolve(dist, '.' + path, 'index.html'), 'utf8')
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1]
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1]
  assert(title && !titles.has(title), `Missing/duplicate title: ${url}`)
  assert(description && !descriptions.has(description), `Missing/duplicate description: ${url}`)
  titles.add(title); descriptions.add(description)
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `Expected exactly one h1: ${url}`)
  assert(html.includes(`<link rel="canonical" href="${url}"`), `Canonical mismatch: ${url}`)
  assert(html.includes(`<meta property="og:url" content="${url}"`), `Social URL mismatch: ${url}`)
  assert(!/<meta name="robots" content="[^"]*noindex/.test(html), `Unexpected noindex: ${url}`)
  assert(!/<div id="root">\s*<\/div>/.test(html), `Empty root: ${url}`)
  assert(!/Placeholder (?:paragraph|line)|This is placeholder text/.test(html), `Placeholder copy: ${url}`)
  assert(!html.includes('href="https://www.linkedin.com"'), `Generic LinkedIn destination: ${url}`)
  assert(!html.includes('role="dialog"'), `Standalone page announced as a modal: ${url}`)
  const data = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]
  assert(data, `Missing structured data: ${url}`)
  const graph = JSON.parse(data)['@graph']
  const entities = new Set(graph.map((entity) => entity['@id']))
  const visit = (value) => {
    if (!value || typeof value !== 'object') return
    if (Object.keys(value).length === 1 && value['@id']) assert(entities.has(value['@id']), `Unresolved entity: ${value['@id']}`)
    Object.values(value).forEach(visit)
  }
  visit(graph)
  assert(graph.some((entity) => entity['@type'] === (path === '/' ? 'ProfilePage' : 'BreadcrumbList')), `Missing page entity: ${url}`)

  for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    if (!href.startsWith('/') && !href.startsWith('#') && !href.startsWith(origin + '/')) continue
    const target = new URL(href.replaceAll('&amp;', '&'), url)
    const file = resolve(dist, '.' + decodeURIComponent(target.pathname))
    const targetFile = target.pathname.endsWith('/') ? resolve(file, 'index.html') : existsSync(file) ? file : resolve(file, 'index.html')
    assert(existsSync(targetFile), `Broken local link: ${url} -> ${href}`)
    if (target.hash) {
      const targetHTML = await readFile(targetFile, 'utf8')
      assert(targetHTML.includes(`id="${decodeURIComponent(target.hash.slice(1))}"`), `Broken fragment: ${url} -> ${href}`)
    }
    linksChecked++
  }
  for (const [tag, src] of html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"[^>]*>/g)) {
    assert(/\balt="[^"]*"/.test(tag), `Image has no alt attribute: ${url} -> ${src}`)
    if (src.startsWith('/')) assert(existsSync(resolve(dist, '.' + src)), `Missing image: ${src}`)
    imagesChecked++
  }
  if (path !== '/') {
    const home = await readFile(resolve(dist, 'index.html'), 'utf8')
    assert(home.includes(`href="${path}"`), `Case study has no home link: ${path}`)
  }
}
const robots = await readFile(resolve(dist, 'robots.txt'), 'utf8')
assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`), 'Incorrect sitemap discovery')
assert(!/^Disallow:\s*\/$/m.test(robots), 'Accidental crawler block')
const errorPage = await readFile(resolve(dist, '404.html'), 'utf8')
assert(errorPage.includes('noindex, follow'), '404 page should be excluded from indexing')
const htaccess = await readFile(resolve(dist, '.htaccess'), 'utf8')
assert(htaccess.includes('ErrorDocument 404 /404.html'), 'Missing real error document')
assert(!htaccess.includes('/#work/$1'), 'Old project redirect overrides generated pages')
const llms = await readFile(resolve(dist, 'llms.txt'), 'utf8')
for (const url of urls) assert(llms.includes(url), `Summary index is stale: ${url}`)
console.log(`SEO checks passed: ${urls.length} rendered pages, ${linksChecked} internal links, ${imagesChecked} image references, unique metadata and connected JSON-LD.`)
