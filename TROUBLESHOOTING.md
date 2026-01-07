# Troubleshooting Guide

## Common Issues and Solutions

### "Resource not accessible by personal access token"

This error occurs when your GitHub token doesn't have the correct permissions or format.

#### Solution 1: Create a Classic Token with Gist Scope (Recommended)

1. Go to [GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)](https://github.com/settings/tokens)
2. Click **"Generate new token (classic)"**
3. Give it a name: "NFL Agent Web App"
4. **IMPORTANT**: Check the **`gist`** scope (this allows creating and managing Gists)
5. Click **"Generate token"**
6. **Copy the token immediately** (starts with `ghp_`)
7. Paste it into the app's API Keys configuration

#### Solution 2: Use Fine-Grained Token

If you're using a fine-grained personal access token:

1. Go to [GitHub Settings > Developer settings > Personal access tokens > Fine-grained tokens](https://github.com/settings/tokens?type=beta)
2. Create a new token or edit existing one
3. Under **"Repository access"**, select your repositories or "All repositories"
4. Under **"Permissions"**, expand **"Gists"**
5. Select **"Read and write"** permission
6. Click **"Generate token"**
7. Copy the token and paste it into the app

**Note**: Fine-grained tokens use `Bearer` authentication (the app now supports both automatically).

#### Solution 3: Verify Token Format

- **Classic tokens**: Start with `ghp_` (e.g., `ghp_xxxxxxxxxxxx`)
- **Fine-grained tokens**: Start with `github_pat_` (e.g., `github_pat_xxxxxxxxxxxx`)

Make sure you copied the entire token without any extra spaces.

### "Invalid GitHub token" or "Unauthorized"

- Verify the token is correct (no typos, complete token)
- Check if the token has expired (create a new one)
- Ensure the token hasn't been revoked
- Make sure you're using the correct token type (classic vs fine-grained)

### "Failed to create GitHub Gist"

- Check your internet connection
- Verify the token has `gist` scope/permission
- Try creating a new token with fresh permissions
- Check GitHub status: https://www.githubstatus.com/

### API Keys Not Saving

- Check browser console for errors (F12)
- Ensure localStorage is available (not in private/incognito mode)
- Try a different browser
- Clear browser cache and try again

### Data Not Syncing Across Devices

- Verify you're logged in with the same account on both devices
- Check that your GitHub token is valid
- Ensure you have internet connection
- Try manually saving to cloud (💾 button)

### "Failed to decrypt data"

- Verify you're using the correct password
- Check if the data was corrupted
- Try logging in again
- If persistent, you may need to create a new account

### App Not Loading

- Check browser console for errors (F12)
- Ensure you're using a modern browser (Chrome, Firefox, Edge, Safari)
- Try clearing browser cache
- Check if JavaScript is enabled
- Verify all files are present (index.html, script.js, styles.css, config.js)

### Query Execution Not Working

- Verify OpenAI API key is configured
- Check API key is valid and has credits
- Ensure you have internet connection
- Check browser console for detailed error messages

## Getting Help

If you continue to experience issues:

1. Open browser console (F12) and check for error messages
2. Note the exact error message you're seeing
3. Check the troubleshooting steps above
4. Verify all API keys are correctly configured
5. Try creating a fresh GitHub token with proper permissions

## Token Permissions Checklist

For GitHub token to work, ensure:

- ✅ **Classic Token**: Has `gist` scope checked
- ✅ **Fine-Grained Token**: Has "Gists" permission set to "Read and write"
- ✅ Token is not expired
- ✅ Token hasn't been revoked
- ✅ Token format is correct (no extra spaces)

## Quick Token Test

You can test if your token works by running this in browser console (after opening the app):

```javascript
// Test token (replace with your token)
const token = 'your-token-here';
fetch('https://api.github.com/user', {
    headers: {
        'Authorization': token.startsWith('ghp_') ? `token ${token}` : `Bearer ${token}`
    }
})
.then(r => r.json())
.then(data => console.log('Token works!', data))
.catch(err => console.error('Token error:', err));
```

If you see your user info, the token is valid. Then test Gist access:

```javascript
fetch('https://api.github.com/gists', {
    method: 'POST',
    headers: {
        'Authorization': token.startsWith('ghp_') ? `token ${token}` : `Bearer ${token}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        description: 'Test',
        public: false,
        files: { 'test.txt': { content: 'test' } }
    })
})
.then(r => r.json())
.then(data => console.log('Gist access works!', data))
.catch(err => console.error('Gist error:', err));
```

If the second test fails, your token doesn't have Gist permissions.

