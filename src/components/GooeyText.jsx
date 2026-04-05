import { useRef, useEffect } from 'react'
import './GooeyText.css'

export default function GooeyText({
  texts = [],
  morphTime = 1,
  cooldownTime = 0.25,
}) {
  const text1Ref = useRef(null)
  const text2Ref = useRef(null)

  useEffect(() => {
    const t1 = text1Ref.current
    const t2 = text2Ref.current
    if (!t1 || !t2 || texts.length === 0) return

    let textIndex = texts.length - 1
    let time = Date.now()
    let morph = 0
    let cooldown = cooldownTime
    let frameId

    function setMorph(fraction) {
      t2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`
      t2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`
      const inv = 1 - fraction
      t1.style.filter = `blur(${Math.min(8 / inv - 8, 100)}px)`
      t1.style.opacity = `${Math.pow(inv, 0.4) * 100}%`
    }

    function doCooldown() {
      morph = 0
      t2.style.filter = ''
      t2.style.opacity = '100%'
      t1.style.filter = ''
      t1.style.opacity = '0%'
    }

    function doMorph() {
      morph -= cooldown
      cooldown = 0
      let fraction = morph / morphTime
      if (fraction > 1) { cooldown = cooldownTime; fraction = 1 }
      setMorph(fraction)
    }

    function animate() {
      frameId = requestAnimationFrame(animate)
      const now = Date.now()
      const shouldIncrement = cooldown > 0
      const dt = (now - time) / 1000
      time = now
      cooldown -= dt

      if (cooldown <= 0) {
        if (shouldIncrement) {
          textIndex = (textIndex + 1) % texts.length
          t1.textContent = texts[textIndex % texts.length]
          t2.textContent = texts[(textIndex + 1) % texts.length]
        }
        doMorph()
      } else {
        doCooldown()
      }
    }

    animate()
    return () => cancelAnimationFrame(frameId)
  }, [texts, morphTime, cooldownTime])

  return (
    <div className="gooey-text">
      <svg className="gooey-text-svg" aria-hidden="true">
        <defs>
          <filter id="gooey-threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
      <div className="gooey-text-inner" style={{ filter: 'url(#gooey-threshold)' }}>
        <span ref={text1Ref} className="gooey-text-span" />
        <span ref={text2Ref} className="gooey-text-span" />
      </div>
    </div>
  )
}
