import type { ReactNode } from 'react'
import { site } from '../content'
import { useHydrated } from '../hydrated'

/**
 * The address as text, with a <wbr> before the "@": it reads, copies and wraps like plain text,
 * but the page source never contains a matchable address for harvesters.
 */
export function EmailText() {
  const [user, domain] = site.email.split('@')
  return <>{user}<wbr />@{domain}</>
}

/**
 * A mailto link whose href is only set in the browser. The pre-rendered HTML points at the contact
 * section instead, so bots reading the source find no address. Defaults to showing the address.
 */
export function MailLink({ className, children }: { className?: string; children?: ReactNode }) {
  const live = useHydrated()
  return <a className={className} href={live ? `mailto:${site.email}` : '/#contact'}>{children ?? <EmailText />}</a>
}
