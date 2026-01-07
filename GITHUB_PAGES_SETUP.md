# GitHub Pages Setup Guide

This guide will help you deploy the NFL Analytics Agent Web App to GitHub Pages.

## Prerequisites

1. A GitHub account
2. Git installed on your computer
3. The NFL Agent Web App files

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Fill in the repository details:
   - **Repository name**: `nfl-agent-web` (or any name you prefer)
   - **Description**: "NFL Analytics Agent Web Application"
   - **Visibility**: Choose Public (required for free GitHub Pages) or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

## Step 2: Initialize Git and Push Code

### Option A: Using the Deployment Script (Recommended)

#### Windows:
```bash
deploy.bat
```

#### Mac/Linux:
```bash
chmod +x deploy.sh
./deploy.sh
```

The script will guide you through:
- Initializing git (if needed)
- Adding your GitHub repository URL
- Committing and pushing your code

### Option B: Manual Setup

Open a terminal in the `nfl-agent-web` directory and run:

```bash
# Initialize git (if not already done)
git init
git branch -M main

# Add all files
git add .

# Commit
git commit -m "Initial commit - NFL Analytics Agent Web App"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to GitHub
git push -u origin main
```

**Replace**:
- `YOUR-USERNAME` with your GitHub username
- `YOUR-REPO-NAME` with your repository name

## Step 3: Enable GitHub Pages

1. Go to your GitHub repository on GitHub.com
2. Click on **Settings** (top menu bar)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Click **Save**

## Step 4: Access Your Live App

After enabling GitHub Pages, your app will be available at:

```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME
```

**Note**: It may take a few minutes for the site to go live. GitHub will show a message when it's ready.

## Step 5: Configure API Keys

1. Open your live app in a browser
2. Click the 🔑 (API Keys) button
3. Enter your API keys:
   - **OpenAI API Key** (required)
   - **GitHub Personal Access Token** (required)
   - **Tavily API Key** (optional)
   - **Serper API Key** (optional)
4. Click "Save API Keys"

### Getting a GitHub Personal Access Token

**Option 1: Classic Token (Recommended)**

1. Go to [GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a name: "NFL Agent Web App"
4. **IMPORTANT**: Select the **`gist`** scope (check the box) - this is required!
5. Click "Generate token"
6. **Copy the token immediately** (starts with `ghp_` - you won't see it again)
7. Paste it into the app's API Keys configuration

**Option 2: Fine-Grained Token**

1. Go to [GitHub Settings > Developer settings > Personal access tokens > Fine-grained tokens](https://github.com/settings/tokens?type=beta)
2. Click "Generate new token"
3. Give it a name and select repository access
4. Under **Permissions**, expand **Gists**
5. Select **"Read and write"** permission
6. Click "Generate token"
7. Copy the token (starts with `github_pat_`) and paste it into the app

**Troubleshooting**: If you get "Resource not accessible by personal access token" error, see `TROUBLESHOOTING.md` for detailed help.

## Updating Your App

### Using the Deployment Script

#### Windows:
```bash
deploy.bat
```

#### Mac/Linux:
```bash
./deploy.sh
```

### Manual Update

```bash
# Make your changes to the files

# Add changes
git add .

# Commit
git commit -m "Your update description"

# Push to GitHub
git push
```

Changes will go live on GitHub Pages automatically within 1-2 minutes.

## Troubleshooting

### "Page not found" or 404 Error

- Wait a few minutes (GitHub Pages can take time to build)
- Check that you selected the correct branch (`main`) and folder (`/ (root)`)
- Verify your repository is public (or you have GitHub Pro for private repos)

### Changes Not Appearing

- Clear your browser cache
- Wait 1-2 minutes for GitHub Pages to rebuild
- Check the repository Settings → Pages to ensure it's enabled

### Git Push Errors

- Verify your GitHub repository URL is correct
- Check that you have write access to the repository
- Ensure you're authenticated with GitHub (use GitHub CLI or SSH keys)

### Authentication Issues

If you get authentication errors when pushing:

**Option 1: Use GitHub CLI**
```bash
gh auth login
```

**Option 2: Use Personal Access Token**
1. Generate a token with `repo` scope
2. Use it as password when pushing:
```bash
git push https://YOUR-TOKEN@github.com/USERNAME/REPO.git
```

**Option 3: Use SSH**
1. Set up SSH keys with GitHub
2. Change remote URL:
```bash
git remote set-url origin git@github.com:USERNAME/REPO.git
```

## Custom Domain (Optional)

If you want to use a custom domain:

1. Add a `CNAME` file to your repository root with your domain name
2. Configure DNS records for your domain:
   - Type: `CNAME`
   - Name: `@` or `www`
   - Value: `YOUR-USERNAME.github.io`
3. Update GitHub Pages settings to use your custom domain

## Security Notes

- **Public Repositories**: Your code will be visible to everyone
- **API Keys**: Never commit API keys to the repository
- **GitHub Token**: Keep your GitHub Personal Access Token secure
- **HTTPS**: GitHub Pages automatically uses HTTPS

## Support

For issues:
1. Check GitHub Pages status: https://www.githubstatus.com/
2. Review GitHub Pages documentation: https://docs.github.com/en/pages
3. Check repository settings

## Next Steps

After deployment:
1. ✅ Test the app on your live URL
2. ✅ Configure API keys
3. ✅ Create an account
4. ✅ Test query execution
5. ✅ Verify cloud save works
6. ✅ Test on mobile devices

Enjoy your NFL Analytics Agent Web App! 🏈

