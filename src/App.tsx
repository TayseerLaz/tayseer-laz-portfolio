import Header from './components/Header'
import Hero from './components/Hero'
import Work from './components/Work'
import Process from './components/Process'
import Certifications from './components/Certifications'
import Toolkit from './components/Toolkit'
import Notes from './components/Notes'
import Contact from './components/Contact'
import MacContact from './components/MacContact'
import About from './components/About'
import Footer from './components/Footer'
import ProjectPage from './components/ProjectPage'
import { projectFromPath } from './seo'

export default function App({ pathname = '/' }: { pathname?: string }) {
  const slug = projectFromPath(pathname)
  if (slug) return <ProjectPage slug={slug} />
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Work />
        <Process />
        <Certifications />
        <Toolkit />
        <Notes />
        <Contact />
        <MacContact />
      </main>
      <Footer />
    </>
  )
}
