# Enable GitHub Pages - Quick Guide

## Your Repository

**Repository:** https://github.com/randylitton21/Fanlytical

## Enable Pages (2 Steps)

### Step 1: Go to Settings

1. Visit: https://github.com/randylitton21/Fanlytical/settings/pages
2. Or: Repository → **Settings** → **Pages** (left sidebar)

### Step 2: Configure Pages

Under **"Source"**:
- **Branch**: Select **`main`**
- **Folder**: Select **`/ (root)`**
- Click **Save**

## Your Live App

After enabling (takes 1-2 minutes):
```
https://randylitton21.github.io/Fanlytical
```

## Add API Keys

The app needs API keys to work. After enabling Pages:

1. Go to: https://github.com/randylitton21/Fanlytical
2. Click **"Add file"** → **"Create new file"**
3. Name it: `api-config.js`
4. Copy content from `api-config.example.js` and add your keys:
   ```javascript
   const API_KEYS = {
       openai: 'YOUR_OPENAI_KEY',
       tavily: 'YOUR_TAVILY_KEY',
       github: 'YOUR_GITHUB_TOKEN'
   };
   ```
5. Click **"Commit new file"**

## That's It! 🎉

Your NFL Analytics Agent is now live and working!

