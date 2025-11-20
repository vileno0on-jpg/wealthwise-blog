# Deployment Guide

Quick guide to deploy FinanceHub to production.

## Pre-Deployment Checklist

- [ ] Update AdSense publisher ID in `pages/_app.tsx`
- [ ] Update Google Analytics ID in `pages/_app.tsx`
- [ ] Replace placeholder domain (financehub.com) with your actual domain
- [ ] Update contact email in footer and contact page
- [ ] Add your actual favicon.ico to `/public`
- [ ] Review and customize blog post content
- [ ] Set up environment variables

## Vercel Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **Configure Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add:
     - `NEXT_PUBLIC_SITE_URL` = your domain
     - `NEXT_PUBLIC_ADSENSE_CLIENT_ID` = your AdSense ID
     - `NEXT_PUBLIC_GA_MEASUREMENT_ID` = your GA4 ID

4. **Custom Domain**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS setup instructions

## Netlify Deployment

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: `18.x`

2. **Environment Variables**
   - Add same variables as Vercel
   - Go to Site Settings → Environment Variables

3. **Deploy**
   - Connect GitHub repository
   - Netlify will auto-detect Next.js
   - Click "Deploy site"

## Post-Deployment

1. **Submit Sitemap to Google**
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Add your property
   - Submit sitemap: `https://yourdomain.com/sitemap.xml`

2. **Verify AdSense**
   - Submit site for AdSense review
   - Wait for approval (usually 1-2 weeks)
   - Add approved ad code to components

3. **Set Up Analytics**
   - Verify Google Analytics is tracking
   - Set up conversion goals
   - Configure event tracking

4. **Test Everything**
   - [ ] All pages load correctly
   - [ ] Images display properly
   - [ ] Links work
   - [ ] Mobile responsive
   - [ ] Forms submit (if implemented)
   - [ ] SEO meta tags present

## Performance Optimization

1. **Enable Compression**
   - Vercel: Automatic
   - Netlify: Add `_headers` file

2. **Image Optimization**
   - Use Next.js Image component (already implemented)
   - Optimize images before upload
   - Use WebP format when possible

3. **Caching**
   - Static pages cached automatically
   - Configure CDN caching headers

## Monitoring

Set up monitoring for:
- Uptime (UptimeRobot, Pingdom)
- Performance (Google PageSpeed Insights)
- Errors (Sentry, LogRocket)
- Analytics (Google Analytics)

## SSL Certificate

- Vercel: Automatic HTTPS
- Netlify: Automatic HTTPS
- Other platforms: Use Let's Encrypt

## Backup Strategy

- Code: GitHub (already backed up)
- Content: Consider CMS integration
- Database: If using one, set up regular backups

## Scaling

As traffic grows:
1. Enable Vercel Pro/Enterprise for better limits
2. Consider CDN for static assets
3. Implement caching strategy
4. Monitor and optimize database queries (if applicable)
5. Set up load balancing (if needed)

---

**Need Help?** Check the main README.md for detailed setup instructions.

