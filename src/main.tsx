import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './fonts.css'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './ErrorBoundary.tsx'
import { projectPath, projectSlugs } from './seo'

// Preserve links shared by the previous hash-based portfolio.
const legacySlug = window.location.hash.match(/^#work\/([a-z0-9-]+)$/)?.[1]
if (legacySlug && projectSlugs.some((slug) => slug === legacySlug)) {
  window.location.replace(projectPath(legacySlug))
}

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <ErrorBoundary>
      <App pathname={window.location.pathname} />
    </ErrorBoundary>
  </StrictMode>
)
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
