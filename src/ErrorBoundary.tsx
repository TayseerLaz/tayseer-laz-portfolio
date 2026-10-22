import { Component, type ReactNode } from 'react'

type State = { error: Error | null }

/** Shows a message with a reload button instead of a blank page if anything throws while rendering. */
export default class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null }
  static getDerivedStateFromError(error: Error): State { return { error } }
  render() {
    if (!this.state.error) return this.props.children
    return (
      <div style={{ minHeight: '100svh', display: 'grid', placeContent: 'center', gap: 12, padding: 24, background: '#F1E9D6', color: '#0B2F26', fontFamily: 'Urbanist, sans-serif', textAlign: 'center' }}>
        <strong style={{ fontSize: 22 }}>Something broke while drawing the page.</strong>
        <code style={{ fontSize: 13, opacity: 0.8, maxWidth: 520 }}>{this.state.error.message}</code>
        <button onClick={() => window.location.reload()} style={{ marginTop: 8, padding: '10px 18px', borderRadius: 999, border: 0, background: '#0F7A43', color: '#F1E9D6', fontWeight: 700, cursor: 'pointer' }}>Reload</button>
      </div>
    )
  }
}
