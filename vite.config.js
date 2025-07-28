import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Dev server binds
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
  // Vitest configuration: ignore E2E tests
  test: {
    include: ["src/**/*.{test,spec}.{js,jsx,ts,tsx}"],
    exclude: ["**/e2e/**", "node_modules/**"],
  },
});
