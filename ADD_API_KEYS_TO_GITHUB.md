# Add API Keys to GitHub Pages

## Quick Solution

Since `api-config.js` is in `.gitignore` (for security), you need to add it manually to GitHub for the app to work on GitHub Pages.

## Method 1: Add via GitHub Web Interface (Easiest)

1. **Go to your repository:**
   https://github.com/randylitton21/Fanlytical

2. **Click "Add file" → "Create new file"**

3. **Name the file:** `api-config.js`

4. **Copy and paste this content:**
   Open your local `api-config.js` file and copy its entire content, OR use this template and replace with your actual keys:
   
   ```javascript
   // ============================================================================
   // NFL Analytics Agent - API Configuration
   // ============================================================================

   const API_KEYS = {
       openai: 'YOUR_OPENAI_API_KEY_HERE',
       tavily: 'YOUR_TAVILY_API_KEY_HERE',
       github: 'YOUR_GITHUB_TOKEN_HERE'
   };

   if (typeof window !== 'undefined') {
       window.API_KEYS = API_KEYS;
   }
   ```
   
   **Note:** Replace the placeholder values with your actual API keys from your local `api-config.js` file.

5. **Scroll down and click "Commit new file"**

6. **Wait 1-2 minutes** for GitHub Pages to rebuild

7. **Refresh your site** - it should work now!

## Method 2: Add via Command Line

If you prefer using git:

```bash
cd nfl-agent-web
git add -f api-config.js
git commit -m "Add api-config.js for GitHub Pages"
git push origin main
```

**Note:** GitHub may block this push due to secret scanning. If that happens, use Method 1 (web interface) instead.

## Security Warning

⚠️ **Important:** Adding API keys to a public repository makes them visible to anyone. 

**Options:**
1. **Make repository private** (GitHub Pages works with private repos if you have GitHub Pro)
2. **Use environment variables** (requires backend/server)
3. **Accept the risk** for personal/development use

## Verify It's Working

After adding the file:
1. Go to: https://randylitton21.github.io/Fanlytical
2. Open browser console (F12)
3. Type: `console.log(API_KEYS)`
4. You should see your keys (not `undefined`)

## Troubleshooting

**If GitHub blocks the push:**
- Use Method 1 (web interface) - it usually works
- Or visit the secret scanning URL to allow it

**If keys still not loading:**
- Check browser console for errors
- Verify file is named exactly `api-config.js`
- Clear browser cache and reload
- Wait 2-3 minutes for GitHub Pages to rebuild

