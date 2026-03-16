import { useState, useRef, useEffect, useCallback } from 'react'
import './MusicPlayer.css'

const AUDIO_SRC = '/tokyorifft-jazz-at-dizzyx27s-303230.mp3'

function HeartIcon({ filled }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.69C2 5.6 4.49 3.1 7.56 3.1C9.38 3.1 10.99 3.98 12 5.34C13.01 3.98 14.63 3.1 16.44 3.1C19.51 3.1 22 5.6 22 8.69C22 15.69 15.52 19.82 12.62 20.81Z" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM15.36 12.53L10.86 15.28C10.47 15.51 10 15.23 10 14.75V9.25C10 8.77 10.47 8.49 10.86 8.72L15.36 11.47C15.74 11.7 15.74 12.3 15.36 12.53Z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.97 2C6.45 2 1.97 6.48 1.97 12C1.97 17.52 6.45 22 11.97 22C17.49 22 21.97 17.52 21.97 12C21.97 6.48 17.5 2 11.97 2ZM10.72 15.03C10.72 15.51 10.52 15.7 10.01 15.7H8.71C8.2 15.7 8 15.51 8 15.03V8.97C8 8.49 8.2 8.3 8.71 8.3H10C10.51 8.3 10.71 8.49 10.71 8.97V15.03H10.72ZM16 15.03C16 15.51 15.8 15.7 15.29 15.7H14C13.49 15.7 13.29 15.51 13.29 15.03V8.97C13.29 8.49 13.49 8.3 14 8.3H15.29C15.8 8.3 16 8.49 16 8.97V15.03Z" />
    </svg>
  )
}

function PrevIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.24 7.22V16.79C20.24 18.75 18.11 19.98 16.41 19L12.26 16.61L8.11 14.21C6.41 13.23 6.41 10.78 8.11 9.8L12.26 7.4L16.41 5.01C18.11 4.03 20.24 5.25 20.24 7.22Z" />
      <path d="M3.76 18.93C3.35 18.93 3.01 18.59 3.01 18.18V5.82C3.01 5.41 3.35 5.07 3.76 5.07C4.17 5.07 4.51 5.41 4.51 5.82V18.18C4.51 18.59 4.17 18.93 3.76 18.93Z" />
    </svg>
  )
}

function NextIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.76 7.22V16.79C3.76 18.75 5.89 19.98 7.59 19L11.74 16.61L15.89 14.21C17.59 13.23 17.59 10.78 15.89 9.8L11.74 7.4L7.59 5.01C5.89 4.03 3.76 5.25 3.76 7.22Z" />
      <path d="M20.24 18.93C19.83 18.93 19.49 18.59 19.49 18.18V5.82C19.49 5.41 19.83 5.07 20.24 5.07C20.65 5.07 20.99 5.41 20.99 5.82V18.18C20.99 18.59 20.66 18.93 20.24 18.93Z" />
    </svg>
  )
}

function ShuffleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.75 17.98C21.75 17.96 21.74 17.94 21.74 17.92C21.73 17.84 21.72 17.76 21.69 17.69C21.65 17.6 21.6 17.53 21.54 17.46L19.54 15.46C19.25 15.17 18.77 15.17 18.48 15.46C18.19 15.75 18.19 16.23 18.48 16.52L19.19 17.23L16.33 17.25C15.72 17.25 15.14 16.97 14.78 16.49L13.56 14.92C13.31 14.59 12.84 14.53 12.51 14.79C12.18 15.05 12.12 15.51 12.38 15.84L13.6 17.41C14.25 18.25 15.27 18.75 16.33 18.75H16.34L19.19 18.74L18.48 19.45C18.19 19.74 18.19 20.22 18.48 20.51C18.63 20.66 18.82 20.73 19.01 20.73C19.2 20.73 19.39 20.66 19.54 20.51L21.54 18.51C21.61 18.44 21.66 18.36 21.7 18.27C21.73 18.17 21.75 18.07 21.75 17.98Z" />
      <path d="M8.42 6.69C7.77 5.79 6.73 5.26 5.62 5.26H5.6L3 5.27C2.59 5.27 2.25 5.61 2.25 6.02C2.25 6.43 2.59 6.77 3 6.77L5.61 6.76H5.62C6.25 6.76 6.84 7.06 7.2 7.57L8.28 9.07C8.43 9.27 8.66 9.38 8.89 9.38C9.04 9.38 9.2 9.33 9.33 9.24C9.67 8.99 9.74 8.52 9.5 8.19L8.42 6.69Z" />
      <path d="M21.74 6.08C21.74 6.06 21.75 6.04 21.75 6.03C21.75 5.93 21.73 5.83 21.69 5.74C21.65 5.65 21.6 5.57 21.53 5.5L19.53 3.5C19.24 3.21 18.76 3.21 18.47 3.5C18.18 3.79 18.18 4.27 18.47 4.56L19.18 5.27L16.45 5.26C15.28 5.26 14.2 5.83 13.56 6.8L7.17 16.38C6.81 16.92 6.2 17.25 5.55 17.25H5.54L3 17.23C2.59 17.23 2.25 17.56 2.25 17.98C2.25 18.39 2.58 18.73 3 18.73L5.55 18.74C6.73 18.74 7.8 18.17 8.44 17.2L14.83 7.62C15.19 7.08 15.8 6.75 16.45 6.75H16.46L21 6.77C21.1 6.77 21.19 6.75 21.29 6.71C21.38 6.67 21.46 6.62 21.53 6.55C21.6 6.47 21.66 6.4 21.69 6.31C21.72 6.24 21.73 6.16 21.74 6.08Z" />
    </svg>
  )
}

function RepeatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.91 17.18C3.72 17.18 3.53 17.11 3.38 16.96C2.01 15.58 1.25 13.76 1.25 11.83C1.25 7.82 4.5 4.56 8.5 4.56L14.57 4.58L13.48 3.54C13.18 3.25 13.17 2.78 13.46 2.48C13.75 2.18 14.22 2.17 14.52 2.46L16.96 4.8C17.18 5.01 17.25 5.34 17.14 5.62C17.03 5.9 16.75 6.09 16.44 6.09L8.5 6.07C5.33 6.07 2.75 8.66 2.75 11.84C2.75 13.37 3.35 14.82 4.44 15.91C4.73 16.2 4.73 16.68 4.44 16.97C4.29 17.11 4.1 17.18 3.91 17.18Z" />
      <path d="M10 21.75C9.81 21.75 9.63 21.68 9.48 21.54L7.04 19.2C6.82 18.99 6.75 18.66 6.86 18.38C6.98 18.1 7.26 17.95 7.56 17.91L15.51 17.93C18.68 17.93 21.26 15.34 21.26 12.16C21.26 10.63 20.66 9.18 19.57 8.09C19.28 7.8 19.28 7.32 19.57 7.03C19.86 6.74 20.34 6.74 20.63 7.03C22 8.41 22.76 10.23 22.76 12.16C22.76 16.17 19.51 19.43 15.51 19.43L9.44 19.41L10.53 20.45C10.83 20.74 10.84 21.21 10.55 21.51C10.39 21.67 10.2 21.75 10 21.75Z" />
    </svg>
  )
}

function formatTime(sec) {
  if (!sec || isNaN(sec)) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function MusicPlayer() {
  const [liked, setLiked] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [loop, setLoop] = useState(true)
  const audioRef = useRef(null)
  const sliderRef = useRef(null)
  const rafRef = useRef(null)

  // Create audio on mount — only plays when user presses play
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC)
    audio.preload = 'auto'
    audio.loop = true
    audio.volume = 0.5
    audioRef.current = audio

    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration)
    })

    audio.addEventListener('ended', () => {
      if (!audio.loop) setPlaying(false)
    })

    return () => {
      audio.pause()
      audio.src = ''
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Update progress via rAF
  useEffect(() => {
    const tick = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime)
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    if (playing) {
      rafRef.current = requestAnimationFrame(tick)
    } else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [playing])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    }
  }, [playing])

  const toggleLoop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.loop = !loop
      setLoop(!loop)
    }
  }, [loop])

  const restart = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
    }
  }, [])

  const skip = useCallback((sec) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(duration, Math.max(0, audioRef.current.currentTime + sec))
    }
  }, [duration])

  const handleSlider = (e) => {
    if (!sliderRef.current || !audioRef.current || !duration) return
    const rect = sliderRef.current.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    audioRef.current.currentTime = pct * duration
    setCurrentTime(pct * duration)
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="music-player" onPointerDown={(e) => e.stopPropagation()}>
      <div className="mp-cover">
        <div className={`mp-cover-art ${playing ? 'mp-cover-art--playing' : ''}`}>
          <div className="mp-vinyl">
            <div className="mp-vinyl-groove mp-vinyl-groove--1" />
            <div className="mp-vinyl-groove mp-vinyl-groove--2" />
            <div className="mp-vinyl-groove mp-vinyl-groove--3" />
            <div className="mp-vinyl-center">
              <div className="mp-vinyl-hole" />
            </div>
          </div>
        </div>
      </div>
      <div className="mp-body">
        <div className="mp-header">
          <div className="mp-info">
            <span className="mp-mix">Jazz at Dizzy's</span>
            <span className="mp-tracks">Tokyorifft</span>
            <span className="mp-title">Ambient Vibes</span>
          </div>
          <button className={`mp-heart ${liked ? 'mp-heart--liked' : ''}`} onClick={() => setLiked(!liked)}>
            <HeartIcon filled={liked} />
          </button>
        </div>

        <div className="mp-progress">
          <div className="mp-slider" ref={sliderRef} onClick={handleSlider}>
            <div className="mp-slider-track" />
            <div className="mp-slider-fill" style={{ width: `${progress}%` }} />
            <div className="mp-slider-thumb" style={{ left: `${progress}%` }} />
          </div>
          <div className="mp-times">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="mp-controls">
          <button className={`mp-btn mp-btn--sm ${loop ? 'mp-btn--active' : ''}`} onClick={toggleLoop}><RepeatIcon /></button>
          <button className="mp-btn" onClick={() => skip(-10)}><PrevIcon /></button>
          <button className="mp-btn mp-btn--play" onClick={togglePlay}>
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button className="mp-btn" onClick={() => skip(10)}><NextIcon /></button>
          <button className="mp-btn mp-btn--sm" onClick={restart}><ShuffleIcon /></button>
        </div>
      </div>
    </div>
  )
}
