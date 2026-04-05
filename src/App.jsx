import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Marquee from './components/Marquee'
import BehindDesigns from './components/BehindDesigns'
import TrustedBy from './components/TrustedBy'
// import RainingLetters from './components/RainingLetters'
import Work from './components/Work'
import Skills from './components/Skills'
import GravitySection from './components/GravitySection'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ParticleCanvas from './components/ParticleCanvas'
import ScrollProgress from './components/ScrollProgress'
import ProjectPage from './components/ProjectPage'
import OmniSignPage from './components/OmniSignPage'
import SEO from './components/SEO'
import { HomeStructuredData } from './components/StructuredData'

function HomePage() {
  return (
    <>
      <SEO
        title="Tayseer Laz — Product Developer"
        description="Tayseer Laz is a Product Developer based in Beirut, Lebanon. Specializing in end-to-end product development, UI/UX design, SaaS platforms, mobile apps, and AI integration."
        path="/"
      />
      <HomeStructuredData />
      <main>
        <Hero />
        <About />
        <Marquee />
        <TrustedBy />
        <BehindDesigns />
        {/* RainingLetters removed */}
        <Work />
        <Skills />
        <GravitySection />
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
