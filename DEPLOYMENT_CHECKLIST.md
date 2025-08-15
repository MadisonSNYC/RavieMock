# 🚀 Production Deployment Checklist - Ravie Website

## Pre-Deployment Requirements

### 🔒 Security Verification
- [ ] All environment variables configured in production
- [ ] `.env` file NOT in repository
- [ ] Security headers configured
- [ ] CSP policy tested and working
- [ ] Rate limiting configured
- [ ] HTTPS/SSL certificate ready
- [ ] Secrets stored in secure vault/service

### ✅ Code Quality
- [ ] All tests passing (`npm test`)
- [ ] No console.log statements in production code
- [ ] No hardcoded development URLs
- [ ] No TODO comments in critical paths
- [ ] Code review completed
- [ ] Linting passed (`npm run lint`)

### 📦 Build Verification
- [ ] Production build successful (`npm run build`)
- [ ] Build size within budget (<500KB JS, <100KB CSS)
- [ ] No sourcemaps in production build
- [ ] Assets properly optimized
- [ ] Fonts subset and optimized
- [ ] Images in next-gen formats (WebP/AVIF)

### 🎨 Performance Checks
- [ ] Lighthouse score >90 for all categories
- [ ] Core Web Vitals passing:
  - [ ] LCP < 2.5s
  - [ ] FID < 100ms
  - [ ] CLS < 0.1
- [ ] Bundle analysis completed
- [ ] Code splitting implemented
- [ ] Lazy loading for images
- [ ] Critical CSS inlined

### 🌐 SEO & Accessibility
- [ ] Meta tags configured
- [ ] Open Graph tags present
- [ ] robots.txt configured
- [ ] sitemap.xml generated
- [ ] All images have alt text
- [ ] ARIA labels where needed
- [ ] Keyboard navigation working
- [ ] Screen reader tested

### 📱 Cross-Browser & Device Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)
- [ ] Responsive design verified (320px - 4K)

## Deployment Steps

### 1. Environment Setup
```bash
# Set production environment variables
export NODE_ENV=production
export VITE_APP_URL=https://ravie.co

# Verify all required env vars
npm run env:check
```

### 2. Final Build
```bash
# Clean previous builds
rm -rf dist

# Run production build
npm run build

# Verify build output
ls -la dist/
```

### 3. Security Headers Verification
```bash
# Test security headers locally
npm run preview

# Check headers with curl
curl -I http://localhost:4173
```

### 4. Performance Testing
```bash
# Run Lighthouse CI
npx lighthouse https://staging.ravie.co --view

# Check bundle size
npm run analyze
```

### 5. Database/API Configuration
- [ ] API endpoints updated to production
- [ ] CORS configured for production domain
- [ ] Rate limiting active
- [ ] Error tracking configured

### 6. CDN & Caching
- [ ] Static assets on CDN
- [ ] Cache headers configured
- [ ] Service worker registered (if PWA)
- [ ] Edge caching rules set

### 7. Monitoring Setup
- [ ] Error tracking active (Sentry/Rollbar)
- [ ] Analytics configured
- [ ] Performance monitoring enabled
- [ ] Uptime monitoring configured
- [ ] Log aggregation setup

## Deployment Commands

### Vercel
```bash
# Deploy to production
vercel --prod

# Deploy to staging
vercel
```

### Netlify
```bash
# Deploy to production
netlify deploy --prod

# Deploy preview
netlify deploy
```

### Traditional Server
```bash
# Copy files to server
rsync -avz --delete dist/ user@server:/var/www/ravie.co/

# Set correct permissions
ssh user@server 'chmod -R 755 /var/www/ravie.co/'
```

## Post-Deployment Verification

### Immediate Checks (First 5 minutes)
- [ ] Site loads correctly
- [ ] No console errors
- [ ] All pages accessible
- [ ] Forms working
- [ ] External links working
- [ ] Images loading
- [ ] Animations smooth

### Short-term Monitoring (First hour)
- [ ] Error rate normal
- [ ] Performance metrics stable
- [ ] No security warnings
- [ ] SSL certificate valid
- [ ] Traffic routing correctly

### First 24 Hours
- [ ] Monitor error logs
- [ ] Check performance degradation
- [ ] Verify backup system
- [ ] Review security logs
- [ ] Check resource usage

## Rollback Plan

### Quick Rollback
```bash
# Revert to previous version (Vercel)
vercel rollback

# Revert to previous version (Git)
git revert HEAD
npm run build
npm run deploy
```

### Emergency Contacts
- **DevOps Lead:** [Contact Info]
- **Security Team:** [Contact Info]
- **Project Manager:** [Contact Info]
- **On-call Engineer:** [Contact Info]

## Configuration Files Status

| File | Status | Location |
|------|--------|----------|
| `.env.production` | ✅ Ready | Server/CI |
| `robots.txt` | ✅ Ready | `/public` |
| `sitemap.xml` | ✅ Ready | `/public` |
| `security.txt` | ⏳ Pending | `/public/.well-known` |
| `manifest.json` | ✅ Ready | `/public` |

## Security Compliance
- [x] Input validation implemented
- [x] XSS protection active
- [x] CSRF protection configured
- [x] Rate limiting enabled
- [x] Security headers configured
- [x] Error messages sanitized
- [x] Logging without sensitive data

## Performance Optimizations
- [x] Code splitting implemented
- [x] Tree shaking enabled
- [x] CSS purged of unused styles
- [x] Images optimized
- [x] Fonts subset
- [x] Gzip/Brotli compression
- [x] HTTP/2 enabled

## Legal & Compliance
- [ ] Privacy Policy updated
- [ ] Terms of Service updated
- [ ] Cookie consent implemented (if needed)
- [ ] GDPR compliance (if applicable)
- [ ] Accessibility statement

## Final Sign-offs

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Developer | | | |
| QA Engineer | | | |
| Security Review | | | |
| Project Manager | | | |
| Client Approval | | | |

---

## Deployment Log

### Latest Deployment
- **Date:** 
- **Version:** 
- **Deployed By:** 
- **Environment:** 
- **Status:** 

### Previous Deployments
| Date | Version | Environment | Status | Notes |
|------|---------|-------------|--------|-------|
| | | | | |

---

**⚠️ IMPORTANT:** Do not proceed with deployment until ALL checkboxes are marked and sign-offs are complete.

**🔒 SECURITY REMINDER:** Never commit sensitive data. Always use environment variables for configuration.