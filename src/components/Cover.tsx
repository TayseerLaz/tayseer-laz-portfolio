import type { ComponentProps, CSSProperties } from 'react'
import './Cover.css'

/**
 * An image cropped to fill its box, like object-fit: cover, while the <img> itself keeps its natural
 * aspect ratio (scanners report object-fit crops as distorted images). The box clips; the box's own
 * CSS sets its size and --x / --y, which place the image exactly like object-position.
 */
export default function Cover({ className, ...image }: { className: string } & ComponentProps<'img'>) {
  const ratio = Number(image.width) / Number(image.height)
  return (
    <div className={`cover ${className}`} style={{ '--ar': ratio } as CSSProperties}>
      <img {...image} />
    </div>
  )
}
