# Debugging Guide - App Not Executing Prompts

## Quick Checks

### 1. Check Browser Console

Open the browser console (F12) and look for:
- ✅ "Script.js loaded" - Script is loading
- ✅ "API_KEYS available: true" - API keys are loaded
- ✅ "Initializing app..." - App is initializing
- ✅ "Setting up event listeners..." - Event listeners are set up

### 2. Check API Keys

In the console, type:
```javascript
console.log(API_KEYS);
```

You should see your API keys. If you see `undefined`, the `api-config.js` file is not loaded.

### 3. Test Query Execution

In the console, type:
```javascript
executeQuery("test query");
```

This will show you if the function is working.

## Common Issues

### Issue 1: API Keys Not Loaded

**Symptoms:**
- Console shows "API_KEYS available: false"
- Error message: "API configuration not loaded"

**Solution:**
- Make sure `api-config.js` exists in the same folder as `index.html`
- Check that `api-config.js` is loaded before `script.js` in the HTML
- For GitHub Pages: Add `api-config.js` file to the repository

### Issue 2: Invalid API Key

**Symptoms:**
- Console shows "401 Unauthorized" error
- Error message: "Authentication error: Invalid OpenAI API key"

**Solution:**
- Check your OpenAI API key in `api-config.js`
- Verify the key is correct and active
- Check your OpenAI account has credits

### Issue 3: CORS Error

**Symptoms:**
- Console shows CORS error
- Network tab shows blocked request

**Solution:**
- OpenAI API should work from browsers
- Try a different browser
- Check if browser extensions are blocking requests

### Issue 4: Button Not Working

**Symptoms:**
- Clicking "Send Query" does nothing
- Console shows "Send button not found!"

**Solution:**
- Check that `index.html` has the correct button ID: `sendBtn`
- Verify the HTML structure is correct
- Check for JavaScript errors preventing initialization

## Step-by-Step Debugging

1. **Open Browser Console (F12)**
2. **Check for Errors** - Look for red error messages
3. **Check API Keys** - Type `API_KEYS` in console
4. **Test Button Click** - Click "Send Query" and watch console
5. **Check Network Tab** - See if API request is being made
6. **Check Response** - See what OpenAI API returns

## Manual Test

Try this in the browser console:

```javascript
// Check if everything is loaded
console.log('API_KEYS:', typeof API_KEYS !== 'undefined' ? 'Loaded' : 'Not loaded');
console.log('executeQuery:', typeof executeQuery !== 'undefined' ? 'Available' : 'Not available');
console.log('sendBtn:', document.getElementById('sendBtn') ? 'Found' : 'Not found');

// Try executing a query manually
if (typeof executeQuery !== 'undefined' && typeof API_KEYS !== 'undefined') {
    executeQuery("Get Patrick Mahomes stats");
}
```

## Still Not Working?

1. Check the browser console for specific error messages
2. Verify all files are present:
   - `index.html`
   - `script.js`
   - `styles.css`
   - `api-config.js` (or `api-config.example.js`)
   - `config.js`
3. Try opening `index.html` directly (file://) instead of through a server
4. Clear browser cache and reload

