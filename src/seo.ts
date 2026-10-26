import { site } from './content'

export const origin = 'https://tayseerlaz.com'
export const profile = {
  linkedin: 'https://www.linkedin.com/in/tayseer-laz',
  github: 'https://github.com/TayseerLaz',
  wikidata: 'https://www.wikidata.org/wiki/Q138822320',
  description: 'Tayseer Laz is a product developer in Beirut, Lebanon, building SaaS platforms, mobile apps and websites, from product strategy and UI/UX design to code.',
}

// Existing case-study content is the source for titles and summaries.
const featured = {
  wms: site.caseStudy,
  hader: site.hader,
  lancaster: site.lancaster,
  sla: site.sla,
  bsheel: site.bsheel,
  ievents: site.ievents,
  omnisign: site.omnisign,
}

export const projects = { ...featured, ...site.projects }
export type ProjectSlug = keyof typeof projects
export const projectSlugs = Object.keys(projects) as ProjectSlug[]
export const projectPath = (slug: string) => `/work/${slug}/`
export const projectFromPath = (pathname: string): ProjectSlug | undefined => {
  const slug = pathname.match(/^\/work\/([a-z0-9-]+)\/?$/)?.[1]
  return slug && Object.hasOwn(projects, slug) ? slug as ProjectSlug : undefined
}

export function pageMetadata(pathname: string) {
  const slug = projectFromPath(pathname)
  if (slug) return {
    title: `${projects[slug].title} — Case Study | ${site.name}`,
    description: projects[slug].subtitle,
    url: origin + projectPath(slug),
    type: 'article',
  }
  return {
    title: 'Tayseer Laz — Product Developer in Beirut, Lebanon',
    description: profile.description,
    url: origin + '/',
    type: 'profile',
  }
}

export function structuredData(pathname: string) {
  const meta = pageMetadata(pathname)
  const slug = projectFromPath(pathname)
  const person = {
    '@type': 'Person', '@id': `${origin}/#person`, name: site.name,
    url: `${origin}/`, jobTitle: 'Product Developer', description: profile.description,
    image: `${origin}/images/site/about-photo.webp`, email: `mailto:${site.email}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Beirut', addressCountry: 'LB' },
    sameAs: [profile.linkedin, profile.github, profile.wikidata],
    worksFor: { '@type': 'Organization', name: 'Aligned Tech', url: 'https://aligned-tech.com/' },
  }
  const website = {
    '@type': 'WebSite', '@id': `${origin}/#website`, url: `${origin}/`,
    name: `${site.name} — Product Developer Portfolio`, inLanguage: 'en',
    publisher: { '@id': person['@id'] },
  }
  const page = {
    '@type': slug ? 'WebPage' : 'ProfilePage', '@id': `${meta.url}#webpage`,
    url: meta.url, name: meta.title, description: meta.description, inLanguage: 'en',
    isPartOf: { '@id': website['@id'] },
    ...(slug ? {
      author: { '@id': person['@id'] },
      breadcrumb: { '@id': `${meta.url}#breadcrumbs` },
    } : { mainEntity: { '@id': person['@id'] } }),
  }
  const breadcrumbs = slug ? [{
    '@type': 'BreadcrumbList', '@id': `${meta.url}#breadcrumbs`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
      { '@type': 'ListItem', position: 2, name: projects[slug].title, item: meta.url },
    ],
  }] : []
  return { '@context': 'https://schema.org', '@graph': [person, website, page, ...breadcrumbs] }
}
