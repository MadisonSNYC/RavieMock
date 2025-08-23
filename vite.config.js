import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import crypto from 'crypto'

/**
 * Security headers middleware
 * Implements defense-in-depth security for development and production
 */
const securityHeaders = () => ({
  name: 'security-headers',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      // Security headers for development
      res.setHeader('X-Content-Type-Options', 'nosniff')
      res.setHeader('X-Frame-Options', 'DENY')
      res.setHeader('X-XSS-Protection', '1; mode=block')
      res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
      res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=()')
      
      // HSTS for development (shorter duration)
      res.setHeader('Strict-Transport-Security', 'max-age=86400')
      
      // Feature-Policy (legacy, kept for compatibility)
      res.setHeader('Feature-Policy', "camera 'none'; microphone 'none'; geolocation 'none'")
      
      // Additional security headers
      res.setHeader('X-Permitted-Cross-Domain-Policies', 'none')
      res.setHeader('X-Download-Options', 'noopen')
      res.setHeader('X-DNS-Prefetch-Control', 'off')
      
      // Basic CSP for development (more permissive for HMR)
      res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
        "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
        "img-src 'self' data: https: blob:; " +
        "font-src 'self' data: https://fonts.gstatic.com; " +
        "connect-src 'self' ws: wss: http://localhost:* https://vitals.vercel-insights.com; " +
        "worker-src 'self' blob:; " +
        "frame-src 'none'; " +
        "object-src 'none'; " +
        "base-uri 'self';"
      )
      
      next()
    })
  },
  configurePreviewServer(server) {
    server.middlewares.use((req, res, next) => {
      // Generate nonce for this request
      const nonce = crypto.randomBytes(16).toString('base64')
      
      // Store nonce on response object for use in HTML
      res.locals = res.locals || {}
      res.locals.nonce = nonce
      
      // Stricter headers for preview/production builds
      res.setHeader('X-Content-Type-Options', 'nosniff')
      res.setHeader('X-Frame-Options', 'DENY')
      res.setHeader('X-XSS-Protection', '1; mode=block')
      res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
      res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()')
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
      
      // Feature-Policy (legacy, kept for compatibility)
      res.setHeader('Feature-Policy', "camera 'none'; microphone 'none'; geolocation 'none'; payment 'none'")
      
      // Additional production security headers
      res.setHeader('X-Permitted-Cross-Domain-Policies', 'none')
      res.setHeader('X-Download-Options', 'noopen')
      res.setHeader('X-DNS-Prefetch-Control', 'off')
      res.setHeader('Expect-CT', 'max-age=86400, enforce')
      res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
      res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
      res.setHeader('Cross-Origin-Resource-Policy', 'same-origin')
      
      // Enhanced CSP for production with hash support for inline styles
      // Note: We keep 'unsafe-inline' for styles as a fallback for CSS-in-JS
      // In a fully production environment, you'd want to extract all inline styles
      res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; " +
        "script-src 'self' 'nonce-" + nonce + "'; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " + // Required for Tailwind and Google Fonts
        "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
        "img-src 'self' data: https: blob:; " +
        "font-src 'self' data: https://fonts.gstatic.com; " +
        "connect-src 'self' https://vitals.vercel-insights.com; " +
        "worker-src 'self' blob:; " +
        "media-src 'self' blob:; " +
        "frame-src 'none'; " +
        "object-src 'none'; " +
        "base-uri 'self'; " +
        "form-action 'self'; " +
        "frame-ancestors 'none'; " +
        "block-all-mixed-content; " +
        "upgrade-insecure-requests;"
      )
      
      next()
    })
  }
})

export default defineConfig({
  plugins: [react(), tailwindcss(), securityHeaders()],
  server: {
    port: 5173,
    open: true,
    // Additional security for dev server
    headers: {
      'X-Dev-Server': 'Vite'
    }
  },
  build: {
    // Security optimizations for production
    sourcemap: false, // Disable sourcemaps in production
    rollupOptions: {
      output: {
        // Ensure consistent chunk naming
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  }
})