import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Bind to 127.0.0.1 explicitly: Chrome resolves localhost to IPv4 first,
    // and the default IPv6-only bind left the tab stuck on "connecting".
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    // Keep the HMR socket on the same host and port the page was opened from.
    hmr: { host: 'localhost', port: 5173 },
  },
})
