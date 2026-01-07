# Quick Start Guide

Get your NFL Analytics Agent Web App up and running in 5 minutes!

## 🚀 Quick Setup (5 Steps)

### Step 1: Get API Keys (2 minutes)

1. **OpenAI API Key** (Required)
   - Go to: https://platform.openai.com/api-keys
   - Click "Create new secret key"
   - Copy the key (starts with `sk-`)

2. **GitHub Personal Access Token** (Required)
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Name: "NFL Agent Web App"
   - Select scope: **`gist`** (check the box)
   - Click "Generate token"
   - Copy the token (starts with `ghp_`)

### Step 2: Open the App

**Option A: Local Testing**
- Simply open `index.html` in your web browser
- Or use a local server: `python -m http.server 8000`

**Option B: Deploy to GitHub Pages** (Recommended)
- Follow the instructions in `GITHUB_PAGES_SETUP.md`
- Or run `deploy.bat` (Windows) or `./deploy.sh` (Mac/Linux)

### Step 3: Configure API Keys

1. Open the app in your browser
2. Click the 🔑 (API Keys) button in the header
3. Enter your keys:
   - Paste your OpenAI API key
   - Paste your GitHub token
   - (Optional) Add Tavily or Serper keys if you have them
4. Click "Save API Keys"

### Step 4: Create Account

1. Click "Sign Up" tab
2. Enter:
   - Username (min 3 characters)
   - Password (min 6 characters)
   - Confirm password
3. Click "Sign Up"
4. Your account is created and encrypted data is saved to GitHub!

### Step 5: Start Using

1. Select a query type (Player Stats, Team Stats, etc.)
2. Enter your NFL query
3. Follow the steps to execute
4. View and export results!

## 📋 Example Queries

Try these queries to get started:

- **Player Stats**: "Get Patrick Mahomes' stats from NFL.com"
- **Team Comparison**: "Compare Chiefs vs Bills team stats from ESPN"
- **Game Schedule**: "What time do the Seahawks play this week?"
- **Injury Reports**: "Get the injury report for the Seahawks week 13"
- **Betting Odds**: "What are the current betting odds for this week's games?"

## 🔧 Troubleshooting

### "API key not found"
→ Go to API Keys settings and configure your keys

### "Failed to create GitHub Gist"
→ Check your GitHub token has the `gist` scope

### "Failed to decrypt data"
→ Make sure you're using the correct password

### App not loading
→ Check browser console for errors (F12)
→ Ensure you're using a modern browser (Chrome, Firefox, Edge, Safari)

## 📱 Mobile Access

The app works on mobile devices too!
- Open the app URL on your phone
- Login with your account
- All your data syncs automatically

## 🔐 Security Tips

- Use a strong, unique password
- Keep your GitHub token secure
- Don't share your account credentials
- Export your data regularly as backup

## 🆘 Need Help?

1. Check `README.md` for detailed documentation
2. Review `GITHUB_PAGES_SETUP.md` for deployment help
3. Check the browser console (F12) for error messages

## ✅ You're All Set!

Your NFL Analytics Agent is ready to use. Start querying NFL data and enjoy! 🏈

