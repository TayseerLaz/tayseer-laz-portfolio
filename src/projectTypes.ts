/** Shape of one data-driven case study page (projects and capability pages). */
export type Shot = { src: string; cap: string }

export type ProjectData = {
  title: string
  /** One line under the title in the sticky bar. */
  subtitle: string
  /** Big headline in the first chapter. */
  headline: string
  /** Logo or app icon shown above the headline. */
  icon?: string
  tags: string[]
  links: { k: string; u: string }[]
  stats: { num: string; label: string }[]
  /** Optional wide screenshot under the intro. */
  hero?: { src: string; cap: string; href?: string }
  role: { title: string; body: string; me: string[] }
  /** Optional step strip, rendered as numbered pills. */
  flow?: { title: string; intro: string; steps: string[] }
  /** Optional gallery: 'wide' for website shots, 'phone' for app screens. */
  gallery?: { title: string; intro: string; kind: 'wide' | 'phone'; shots: Shot[] }
  features: { t: string; d: string }[]
  built: { t: string; how: string }[]
  stack: { k: string; v: string }[]
  footer: string
}
