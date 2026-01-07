// ============================================================================
// NFL Analytics Agent - Configuration
// ============================================================================

// GitHub API Configuration
const GITHUB_CONFIG = {
    // GitHub API base URL
    API_BASE: 'https://api.github.com',
    
    // Gist API endpoints
    GIST_CREATE: '/gists',
    GIST_UPDATE: '/gists/{gist_id}',
    GIST_GET: '/gists/{gist_id}',
    
    // Request timeout (milliseconds)
    TIMEOUT: 20000, // 20 seconds
    
    // Gist file name for storing encrypted data
    GIST_FILENAME: 'nfl_agent_data.json'
};

// Application Configuration
const APP_CONFIG = {
    // Encryption settings
    ENCRYPTION: {
        algorithm: 'AES-GCM',
        keyLength: 256,
        ivLength: 12,
        tagLength: 128,
        pbkdf2Iterations: 100000,
        hashFunction: 'SHA-256'
    },
    
    // Storage keys
    STORAGE_KEYS: {
        USER_ACCOUNTS: 'nflAgentUserAccounts',
        USER_SESSION: 'nflAgentUserSession',
        API_KEYS: 'nflAgentApiKeys',
        PLAN_DATA: 'nflAgentPlanData'
    },
    
    // Step configuration
    TOTAL_STEPS: 7,
    
    // Auto-save interval (milliseconds)
    AUTO_SAVE_INTERVAL: 30000 // 30 seconds
};

// Export configuration (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GITHUB_CONFIG, APP_CONFIG };
}

