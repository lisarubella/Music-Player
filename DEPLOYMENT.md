# Deployment Guide

This guide covers how to deploy the Cute Music Player app to various hosting platforms so it's accessible from both phones and laptops.

## Quick Start

### Local Development
```bash
npm install
npm run dev
```
Your app will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

## Deployment Options

### Option 1: Vercel (Recommended - Easiest)

Vercel is the creator of Next.js and provides excellent support for static sites and PWAs.

1. **Sign up** at https://vercel.com
2. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```
3. **Deploy**:
   ```bash
   vercel
   ```
4. **Follow the prompts** and your app will be live
5. **Visit your URL** on any device and install as PWA

**Advantages**:
- Zero configuration needed
- Free tier available
- CDN for fast global access
- Automatic HTTPS

### Option 2: Netlify

1. **Sign up** at https://netlify.com
2. **Connect your GitHub** (or upload manually)
3. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy and your site goes live
5. Install as PWA from the deployed URL

**Advantages**:
- Easy GitHub integration
- Free SSL certificate
- Form handling and serverless functions

### Option 3: GitHub Pages

1. **Update vite.config.ts** to add base path if needed:
   ```typescript
   export default defineConfig({
     base: '/cute-music-player/', // your repo name
     // ... rest of config
   })
   ```

2. **Create GitHub Actions workflow** at `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
         - run: npm ci
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

3. **Enable GitHub Pages** in repo settings (source: gh-pages branch)

4. Your app will be at `https://yourusername.github.io/cute-music-player`

**Advantages**:
- Free
- Integrated with GitHub
- No need for external services

### Option 4: AWS S3 + CloudFront

For more control and scalability:

1. **Create S3 bucket**
2. **Upload dist folder** contents to S3
3. **Set up CloudFront** distribution pointing to S3
4. **Enable static website hosting** on S3
5. Visit CloudFront URL and install as PWA

### Option 5: Docker Deployment

For advanced deployments:

**Dockerfile**:
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf**:
```nginx
server {
    listen 80;
    server_name _;
    
    root /usr/share/nginx/html;
    index index.html;
    
    # Enable gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # Service Worker
    location /sw.js {
        add_header Cache-Control "max-age=0, no-cache, no-store, must-revalidate";
    }
    
    # PWA manifest
    location /manifest.json {
        add_header Cache-Control "max-age=3600";
    }
    
    # Static assets
    location /assets {
        add_header Cache-Control "max-age=31536000";
    }
    
    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Build and run:
```bash
docker build -t cute-music-player .
docker run -p 80:80 cute-music-player
```

## Post-Deployment Testing

### Test on Desktop
1. Open your deployed URL in a browser
2. Look for install prompt or use browser menu
3. Click "Install app"
4. App should open as a standalone window

### Test on Mobile

**iOS**:
1. Open in Safari
2. Tap Share → Add to Home Screen
3. Launch from home screen

**Android**:
1. Open in Chrome
2. Tap Menu (⋮) → Install app
3. Launch from app drawer

### Verify PWA Features
1. Go to DevTools (F12)
2. Check Application tab → Service Workers
3. Should show registered and active

## Performance Optimization

### Already Configured
- ✅ Code splitting with Vite
- ✅ Service worker caching
- ✅ Static asset optimization
- ✅ Gzip compression (nginx/hosting)

### Additional Steps
1. **Enable Brotli compression** on your hosting
2. **Use CDN** for asset delivery (Vercel/Netlify handle this)
3. **Monitor with** web.dev/measure or PageSpeed Insights

## HTTPS Requirement

**Important**: PWA features (install, offline) require HTTPS. All recommended hosting options provide free HTTPS.

## Environment Variables

If you need environment variables:

1. Create `.env.local`:
   ```
   VITE_API_URL=https://api.example.com
   ```

2. Access in code:
   ```typescript
   const apiUrl = import.meta.env.VITE_API_URL
   ```

3. For deployments, set environment variables in hosting dashboard

## Monitoring & Analytics

### Google Analytics
Add to `src/main.tsx`:
```typescript
import { useEffect } from 'react'

useEffect(() => {
  const script = document.createElement('script')
  script.async = true
  script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_ID'
  document.head.appendChild(script)
  
  window.dataLayer = window.dataLayer || []
  function gtag(){window.dataLayer.push(arguments)}
  gtag('js', new Date())
  gtag('config', 'GA_ID')
}, [])
```

### Error Tracking
Use Sentry, LogRocket, or similar services for error monitoring

## Common Issues

### CORS Errors
- Ensure API endpoints allow your domain
- Use proxy in development if needed

### Service Worker Issues
- Hard refresh (Ctrl+Shift+R)
- Clear cache in DevTools → Application
- Check in DevTools Application tab

### Installation Not Working
- Verify HTTPS is enabled
- Check manifest.json is valid
- Test in different browser

## Rollback

### Vercel
Go to Vercel dashboard → Deployments → Redeploy previous version

### Netlify
Go to Netlify dashboard → Deploys → Publish deploy

### GitHub Pages
Push to main branch or revert commit

## Next Steps

1. Choose a hosting platform from options above
2. Follow the specific deployment steps
3. Test on multiple devices
4. Monitor app performance
5. Plan for future features

---

For detailed questions about specific platforms, refer to their documentation:
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [GitHub Pages Docs](https://pages.github.com)
