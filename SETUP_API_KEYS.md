# Setting Up API Keys

## Important: API Keys Required

The `api-config.js` file is not included in the repository for security reasons. You need to create it locally.

## Quick Setup

1. **Copy the template file:**
   ```bash
   # Windows
   copy api-config.example.js api-config.js
   
   # Mac/Linux
   cp api-config.example.js api-config.js
   ```

2. **Edit `api-config.js` and add your API keys:**
   ```javascript
   const API_KEYS = {
       openai: 'YOUR_OPENAI_API_KEY_HERE',      // Get from https://platform.openai.com/api-keys
       tavily: 'YOUR_TAVILY_API_KEY_HERE',      // Get from https://tavily.com (optional)
       github: 'YOUR_GITHUB_TOKEN_HERE'         // Get from https://github.com/settings/tokens
   };
   ```

3. **Save the file** - it's already in `.gitignore` so it won't be committed.

## Your API Keys

If you have the `API.txt` file, copy your keys from there into `api-config.js`.

**Note:** Never commit your actual API keys to a public repository. Always use the example template and add your keys locally or through GitHub's file editor after deployment.

## For GitHub Pages Deployment

If you want the app to work on GitHub Pages, you have two options:

### Option 1: Add api-config.js Manually (After Deployment)

1. After deploying to GitHub, edit `api-config.js` directly on GitHub
2. Go to your repository → `api-config.js` → Edit (pencil icon)
3. Add your keys and commit
4. The app will work immediately

### Option 2: Keep Keys Local Only

- The app will work locally with `api-config.js`
- For GitHub Pages, users will need to add their own keys

## Security Note

⚠️ **Never commit `api-config.js` with real keys to a public repository!**

The file is in `.gitignore` to prevent accidental commits.

