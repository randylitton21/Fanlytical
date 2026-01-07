# NFL Analytics Agent - Simplified Web App

A streamlined web application for NFL analytics with automatic API key loading and GitHub storage.

## Features

🏈 **Simple Interface**:
- Direct query input - no multi-step forms
- Real-time responses from OpenAI
- Conversation history saved to GitHub Gists
- Export conversations (TXT, JSON)

🔐 **Automatic Configuration**:
- API keys loaded from `api-config.js`
- No manual entry required
- GitHub storage for conversation history

## Quick Start

### 1. Set Up API Keys (Required)

**For Local Use:**
- Copy `api-config.example.js` to `api-config.js`
- Edit `api-config.js` and add your API keys
- See `SETUP_API_KEYS.md` for detailed instructions

**For GitHub Pages:**
- After deployment, edit `api-config.js` directly on GitHub
- Or add it manually after cloning the repository

### 2. Open the App

**Local:**
- Simply open `index.html` in your browser

**GitHub Pages:**
- Visit: https://randylitton21.github.io/Fanlytical
- (After enabling GitHub Pages - see below)

### 3. Start Querying

Type your NFL question and click "Send Query" or press Enter.

**Example Queries:**
- "Get Patrick Mahomes' stats"
- "Compare Chiefs vs Bills"
- "What are the injury reports for the Seahawks?"
- "Show me this week's betting odds"

## Deployment Status

✅ **Already Deployed!**

Your app has been deployed to: https://github.com/randylitton21/Fanlytical

### Enable GitHub Pages

1. Go to: https://github.com/randylitton21/Fanlytical/settings/pages
2. Under **Source**:
   - Branch: Select **`main`**
   - Folder: Select **`/ (root)`**
3. Click **Save**

Your app will be live at:
```
https://randylitton21.github.io/Fanlytical
```

**Note:** It may take 1-2 minutes for the site to go live after enabling Pages.

### Add API Keys for GitHub Pages

After enabling Pages, you need to add your API keys:

1. Go to your repository: https://github.com/randylitton21/Fanlytical
2. Click on `api-config.example.js`
3. Click "Edit" (pencil icon)
4. Copy the content
5. Click "Add file" → "Create new file"
6. Name it `api-config.js`
7. Paste the content and replace placeholders with your actual keys
8. Click "Commit new file"

Your app will work immediately!

### Manual Deployment

```bash
# Navigate to nfl-agent-web folder
cd nfl-agent-web

# Initialize git
git init
git branch -M main
git add .
git commit -m "Initial commit - NFL Agent Web App"

# Add your GitHub repository
git remote add origin https://github.com/YOUR-USERNAME/nfl-agent-web.git

# Push to GitHub
git push -u origin main
```

Then enable GitHub Pages:
1. Go to repository Settings → Pages
2. Source: `main` branch, `/ (root)` folder
3. Click Save

## File Structure

```
nfl-agent-web/
├── index.html          # Main HTML (simplified interface)
├── styles.css          # Styling
├── script.js           # Application logic
├── api-config.js       # API keys (auto-loaded)
├── config.js           # Configuration constants
└── README.md           # This file
```

## How It Works

1. **Query Input**: Type your NFL question
2. **OpenAI Processing**: Query sent to OpenAI API with NFL context
3. **Response Display**: Formatted response shown in conversation
4. **Auto-Save**: Conversation history saved to GitHub Gist
5. **Export**: Download conversations as TXT or JSON

## Security Note

⚠️ **Important**: The `api-config.js` file contains your API keys and will be visible in the GitHub repository. 

**For Production Use:**
- Consider using environment variables
- Use a backend API to hide keys
- Or use GitHub Secrets with a build process

**For Personal Use:**
- The current setup is fine for personal projects
- Keep your repository private if possible
- Rotate keys if they're exposed

## Features

- ✅ Automatic API key loading
- ✅ Simple, clean interface
- ✅ Conversation history
- ✅ GitHub Gist storage
- ✅ Export functionality
- ✅ Mobile responsive
- ✅ No authentication required

## Troubleshooting

### "API key not configured"
- Check that `api-config.js` exists and has your keys
- Verify keys are correct

### "Failed to save to GitHub"
- Check GitHub token has `gist` scope
- Verify token is valid

### Queries not working
- Check OpenAI API key is valid
- Verify you have API credits
- Check browser console for errors

## Support

For issues, check:
1. Browser console (F12) for errors
2. Verify API keys in `api-config.js`
3. Check GitHub token permissions

Enjoy your NFL Analytics Agent! 🏈
