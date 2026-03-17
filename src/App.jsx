import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Marquee from './components/Marquee'
import BehindDesigns from './components/BehindDesigns'
import Work from './components/Work'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ParticleCanvas from './components/ParticleCanvas'
import ScrollProgress from './components/ScrollProgress'
import ProjectPage from './components/ProjectPage'
import OmniSignPage from './components/OmniSignPage'

function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Marquee />
        <BehindDesigns />
        <Work />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  useEffect(() => {
    document.body.style.opacity = '0'
    document.body.style.transition = 'opacity 0.6s ease'
    const timer = setTimeout(() => {
      document.body.style.opacity = '1'
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Cursor />
      <div className="noise-overlay" />
      <ParticleCanvas />
      <ScrollProgress />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work/omnisign" element={<OmniSignPage />} />
        <Route path="/work/:slug" element={<ProjectPage />} />
      </Routes>
    </>
  )
}
