import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import MusicPlayer from './MusicPlayer'
import './Hero.css'

const services = [
  { num: '#01', label: 'Product Development' },
  { num: '#02', label: 'Operations' },
  { num: '#03', label: 'Mobile Apps' },
  { num: '#04', label: 'Systems' },
]

export default function Hero() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      tl.from('.hero-title-line', {
        yPercent: 120, rotateX: -40, duration: 0.4, ease: 'expo.out', stagger: 0.04
      })
      .from('.hero-portrait', {
        opacity: 0, scale: 0.9, duration: 0.4, ease: 'expo.out'
      }, '-=0.3')
      .from('.hero-right', {
        opacity: 0, x: 40, duration: 0.25, ease: 'expo.out'
      }, '-=0.3')
      .from('.music-player', {
        opacity: 0, y: 30, duration: 0.25, ease: 'expo.out'
      }, '-=0.25')
      .from('.horror-svg', {
        opacity: 0, scale: 0.8, duration: 0.2, ease: 'power1.inOut', stagger: 0
      }, '-=0.3')
      .from('.hero-service', {
        opacity: 0, y: 30, duration: 0.35, ease: 'expo.out', stagger: 0.04
      }, '-=0.25')
      .from('.hero-scroll-hint', {
        opacity: 0, y: 20, duration: 0.3, ease: 'expo.out'
      }, '-=0.2')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" id="home" ref={sectionRef}>
      <div className="hero-gradient" />
      <div className="hero-vignette" />

      {/* ===== Horror SVG Layer ===== */}
      <div className="horror-layer">
        {/* Distorted all-seeing eye */}
        <svg className="horror-svg horror-eye" viewBox="0 0 200 120" fill="none">
          <defs>
            <filter id="glitch1">
              <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="3" seed="2">
                <animate attributeName="baseFrequency" values="0.02;0.06;0.02" dur="3s" repeatCount="indefinite"/>
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" scale="4"/>
            </filter>
          </defs>
          <g filter="url(#glitch1)">
            <ellipse cx="100" cy="60" rx="85" ry="45" stroke="white" strokeWidth="1.2" opacity="0.12"/>
            <ellipse cx="100" cy="60" rx="85" ry="45" stroke="white" strokeWidth="0.5" opacity="0.06" strokeDasharray="3 8"/>
            <circle cx="100" cy="60" r="22" stroke="white" strokeWidth="1" opacity="0.15"/>
            <circle cx="100" cy="60" r="8" fill="white" opacity="0.08"/>
            <circle cx="100" cy="60" r="3" fill="white" opacity="0.2"/>
            <line x1="100" y1="15" x2="100" y2="105" stroke="white" strokeWidth="0.3" opacity="0.06"/>
            <line x1="15" y1="60" x2="185" y2="60" stroke="white" strokeWidth="0.3" opacity="0.06"/>
          </g>
        </svg>

        {/* Fragmented skull/face outline */}
        <svg className="horror-svg horror-skull" viewBox="0 0 160 200" fill="none">
          <defs>
            <filter id="glitch2">
              <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="5">
                <animate attributeName="seed" values="5;12;5" dur="4s" repeatCount="indefinite"/>
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" scale="3"/>
            </filter>
          </defs>
          <g filter="url(#glitch2)">
            {/* Cranium fragments */}
            <path d="M80 15 C40 15, 15 50, 15 90 C15 110, 25 135, 50 145" stroke="white" strokeWidth="0.8" opacity="0.1" strokeDasharray="12 6"/>
            <path d="M80 15 C120 15, 145 50, 145 90 C145 110, 135 135, 110 145" stroke="white" strokeWidth="0.8" opacity="0.1" strokeDasharray="8 10"/>
            {/* Eye sockets */}
            <ellipse cx="55" cy="80" rx="18" ry="15" stroke="white" strokeWidth="0.7" opacity="0.12"/>
            <ellipse cx="105" cy="80" rx="18" ry="15" stroke="white" strokeWidth="0.7" opacity="0.12"/>
            <circle cx="55" cy="80" r="4" fill="white" opacity="0.06"/>
            <circle cx="105" cy="80" r="4" fill="white" opacity="0.06"/>
            {/* Nose cavity */}
            <path d="M75 100 L80 115 L85 100" stroke="white" strokeWidth="0.6" opacity="0.08"/>
            {/* Jaw fragments */}
            <path d="M50 145 C55 160, 65 170, 80 172 C95 170, 105 160, 110 145" stroke="white" strokeWidth="0.6" opacity="0.07" strokeDasharray="5 8"/>
            {/* Teeth marks */}
            <line x1="62" y1="148" x2="62" y2="158" stroke="white" strokeWidth="0.4" opacity="0.06"/>
            <line x1="72" y1="150" x2="72" y2="162" stroke="white" strokeWidth="0.4" opacity="0.06"/>
            <line x1="80" y1="151" x2="80" y2="163" stroke="white" strokeWidth="0.4" opacity="0.06"/>
            <line x1="88" y1="150" x2="88" y2="162" stroke="white" strokeWidth="0.4" opacity="0.06"/>
            <line x1="98" y1="148" x2="98" y2="158" stroke="white" strokeWidth="0.4" opacity="0.06"/>
          </g>
        </svg>

        {/* Spiraling vortex / madness spiral */}
        <svg className="horror-svg horror-spiral" viewBox="0 0 200 200" fill="none">
          <defs>
            <filter id="glitch3">
              <feTurbulence type="turbulence" baseFrequency="0.015" numOctaves="4" seed="8">
                <animate attributeName="baseFrequency" values="0.015;0.04;0.015" dur="5s" repeatCount="indefinite"/>
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" scale="5"/>
            </filter>
          </defs>
          <g filter="url(#glitch3)">
            <path d="M100 100 C100 85, 115 85, 115 100 C115 120, 80 120, 80 100 C80 70, 130 70, 130 100 C130 140, 60 140, 60 100 C60 50, 150 50, 150 100 C150 160, 40 160, 40 100 C40 30, 170 30, 170 100" stroke="white" strokeWidth="0.6" opacity="0.08" fill="none"/>
            <circle cx="100" cy="100" r="2" fill="white" opacity="0.15"/>
          </g>
        </svg>

        {/* Static noise lines / interference */}
        <svg className="horror-svg horror-static" viewBox="0 0 300 180" fill="none">
          <g opacity="0.06">
            {[...Array(25)].map((_, i) => {
              const y = 7 * i + 5
              const x1 = Math.sin(i * 0.8) * 30 + 10
              const x2 = 290 - Math.cos(i * 0.6) * 40
              return <line key={i} x1={x1} y1={y} x2={x2} y2={y} stroke="white" strokeWidth={Math.random() * 0.8 + 0.2}/>
            })}
          </g>
        </svg>

        {/* Dripping/melting vertical strokes */}
        <svg className="horror-svg horror-drip" viewBox="0 0 120 250" fill="none">
          <defs>
            <filter id="glitch4">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="3">
                <animate attributeName="seed" values="3;9;3" dur="6s" repeatCount="indefinite"/>
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" scale="2"/>
            </filter>
          </defs>
          <g filter="url(#glitch4)" opacity="0.1">
            <path d="M20 0 C20 40, 18 80, 22 120 C24 150, 19 190, 20 250" stroke="white" strokeWidth="1"/>
            <path d="M45 10 C44 60, 47 100, 43 160 C41 200, 46 230, 45 250" stroke="white" strokeWidth="0.7"/>
            <path d="M70 5 C72 50, 68 90, 71 140 C73 180, 69 220, 70 250" stroke="white" strokeWidth="1.2"/>
            <path d="M95 15 C93 55, 97 95, 94 145 C92 185, 96 225, 95 250" stroke="white" strokeWidth="0.5"/>
          </g>
        </svg>

        {/* Scattered crosses / occult marks */}
        <svg className="horror-svg horror-marks" viewBox="0 0 300 300" fill="none">
          <g opacity="0.07">
            <g transform="translate(50,40) rotate(12)">
              <line x1="-8" y1="0" x2="8" y2="0" stroke="white" strokeWidth="0.8"/>
              <line x1="0" y1="-10" x2="0" y2="10" stroke="white" strokeWidth="0.8"/>
            </g>
            <g transform="translate(230,70) rotate(-8)">
              <line x1="-6" y1="0" x2="6" y2="0" stroke="white" strokeWidth="0.6"/>
              <line x1="0" y1="-8" x2="0" y2="8" stroke="white" strokeWidth="0.6"/>
            </g>
            <g transform="translate(150,250) rotate(25)">
              <line x1="-10" y1="0" x2="10" y2="0" stroke="white" strokeWidth="0.5"/>
              <line x1="0" y1="-12" x2="0" y2="12" stroke="white" strokeWidth="0.5"/>
            </g>
            <g transform="translate(270,200) rotate(-15)">
              <line x1="-7" y1="0" x2="7" y2="0" stroke="white" strokeWidth="0.7"/>
              <line x1="0" y1="-9" x2="0" y2="9" stroke="white" strokeWidth="0.7"/>
            </g>
            <circle cx="80" cy="180" r="15" stroke="white" strokeWidth="0.4" strokeDasharray="2 4"/>
            <circle cx="220" cy="130" r="20" stroke="white" strokeWidth="0.3" strokeDasharray="3 5"/>
          </g>
        </svg>

        {/* Screaming mouth — bottom center */}
        <svg className="horror-svg horror-mouth" viewBox="0 0 140 180" fill="none">
          <defs>
            <filter id="glitch5">
              <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="7">
                <animate attributeName="seed" values="7;15;7" dur="2.5s" repeatCount="indefinite"/>
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" scale="3"/>
            </filter>
          </defs>
          <g filter="url(#glitch5)">
            <ellipse cx="70" cy="70" rx="55" ry="65" stroke="white" strokeWidth="0.8" opacity="0.1"/>
            <ellipse cx="70" cy="85" rx="35" ry="50" stroke="white" strokeWidth="0.6" opacity="0.08" fill="none"/>
            <path d="M40 55 Q55 45, 70 55 Q85 45, 100 55" stroke="white" strokeWidth="0.5" opacity="0.1"/>
            <path d="M42 110 Q56 125, 70 110 Q84 125, 98 110" stroke="white" strokeWidth="0.5" opacity="0.1"/>
            {/* Teeth top */}
            <line x1="48" y1="55" x2="48" y2="68" stroke="white" strokeWidth="0.5" opacity="0.08"/>
            <line x1="58" y1="52" x2="58" y2="70" stroke="white" strokeWidth="0.5" opacity="0.08"/>
            <line x1="70" y1="50" x2="70" y2="72" stroke="white" strokeWidth="0.6" opacity="0.09"/>
            <line x1="82" y1="52" x2="82" y2="70" stroke="white" strokeWidth="0.5" opacity="0.08"/>
            <line x1="92" y1="55" x2="92" y2="68" stroke="white" strokeWidth="0.5" opacity="0.08"/>
            {/* Teeth bottom */}
            <line x1="50" y1="108" x2="50" y2="96" stroke="white" strokeWidth="0.4" opacity="0.07"/>
            <line x1="60" y1="112" x2="60" y2="95" stroke="white" strokeWidth="0.4" opacity="0.07"/>
            <line x1="70" y1="113" x2="70" y2="93" stroke="white" strokeWidth="0.5" opacity="0.08"/>
            <line x1="80" y1="112" x2="80" y2="95" stroke="white" strokeWidth="0.4" opacity="0.07"/>
            <line x1="90" y1="108" x2="90" y2="96" stroke="white" strokeWidth="0.4" opacity="0.07"/>
          </g>
        </svg>

        {/* Inverted pentagram / sacred geometry gone wrong */}
        <svg className="horror-svg horror-pentagram" viewBox="0 0 200 200" fill="none">
          <defs>
            <filter id="glitch6">
              <feTurbulence type="turbulence" baseFrequency="0.025" numOctaves="3" seed="11">
                <animate attributeName="baseFrequency" values="0.025;0.05;0.025" dur="7s" repeatCount="indefinite"/>
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" scale="4"/>
            </filter>
          </defs>
          <g filter="url(#glitch6)">
            <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="0.5" opacity="0.06"/>
            <circle cx="100" cy="100" r="82" stroke="white" strokeWidth="0.3" opacity="0.04" strokeDasharray="2 6"/>
            {/* Star points — inverted */}
            <polygon points="100,175 127,65 38,130 162,130 73,65" stroke="white" strokeWidth="0.6" opacity="0.08" fill="none"/>
            <polygon points="100,170 125,70 42,128 158,128 75,70" stroke="white" strokeWidth="0.3" opacity="0.04" fill="none" strokeDasharray="4 5"/>
          </g>
        </svg>

        {/* Hands reaching up from below */}
        <svg className="horror-svg horror-hands" viewBox="0 0 300 200" fill="none">
          <defs>
            <filter id="glitch7">
              <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4">
                <animate attributeName="seed" values="4;10;4" dur="5s" repeatCount="indefinite"/>
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" scale="3"/>
            </filter>
          </defs>
          <g filter="url(#glitch7)" opacity="0.09">
            {/* Left hand */}
            <path d="M60 200 C58 170, 55 150, 52 130 C50 120, 48 110, 45 100" stroke="white" strokeWidth="0.8"/>
            <path d="M52 130 C48 118, 42 108, 38 95" stroke="white" strokeWidth="0.6"/>
            <path d="M55 135 C60 120, 62 108, 58 92" stroke="white" strokeWidth="0.6"/>
            <path d="M48 138 C42 125, 35 115, 30 100" stroke="white" strokeWidth="0.5"/>
            <path d="M58 140 C65 128, 70 115, 68 98" stroke="white" strokeWidth="0.5"/>
            {/* Right hand */}
            <path d="M240 200 C242 168, 245 148, 248 128 C250 118, 252 108, 255 98" stroke="white" strokeWidth="0.8"/>
            <path d="M248 128 C252 116, 258 106, 262 93" stroke="white" strokeWidth="0.6"/>
            <path d="M245 133 C240 118, 238 106, 242 90" stroke="white" strokeWidth="0.6"/>
            <path d="M252 136 C258 123, 265 113, 270 98" stroke="white" strokeWidth="0.5"/>
            <path d="M242 138 C235 126, 230 113, 232 96" stroke="white" strokeWidth="0.5"/>
          </g>
        </svg>

        {/* Glitch text fragments — broken words */}
        <svg className="horror-svg horror-text" viewBox="0 0 400 100" fill="none">
          <defs>
            <filter id="glitch8">
              <feTurbulence type="turbulence" baseFrequency="0.08" numOctaves="1" seed="2">
                <animate attributeName="seed" values="2;20;2" dur="0.8s" repeatCount="indefinite"/>
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" scale="6"/>
            </filter>
          </defs>
          <g filter="url(#glitch8)">
            <text x="30" y="35" fill="white" opacity="0.05" fontSize="14" fontFamily="monospace">CAN YOU SEE ME</text>
            <text x="180" y="60" fill="white" opacity="0.04" fontSize="10" fontFamily="monospace">LOOK CLOSER</text>
            <text x="80" y="80" fill="white" opacity="0.03" fontSize="18" fontFamily="monospace" letterSpacing="8">HELLO</text>
            <text x="250" y="30" fill="white" opacity="0.04" fontSize="8" fontFamily="monospace">DON'T LOOK AWAY</text>
            <text x="10" y="65" fill="white" opacity="0.03" fontSize="11" fontFamily="monospace">W̸̧H̷̡O̶̧ ̸A̴R̷E̸ ̷Y̴O̸U̷</text>
          </g>
        </svg>

        {/* Heartbeat / EKG flatline */}
        <svg className="horror-svg horror-ekg" viewBox="0 0 400 60" fill="none">
          <path
            d="M0 30 L80 30 L90 30 L95 10 L100 50 L105 5 L110 55 L115 25 L120 35 L130 30 L400 30"
            stroke="white" strokeWidth="0.8" opacity="0.08" fill="none"
            strokeDasharray="400" strokeDashoffset="400">
            <animate attributeName="stroke-dashoffset" values="400;0;0;400" dur="4s" repeatCount="indefinite" keyTimes="0;0.3;0.7;1"/>
          </path>
          <path
            d="M0 30 L80 30 L90 30 L95 10 L100 50 L105 5 L110 55 L115 25 L120 35 L130 30 L400 30"
            stroke="white" strokeWidth="0.3" opacity="0.04" fill="none"
            strokeDasharray="400" strokeDashoffset="400">
            <animate attributeName="stroke-dashoffset" values="400;0;0;400" dur="4s" begin="0.1s" repeatCount="indefinite" keyTimes="0;0.3;0.7;1"/>
          </path>
        </svg>

        {/* Barbed wire / thorns border */}
        <svg className="horror-svg horror-thorns" viewBox="0 0 500 40" fill="none">
          <g opacity="0.06">
            <path d="M0 20 Q12 8, 25 20 Q38 32, 50 20 Q62 8, 75 20 Q88 32, 100 20 Q112 8, 125 20 Q138 32, 150 20 Q162 8, 175 20 Q188 32, 200 20 Q212 8, 225 20 Q238 32, 250 20 Q262 8, 275 20 Q288 32, 300 20 Q312 8, 325 20 Q338 32, 350 20 Q362 8, 375 20 Q388 32, 400 20 Q412 8, 425 20 Q438 32, 450 20 Q462 8, 475 20 Q488 32, 500 20" stroke="white" strokeWidth="0.8"/>
            {/* Barbs */}
            {[...Array(20)].map((_, i) => {
              const x = i * 25 + 12
              return <g key={`barb-${i}`}>
                <line x1={x} y1="18" x2={x-4} y2="10" stroke="white" strokeWidth="0.6"/>
                <line x1={x} y1="22" x2={x+4} y2="30" stroke="white" strokeWidth="0.6"/>
              </g>
            })}
          </g>
        </svg>

        {/* Third eye / forehead eye — top center */}
        <svg className="horror-svg horror-third-eye" viewBox="0 0 100 60" fill="none">
          <defs>
            <filter id="glitch9">
              <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="2" seed="6">
                <animate attributeName="baseFrequency" values="0.04;0.08;0.04" dur="2s" repeatCount="indefinite"/>
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" scale="2"/>
            </filter>
          </defs>
          <g filter="url(#glitch9)">
            <path d="M5 30 Q50 -5, 95 30 Q50 65, 5 30Z" stroke="white" strokeWidth="0.7" opacity="0.12" fill="none"/>
            <circle cx="50" cy="30" r="12" stroke="white" strokeWidth="0.6" opacity="0.1"/>
            <circle cx="50" cy="30" r="5" fill="white" opacity="0.12">
              <animate attributeName="r" values="5;3;5;7;5" dur="3s" repeatCount="indefinite"/>
            </circle>
            <circle cx="50" cy="30" r="1.5" fill="white" opacity="0.25"/>
            {/* Eyelashes / rays */}
            <line x1="50" y1="2" x2="50" y2="-8" stroke="white" strokeWidth="0.4" opacity="0.08"/>
            <line x1="35" y1="8" x2="28" y2="0" stroke="white" strokeWidth="0.4" opacity="0.08"/>
            <line x1="65" y1="8" x2="72" y2="0" stroke="white" strokeWidth="0.4" opacity="0.08"/>
            <line x1="20" y1="20" x2="10" y2="15" stroke="white" strokeWidth="0.3" opacity="0.06"/>
            <line x1="80" y1="20" x2="90" y2="15" stroke="white" strokeWidth="0.3" opacity="0.06"/>
          </g>
        </svg>

        {/* Web / cracks spreading */}
        <svg className="horror-svg horror-cracks" viewBox="0 0 300 300" fill="none">
          <g opacity="0.06">
            <path d="M150 150 L120 80 L95 40" stroke="white" strokeWidth="0.6"/>
            <path d="M150 150 L200 90 L230 50" stroke="white" strokeWidth="0.5"/>
            <path d="M150 150 L80 130 L20 120" stroke="white" strokeWidth="0.7"/>
            <path d="M150 150 L220 160 L280 155" stroke="white" strokeWidth="0.5"/>
            <path d="M150 150 L130 220 L115 270" stroke="white" strokeWidth="0.6"/>
            <path d="M150 150 L190 210 L210 260" stroke="white" strokeWidth="0.4"/>
            <path d="M150 150 L70 190 L30 230" stroke="white" strokeWidth="0.5"/>
            <path d="M150 150 L250 200 L290 240" stroke="white" strokeWidth="0.4"/>
            {/* Branch fractures */}
            <path d="M120 80 L100 75 M120 80 L130 65" stroke="white" strokeWidth="0.3"/>
            <path d="M200 90 L215 80 M200 90 L190 75" stroke="white" strokeWidth="0.3"/>
            <path d="M80 130 L75 115 M80 130 L65 140" stroke="white" strokeWidth="0.3"/>
            <path d="M130 220 L115 225 M130 220 L140 235" stroke="white" strokeWidth="0.3"/>
            <circle cx="150" cy="150" r="3" fill="white" opacity="0.1"/>
          </g>
        </svg>

        {/* Chained eye — mid left */}
        <svg className="horror-svg horror-chain-eye" viewBox="0 0 160 200" fill="none">
          <defs>
            <filter id="glitch10">
              <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="13">
                <animate attributeName="seed" values="13;20;13" dur="3.5s" repeatCount="indefinite"/>
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" scale="3"/>
            </filter>
          </defs>
          <g filter="url(#glitch10)">
            {/* Vertical chain links */}
            <ellipse cx="80" cy="20" rx="12" ry="18" stroke="white" strokeWidth="0.6" opacity="0.08" fill="none"/>
            <ellipse cx="80" cy="50" rx="12" ry="18" stroke="white" strokeWidth="0.6" opacity="0.08" fill="none"/>
            <ellipse cx="80" cy="80" rx="12" ry="18" stroke="white" strokeWidth="0.6" opacity="0.08" fill="none"/>
            {/* Eye at chain end */}
            <path d="M45 120 Q80 95, 115 120 Q80 145, 45 120Z" stroke="white" strokeWidth="0.7" opacity="0.1" fill="none"/>
            <circle cx="80" cy="120" r="10" stroke="white" strokeWidth="0.5" opacity="0.09"/>
            <circle cx="80" cy="120" r="4" fill="white" opacity="0.1">
              <animate attributeName="cy" values="120;118;122;120" dur="2s" repeatCount="indefinite"/>
            </circle>
            {/* More chain below eye */}
            <ellipse cx="80" cy="155" rx="12" ry="18" stroke="white" strokeWidth="0.6" opacity="0.08" fill="none"/>
            <ellipse cx="80" cy="185" rx="12" ry="18" stroke="white" strokeWidth="0.6" opacity="0.08" fill="none"/>
          </g>
        </svg>

        {/* Spine / vertebrae column — mid left */}
        <svg className="horror-svg horror-spine" viewBox="0 0 60 300" fill="none">
          <defs>
            <filter id="glitch11">
              <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="2" seed="9">
                <animate attributeName="seed" values="9;16;9" dur="4s" repeatCount="indefinite"/>
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" scale="2"/>
            </filter>
          </defs>
          <g filter="url(#glitch11)" opacity="0.07">
            {/* Central cord */}
            <path d="M30 0 C32 50, 28 100, 30 150 C32 200, 28 250, 30 300" stroke="white" strokeWidth="0.8"/>
            {/* Vertebrae */}
            {[...Array(12)].map((_, i) => {
              const y = i * 24 + 15
              const w = 8 + Math.sin(i * 0.7) * 4
              return <g key={`vert-${i}`}>
                <ellipse cx="30" cy={y} rx={w} ry="6" stroke="white" strokeWidth="0.5" fill="none"/>
                <line x1={30 - w - 3} y1={y} x2={30 - w - 10} y2={y - 2} stroke="white" strokeWidth="0.4"/>
                <line x1={30 + w + 3} y1={y} x2={30 + w + 10} y2={y - 2} stroke="white" strokeWidth="0.4"/>
              </g>
            })}
          </g>
        </svg>

        {/* Dead trees silhouette — bottom of hero */}
        <svg className="horror-svg horror-trees" viewBox="0 0 1200 200" fill="none" preserveAspectRatio="xMidYMax slice">
          <g opacity="0.08">
            {/* Tree 1 — far left, tall twisted */}
            <path d="M60 200 L58 140 L55 120 C52 105, 40 95, 30 80 M55 120 C58 108, 68 100, 78 88 M58 140 C50 132, 38 128, 25 118 M58 140 C65 130, 72 125, 85 122" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M30 80 C25 72, 18 68, 10 60 M30 80 C35 70, 40 62, 38 50" stroke="white" strokeWidth="1" strokeLinecap="round"/>
            <path d="M78 88 C82 78, 90 72, 95 60 M78 88 C72 76, 65 68, 58 55" stroke="white" strokeWidth="1" strokeLinecap="round"/>

            {/* Tree 2 — left */}
            <path d="M160 200 L158 150 L155 125 C150 108, 135 98, 125 82 M155 125 C160 110, 175 100, 185 85 M158 150 C148 140, 130 135, 115 128 M158 150 C170 138, 180 130, 195 125" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M125 82 C118 70, 108 62, 100 48 M125 82 C130 68, 138 58, 132 42" stroke="white" strokeWidth="0.8" strokeLinecap="round"/>
            <path d="M185 85 C192 72, 200 60, 198 45 M185 85 C178 72, 170 58, 165 42" stroke="white" strokeWidth="0.8" strokeLinecap="round"/>

            {/* Tree 3 — center-left, gnarled */}
            <path d="M320 200 L318 160 L315 130 C308 112, 290 100, 275 80 M315 130 C322 115, 340 105, 355 85 M318 160 C305 148, 285 142, 265 135" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M275 80 C268 65, 255 55, 245 35 M275 80 C282 65, 292 52, 288 32" stroke="white" strokeWidth="0.9" strokeLinecap="round"/>
            <path d="M355 85 C362 68, 372 55, 380 35 M355 85 C348 70, 338 55, 330 38" stroke="white" strokeWidth="0.9" strokeLinecap="round"/>
            {/* Extra branches */}
            <path d="M245 35 L238 22 M245 35 L255 20" stroke="white" strokeWidth="0.5" strokeLinecap="round"/>
            <path d="M380 35 L390 18 M380 35 L372 15" stroke="white" strokeWidth="0.5" strokeLinecap="round"/>

            {/* Tree 4 — center, tallest */}
            <path d="M500 200 L498 145 L495 105 C488 82, 465 68, 448 45 M495 105 C502 85, 525 72, 545 48 M498 145 C482 132, 460 125, 440 115 M498 145 C515 130, 535 122, 555 118" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
            <path d="M448 45 C440 30, 428 20, 420 5 M448 45 C455 28, 465 15, 460 0" stroke="white" strokeWidth="1" strokeLinecap="round"/>
            <path d="M545 48 C555 30, 565 18, 575 0 M545 48 C535 32, 525 18, 520 0" stroke="white" strokeWidth="1" strokeLinecap="round"/>
            <path d="M440 115 C425 105, 408 98, 395 85" stroke="white" strokeWidth="0.7" strokeLinecap="round"/>
            <path d="M555 118 C570 108, 585 98, 600 88" stroke="white" strokeWidth="0.7" strokeLinecap="round"/>

            {/* Tree 5 — center-right */}
            <path d="M680 200 L678 155 L675 125 C668 108, 652 98, 640 78 M675 125 C682 108, 698 98, 712 80 M678 155 C665 142, 648 135, 632 128" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M640 78 C632 60, 620 48, 612 30 M640 78 C648 62, 658 48, 652 28" stroke="white" strokeWidth="0.9" strokeLinecap="round"/>
            <path d="M712 80 C720 62, 730 48, 738 28 M712 80 C705 65, 695 50, 688 32" stroke="white" strokeWidth="0.9" strokeLinecap="round"/>

            {/* Tree 6 — right */}
            <path d="M850 200 L848 158 L845 130 C840 115, 828 105, 818 88 M845 130 C850 115, 862 105, 872 90 M848 158 C838 148, 822 142, 808 135" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M818 88 C812 75, 802 65, 795 48 M818 88 C825 72, 832 60, 828 42" stroke="white" strokeWidth="0.8" strokeLinecap="round"/>
            <path d="M872 90 C880 75, 888 62, 895 42 M872 90 C865 75, 858 60, 852 42" stroke="white" strokeWidth="0.8" strokeLinecap="round"/>

            {/* Tree 7 — far right, leaning */}
            <path d="M1000 200 L1005 155 L1010 128 C1018 110, 1035 100, 1048 82 M1010 128 C1005 112, 992 102, 980 85 M1005 155 C1020 142, 1038 135, 1055 128" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
            <path d="M1048 82 C1055 65, 1065 52, 1072 32 M1048 82 C1042 68, 1035 52, 1038 35" stroke="white" strokeWidth="0.8" strokeLinecap="round"/>
            <path d="M980 85 C972 68, 962 55, 955 35 M980 85 C985 70, 992 55, 990 38" stroke="white" strokeWidth="0.8" strokeLinecap="round"/>

            {/* Tree 8 — far far right */}
            <path d="M1140 200 L1138 160 L1135 135 C1130 120, 1118 112, 1108 95 M1135 135 C1140 118, 1152 108, 1162 92 M1138 160 C1128 150, 1112 142, 1098 135" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
            <path d="M1108 95 C1102 80, 1092 68, 1085 50 M1162 92 C1170 75, 1178 62, 1182 42" stroke="white" strokeWidth="0.7" strokeLinecap="round"/>

            {/* Ground line — rough terrain */}
            <path d="M0 198 C30 195, 60 200, 100 197 C140 194, 180 200, 240 196 C300 192, 360 200, 420 195 C480 190, 540 200, 600 196 C660 192, 720 200, 780 195 C840 190, 900 200, 960 196 C1020 192, 1080 200, 1140 196 L1200 198" stroke="white" strokeWidth="0.8"/>
          </g>
        </svg>
      </div>

      <div className="hero-player-wrap">
        <MusicPlayer />
      </div>

      <div className="hero-content">
        <div className="hero-left">
          <h1 className="hero-title">
            <span className="hero-title-overflow">
              <span className="hero-title-line">Product</span>
            </span>
            <span className="hero-title-overflow">
              <span className="hero-title-line">Developer</span>
            </span>
          </h1>
        </div>

        <div className="hero-right">
          <h2 className="hero-tagline">
            Aligning business strategy<br />with technical execution.
          </h2>
          <p className="hero-desc">
            End-to-end product development, from vision to scalable, user-centered solutions. Based in Beirut, Lebanon.
          </p>
          <a href="#work" className="hero-cta-btn" data-magnetic
            onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }) }}>
            <span>View My Work</span>
            <span className="hero-cta-arrow">&#8599;</span>
          </a>
        </div>
      </div>

      <div className="hero-services">
        {services.map((s, i) => (
          <div className="hero-service" key={i}>
            <span className="hero-service-num">{s.num}</span>
            <span className="hero-service-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="hero-scroll-hint">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  )
}
