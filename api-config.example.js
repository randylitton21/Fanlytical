// ============================================================================
// NFL Analytics Agent - API Configuration Template
// Copy this file to api-config.js and add your actual API keys
// ============================================================================

// API Keys - Replace with your actual keys
const API_KEYS = {
    openai: 'YOUR_OPENAI_API_KEY_HERE',
    tavily: 'YOUR_TAVILY_API_KEY_HERE',
    github: 'YOUR_GITHUB_TOKEN_HERE'
};

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.API_KEYS = API_KEYS;
}

