import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import ErrorBoundary from './ErrorBoundary'
export { origin, profile, projects, projectSlugs, projectPath, projectRole, projectTeam, pageMetadata, structuredData } from './seo'

export function render(pathname: string) {
  return renderToString(<StrictMode><ErrorBoundary><App pathname={pathname} /></ErrorBoundary></StrictMode>)
}
