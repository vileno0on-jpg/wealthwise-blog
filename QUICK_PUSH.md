# Quick Push to GitHub

## Option 1: Using the PowerShell Script (Easiest)

1. **Get a GitHub Personal Access Token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Give it a name like "WealthWise Blog"
   - Select scopes: `repo` (full control of private repositories)
   - Click "Generate token"
   - **Copy the token** (you won't see it again!)

2. **Run the script:**
   ```powershell
   .\create-and-push-repo.ps1 -RepoName "wealthwise-blog" -GitHubToken "YOUR_TOKEN_HERE"
   ```

## Option 2: Manual Method

### Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `wealthwise-blog` (or any name you want)
3. Description: "WealthWise - Personal Finance Blog"
4. Make it **Public**
5. **Don't** check "Add a README file" (we already have one)
6. Click "Create repository"

### Step 2: Push Your Code

After creating the repo, GitHub will show you commands. Run these:

```powershell
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/wealthwise-blog.git

# Push to GitHub
git push -u origin main
```

If you get authentication errors, you'll need to:
- Use a Personal Access Token as password
- Or set up SSH keys

## Option 3: Using GitHub Desktop

1. Download GitHub Desktop: https://desktop.github.com/
2. Sign in with your GitHub account
3. File → Add Local Repository
4. Select this folder: `C:\Users\vilen\Downloads\blogmoney`
5. Click "Publish repository"
6. Choose name and make it public
7. Click "Publish repository"

## After Pushing to GitHub

Once your code is on GitHub, you can deploy to Netlify:

1. Go to https://www.netlify.com
2. Sign in with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your `wealthwise-blog` repository
5. Netlify will auto-detect settings from `netlify.toml`
6. Click "Deploy site"

Your site will be live in a few minutes! 🚀

