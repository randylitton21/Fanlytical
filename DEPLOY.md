# Deploy to GitHub Pages - Quick Guide

## 🚀 Quick Deployment (5 Minutes)

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `nfl-agent-web` (or your preferred name)
3. Description: "NFL Analytics Agent Web App"
4. Choose **Public** (required for free GitHub Pages)
5. **DO NOT** check "Initialize with README"
6. Click "Create repository"

### Step 2: Deploy Your Code

**Option A: Use Deployment Script (Easiest)**

```bash
# Windows
deploy.bat

# Mac/Linux
chmod +x deploy.sh
./deploy.sh
```

The script will:
- Initialize git (if needed)
- Ask for your GitHub repository URL
- Commit and push all files
- Guide you through the rest

**Option B: Manual Deployment**

```bash
# Navigate to nfl-agent-web folder
cd nfl-agent-web

# Initialize git
git init
git branch -M main

# Add all files
git add .

# Commit
git commit -m "Initial commit - NFL Agent Web App"

# Add your GitHub repository (replace with your URL)
git remote add origin https://github.com/YOUR-USERNAME/nfl-agent-web.git

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** (top menu)
3. Scroll to **Pages** (left sidebar)
4. Under **Source**:
   - Branch: Select **`main`**
   - Folder: Select **`/ (root)`**
5. Click **Save**

### Step 4: Access Your Live App

Your app will be live at:
```
https://YOUR-USERNAME.github.io/nfl-agent-web
```

**Note**: It may take 1-2 minutes for the site to go live after enabling Pages.

## 📝 Important Notes

### API Keys
- Your API keys are in `api-config.js` and will be visible in the repository
- For personal use, this is fine
- For production, consider:
  - Making the repository private
  - Using environment variables
  - Using a backend API

### Updating Your App

After making changes:

```bash
git add .
git commit -m "Your update description"
git push
```

Changes go live automatically in 1-2 minutes!

## 🔧 Troubleshooting

### "Page not found" (404)
- Wait 2-3 minutes (GitHub needs time to build)
- Check Settings → Pages is enabled
- Verify branch is `main` and folder is `/ (root)`

### Changes not appearing
- Clear browser cache
- Wait 1-2 minutes for GitHub to rebuild
- Check repository Settings → Pages

### Git push errors
- Verify your repository URL is correct
- Check you have write access
- Ensure you're authenticated with GitHub

## ✅ You're Done!

Your NFL Analytics Agent is now live on GitHub Pages! 🎉

