# 🚀 Quick Deploy to GitHub Pages

## One-Command Deployment

### Windows:
```bash
deploy.bat
```

### Mac/Linux:
```bash
chmod +x deploy.sh && ./deploy.sh
```

## What You Need

1. **GitHub Account** - Sign up at https://github.com
2. **Git Installed** - Download from https://git-scm.com

## Steps

1. **Create Repository on GitHub**
   - Go to https://github.com/new
   - Name: `nfl-agent-web`
   - Make it **Public**
   - Click "Create repository"

2. **Run Deployment Script**
   - Open terminal in `nfl-agent-web` folder
   - Run `deploy.bat` (Windows) or `./deploy.sh` (Mac/Linux)
   - Enter your GitHub repository URL when prompted
   - Example: `https://github.com/YOUR-USERNAME/nfl-agent-web.git`

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Source: **`main`** branch, **`/ (root)`** folder
   - Click **Save**

4. **Access Your App**
   - Your app will be live at:
   - `https://YOUR-USERNAME.github.io/nfl-agent-web`
   - Takes 1-2 minutes to go live

## That's It! 🎉

Your NFL Analytics Agent is now hosted on GitHub Pages!

## Updating

After making changes:
```bash
git add .
git commit -m "Update description"
git push
```

Changes go live automatically in 1-2 minutes.

