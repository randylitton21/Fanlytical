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

### 1. API Keys Already Configured

The app automatically loads API keys from `api-config.js`. Your keys are already set up!

### 2. Open the App

Simply open `index.html` in your browser, or deploy to GitHub Pages.

### 3. Start Querying

Type your NFL question and click "Send Query" or press Enter.

**Example Queries:**
- "Get Patrick Mahomes' stats"
- "Compare Chiefs vs Bills"
- "What are the injury reports for the Seahawks?"
- "Show me this week's betting odds"

## Deployment to GitHub Pages

### Quick Deploy (Recommended)

See **[DEPLOY.md](DEPLOY.md)** for step-by-step instructions.

**Quick Steps:**
1. Create a GitHub repository (public)
2. Run `deploy.bat` (Windows) or `./deploy.sh` (Mac/Linux)
3. Enable GitHub Pages in repository Settings → Pages
4. Your app is live at `https://YOUR-USERNAME.github.io/nfl-agent-web`

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
