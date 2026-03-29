import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://tayseerlaz.com'

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Tayseer Laz',
  url: SITE_URL,
  jobTitle: 'Product Developer',
  description: 'Product Developer specializing in end-to-end product development, UI/UX design, SaaS platforms, mobile apps, and AI integration. Based in Beirut, Lebanon.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Beirut',
    addressCountry: 'LB',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Rafik Hariri University',
    address: { '@type': 'PostalAddress', addressCountry: 'LB' },
  },
  sameAs: [
    'https://linkedin.com/in/tayseer-laz',
  ],
  email: 'laztayseer@gmail.com',
  telephone: '+96181238320',
  knowsAbout: [
    'Product Development',
    'UI/UX Design',
    'SaaS Platforms',
    'Mobile App Development',
    'AI Integration',
    'React',
    'React Native',
    'Node.js',
    'Firebase',
    'Sign Language Technology',
    'Computer Vision',
  ],
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'degree',
    name: 'Bachelor of Engineering in Computer & Communication Engineering',
  },
}

const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: personSchema,
  dateModified: '2026-03-29',
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Tayseer Laz Portfolio',
  url: SITE_URL,
  author: { '@type': 'Person', name: 'Tayseer Laz' },
}

export function HomeStructuredData() {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(profilePageSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
    </Helmet>
  )
}

export function ProjectStructuredData({ project }) {
  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.overview || project.desc,
    url: `${SITE_URL}/work/${project.slug}`,
    creator: { '@type': 'Person', name: 'Tayseer Laz' },
    dateCreated: project.year,
    keywords: project.tags,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE_URL}/#work` },
      { '@type': 'ListItem', position: 3, name: project.title, item: `${SITE_URL}/work/${project.slug}` },
    ],
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(projectSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
    </Helmet>
  )
}

export function OmniSignStructuredData() {
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'OmniSign',
    description: 'AI-powered Lebanese Sign Language translation platform featuring real-time gesture recognition and translation for accessibility.',
    applicationCategory: 'Accessibility',
    operatingSystem: 'Cross-platform',
    creator: { '@type': 'Person', name: 'Tayseer Laz' },
    url: `${SITE_URL}/work/omnisign`,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE_URL}/#work` },
      { '@type': 'ListItem', position: 3, name: 'OmniSign', item: `${SITE_URL}/work/omnisign` },
    ],
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(softwareSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
    </Helmet>
  )
}
