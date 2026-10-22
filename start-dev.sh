#!/bin/sh
# Starts the portfolio dev server on http://localhost:5173 and keeps it in this window.
cd "$(dirname "$0")"
exec node node_modules/vite/bin/vite.js --port 5173 --strictPort
