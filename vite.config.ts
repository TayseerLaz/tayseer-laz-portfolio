import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Vite's default CSS target rewrites `max-width` media queries into range syntax (`width<=52rem`),
    // which Safari before 16.4 ignores, dropping every mobile layout rule on those iPhones.
    cssTarget: ['chrome87', 'edge88', 'firefox78', 'safari14'],
  },
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
