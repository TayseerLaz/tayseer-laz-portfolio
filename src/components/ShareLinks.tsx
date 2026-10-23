/** Plain share links, no third-party scripts: each opens the network's own share page for `url`. */
export default function ShareLinks({ url, title, className }: { url: string; title: string; className?: string }) {
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(title)
  const links = [
    ['LinkedIn', `https://www.linkedin.com/sharing/share-offsite/?url=${u}`],
    ['X', `https://x.com/intent/post?url=${u}&text=${t}`],
    ['Facebook', `https://www.facebook.com/sharer/sharer.php?u=${u}`],
    ['WhatsApp', `https://wa.me/?text=${t}%20${u}`],
  ]
  return (
    <nav className={className} aria-label="Share this page">
      <span>Share</span>
      {links.map(([name, href]) => (
        <a key={name} href={href} target="_blank" rel="noreferrer noopener" aria-label={`Share on ${name}`}>{name}</a>
      ))}
    </nav>
  )
}
