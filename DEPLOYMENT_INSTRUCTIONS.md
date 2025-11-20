# Deployment Instructions

## Step 1: Push to GitHub

### Option A: Create a new repository on GitHub

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right, then "New repository"
3. Name it (e.g., `wealthwise-blog`)
4. **Don't** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

### Option B: Use existing repository

If you already have a GitHub repository, use that URL.

### Push the code

Run these commands (replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual values):

```bash
# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

If you get authentication errors, you may need to:
- Use a Personal Access Token instead of password
- Or set up SSH keys

## Step 2: Deploy to Netlify

### Method 1: Connect via GitHub (Recommended)

1. Go to [Netlify](https://www.netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and authorize Netlify
4. Select your repository (`wealthwise-blog` or whatever you named it)
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Node version:** 18 (or leave default)
6. Click "Deploy site"

Netlify will automatically:
- Install dependencies
- Run the build
- Deploy your site
- Give you a URL like `https://your-site-name.netlify.app`

### Method 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init
netlify deploy --prod
```

### Method 3: Drag and Drop

1. Build your site locally:
   ```bash
   npm run build
   ```
2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag the `.next` folder to the drop zone
4. Your site will be live in seconds!

## Step 3: Configure Custom Domain (Optional)

1. In Netlify dashboard, go to "Site settings" → "Domain management"
2. Click "Add custom domain"
3. Enter your domain name
4. Follow the DNS configuration instructions

## Step 4: Environment Variables (if needed)

If you add environment variables later:
1. Go to Netlify dashboard → Site settings → Environment variables
2. Add your variables
3. Redeploy the site

## Troubleshooting

### Build fails on Netlify

- Check the build logs in Netlify dashboard
- Ensure Node version is 18+
- Try adding `NPM_FLAGS = "--legacy-peer-deps"` to netlify.toml

### Site not updating

- Check if build succeeded
- Clear Netlify cache: Site settings → Build & deploy → Clear cache and deploy site

### Translation not working

- Google Translate widget may not work on localhost
- It should work on the live Netlify domain

## Quick Commands Reference

```bash
# Local development
npm run dev

# Build locally
npm run build

# Test production build
npm start

# Git commands
git add .
git commit -m "Your message"
git push origin main
```

## Support

For issues or questions:
- Check Netlify docs: https://docs.netlify.com
- Check Next.js docs: https://nextjs.org/docs

