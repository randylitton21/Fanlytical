// ============================================================================
// NFL Analytics Agent - Simplified Web Application
// ============================================================================

// Application State
const appState = {
    conversationHistory: [],
    githubToken: null,
    gistId: null,
    reportsGistId: null,
    currentReportContent: null,
    savedReports: []
};

// ============================================================================
// Utility Functions
// ============================================================================

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function showLoading() {
    document.getElementById('loadingIndicator').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loadingIndicator').classList.add('hidden');
}

function addToResults(content, isQuery = false) {
    const container = document.getElementById('resultsContainer');
    
    // Remove welcome message if present
    const welcomeMsg = container.querySelector('.welcome-message');
    if (welcomeMsg) {
        welcomeMsg.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = isQuery ? 'message query-message' : 'message response-message';
    
    if (isQuery) {
        messageDiv.innerHTML = `<div class="message-header">📤 Your Query</div><div class="message-content">${escapeHtml(content)}</div>`;
    } else {
        // Store content for saving (store in data attribute)
        const messageId = 'msg_' + Date.now();
        messageDiv.setAttribute('data-message-id', messageId);
        messageDiv.setAttribute('data-content', content);
        
        const saveBtn = `<button class="btn-save-report" onclick="saveCurrentReport('${messageId}')" title="Save this report">💾 Save Report</button>`;
        messageDiv.innerHTML = `<div class="message-header">🤖 NFL Agent Response ${saveBtn}</div><div class="message-content">${formatResponse(content)}</div>`;
    }
    
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

function saveCurrentReport(messageId) {
    const messageDiv = document.querySelector(`[data-message-id="${messageId}"]`);
    if (messageDiv) {
        appState.currentReportContent = messageDiv.getAttribute('data-content');
        openSaveReportModal();
    }
}

// Make function globally available
window.saveCurrentReport = saveCurrentReport;

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatResponse(text) {
    // Convert markdown-style formatting to HTML
    let formatted = escapeHtml(text);
    
    // Convert **bold** to <strong>
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert *italic* to <em>
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Convert line breaks to <br>
    formatted = formatted.replace(/\n/g, '<br>');
    
    // Convert numbered lists
    formatted = formatted.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');
    if (formatted.includes('<li>')) {
        formatted = '<ul>' + formatted + '</ul>';
    }
    
    // Convert bullet points
    formatted = formatted.replace(/^[-•]\s+(.+)$/gm, '<li>$1</li>');
    
    return formatted;
}

// ============================================================================
// GitHub Gist Storage
// ============================================================================

async function saveToGitHub(data) {
    if (!appState.githubToken) {
        console.warn('GitHub token not available');
        return;
    }
    
    try {
        const gistData = {
            description: 'NFL Analytics Agent Conversation History',
            public: false,
            files: {
                'conversation.json': {
                    content: JSON.stringify(data, null, 2)
                }
            }
        };
        
        const url = appState.gistId 
            ? `${GITHUB_CONFIG.API_BASE}/gists/${appState.gistId}`
            : `${GITHUB_CONFIG.API_BASE}/gists`;
        
        const method = appState.gistId ? 'PATCH' : 'POST';
        const authHeader = appState.githubToken.startsWith('ghp_') || appState.githubToken.startsWith('github_pat_') 
            ? `token ${appState.githubToken}` 
            : `Bearer ${appState.githubToken}`;
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Authorization': authHeader,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gistData)
        });
        
        if (response.ok) {
            const result = await response.json();
            appState.gistId = result.id;
            console.log('Saved to GitHub Gist:', result.html_url);
            return true;
        }
    } catch (error) {
        console.error('Error saving to GitHub:', error);
    }
    return false;
}

async function loadFromGitHub() {
    if (!appState.githubToken || !appState.gistId) {
        return null;
    }
    
    try {
        const authHeader = appState.githubToken.startsWith('ghp_') || appState.githubToken.startsWith('github_pat_') 
            ? `token ${appState.githubToken}` 
            : `Bearer ${appState.githubToken}`;
        
        const response = await fetch(`${GITHUB_CONFIG.API_BASE}/gists/${appState.gistId}`, {
            headers: {
                'Authorization': authHeader,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (response.ok) {
            const gist = await response.json();
            const file = gist.files['conversation.json'];
            if (file) {
                const contentResponse = await fetch(file.raw_url);
                const data = await contentResponse.json();
                return data;
            }
        }
    } catch (error) {
        console.error('Error loading from GitHub:', error);
    }
    return null;
}

// ============================================================================
// OpenAI API Integration
// ============================================================================

async function executeQuery(query) {
    if (!API_KEYS.openai) {
        addToResults('Error: OpenAI API key not configured. Please check api-config.js', false);
        return;
    }
    
    showLoading();
    
    try {
        // Use OpenAI API directly
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEYS.openai}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: `You are an NFL Analytics Assistant. You help users get information about the National Football League (NFL).

Your capabilities:
- Player statistics and game logs
- Team statistics and comparisons
- Game schedules and times
- Injury reports and player availability
- Betting odds and lines
- Historical data and trends

CRITICAL: This application ONLY handles NFL (National Football League) queries. If asked about other sports or topics, politely redirect to NFL topics.

Format your responses as clear, easy-to-read lists with bullet points. Use headings to organize information. Make information easy to scan and read.

For injury reports, include:
- Player name and position
- Injury type and status
- Key statistics
- Game impact

Always provide accurate, helpful information. If you don't have current data, say so but provide what information you can.`
                    },
                    ...appState.conversationHistory.map(msg => ({
                        role: msg.role,
                        content: msg.content
                    })),
                    {
                        role: 'user',
                        content: query
                    }
                ],
                temperature: 0.3,
                max_tokens: 2000
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `API error: ${response.status}`);
        }
        
        const data = await response.json();
        const assistantMessage = data.choices[0].message.content;
        
        // Add to conversation history
        appState.conversationHistory.push(
            { role: 'user', content: query },
            { role: 'assistant', content: assistantMessage }
        );
        
        // Keep only last 20 messages to avoid token limits
        if (appState.conversationHistory.length > 20) {
            appState.conversationHistory = appState.conversationHistory.slice(-20);
        }
        
        // Display results
        addToResults(query, true);
        addToResults(assistantMessage, false);
        
        // Auto-save to GitHub
        if (appState.githubToken) {
            await saveToGitHub({
                history: appState.conversationHistory,
                lastUpdated: new Date().toISOString()
            });
        }
        
    } catch (error) {
        console.error('Query error:', error);
        addToResults(`Error: ${error.message}`, false);
    } finally {
        hideLoading();
    }
}

// ============================================================================
// Save Report Functionality
// ============================================================================

function openSaveReportModal() {
    if (!appState.currentReportContent) {
        alert('No report content to save');
        return;
    }
    
    // Try to auto-detect team, week, season from content
    const contentText = appState.currentReportContent || '';
    
    // Team mapping (same as Python app)
    const teamMapping = {
        'seattle seahawks': 'Seahawks',
        'kansas city chiefs': 'Chiefs',
        'denver broncos': 'Broncos',
        'las vegas raiders': 'Raiders',
        'los angeles chargers': 'Chargers',
        'buffalo bills': 'Bills',
        'miami dolphins': 'Dolphins',
        'new england patriots': 'Patriots',
        'new york jets': 'Jets',
        'baltimore ravens': 'Ravens',
        'cincinnati bengals': 'Bengals',
        'cleveland browns': 'Browns',
        'pittsburgh steelers': 'Steelers',
        'houston texans': 'Texans',
        'indianapolis colts': 'Colts',
        'jacksonville jaguars': 'Jaguars',
        'tennessee titans': 'Titans',
        'dallas cowboys': 'Cowboys',
        'new york giants': 'Giants',
        'philadelphia eagles': 'Eagles',
        'washington commanders': 'Commanders',
        'chicago bears': 'Bears',
        'detroit lions': 'Lions',
        'green bay packers': 'Packers',
        'minnesota vikings': 'Vikings',
        'atlanta falcons': 'Falcons',
        'carolina panthers': 'Panthers',
        'new orleans saints': 'Saints',
        'tampa bay buccaneers': 'Buccaneers',
        'arizona cardinals': 'Cardinals',
        'los angeles rams': 'Rams',
        'san francisco 49ers': '49ers'
    };
    
    // Find team in content
    let detectedTeam = '';
    let teamFolderName = '';
    const lowerContent = contentText.toLowerCase();
    
    for (const [fullName, folderName] of Object.entries(teamMapping)) {
        if (lowerContent.includes(fullName) || lowerContent.includes(folderName.toLowerCase())) {
            detectedTeam = fullName;
            teamFolderName = folderName;
            break;
        }
    }
    
    // Also check for team names directly
    if (!detectedTeam) {
        const teamMatch = contentText.match(/(?:Seahawks|Chiefs|Broncos|Raiders|Chargers|Bills|Dolphins|Patriots|Jets|Ravens|Bengals|Browns|Steelers|Texans|Colts|Jaguars|Titans|Cowboys|Giants|Eagles|Commanders|Bears|Lions|Packers|Vikings|Falcons|Panthers|Saints|Buccaneers|Cardinals|Rams|49ers)/i);
        if (teamMatch) {
            teamFolderName = teamMatch[0];
            detectedTeam = teamMatch[0];
        }
    }
    
    // Extract week
    const weekMatch = contentText.match(/\bweek\s*(\d+)\b/i) || contentText.match(/\b(\d+)\s*week/i);
    const weekNum = weekMatch ? weekMatch[1] || weekMatch[0] : '';
    
    // Extract season/year
    const seasonMatch = contentText.match(/\b(20\d{2})\b/);
    const season = seasonMatch ? seasonMatch[1] : '';
    
    // Auto-detect report type
    let reportType = 'other';
    if (lowerContent.includes('injury') || lowerContent.includes('injured')) {
        reportType = 'injury';
    } else if (lowerContent.includes('betting') || lowerContent.includes('odds') || lowerContent.includes('spread')) {
        reportType = 'betting';
    } else if (lowerContent.includes('schedule') || lowerContent.includes('game time') || lowerContent.includes('kickoff')) {
        reportType = 'schedule';
    } else if (lowerContent.includes('stat') || lowerContent.includes('yard') || lowerContent.includes('touchdown') || lowerContent.includes('passing') || lowerContent.includes('rushing')) {
        reportType = 'stats';
    } else if (lowerContent.includes('analysis') || lowerContent.includes('compare') || lowerContent.includes('prediction')) {
        reportType = 'analysis';
    }
    
    // Auto-generate title (same format as Python app)
    let autoTitle = '';
    if (reportType === 'injury' && teamFolderName) {
        if (weekNum && season) {
            autoTitle = `${teamFolderName} Injury Report - Week ${weekNum} (${season})`;
        } else if (weekNum) {
            autoTitle = `${teamFolderName} Injury Report - Week ${weekNum}`;
        } else if (season) {
            autoTitle = `${teamFolderName} Injury Report (${season})`;
        } else {
            autoTitle = `${teamFolderName} Injury Report`;
        }
    } else if (teamFolderName) {
        const typeName = reportType.charAt(0).toUpperCase() + reportType.slice(1);
        if (weekNum && season) {
            autoTitle = `${teamFolderName} ${typeName} - Week ${weekNum} (${season})`;
        } else if (weekNum) {
            autoTitle = `${teamFolderName} ${typeName} - Week ${weekNum}`;
        } else if (season) {
            autoTitle = `${teamFolderName} ${typeName} (${season})`;
        } else {
            autoTitle = `${teamFolderName} ${typeName}`;
        }
    } else {
        // Fallback title
        const typeName = reportType.charAt(0).toUpperCase() + reportType.slice(1);
        autoTitle = `NFL ${typeName} Report`;
    }
    
    // Populate form fields
    document.getElementById('reportTitle').value = autoTitle;
    document.getElementById('reportType').value = reportType;
    if (detectedTeam) {
        document.getElementById('reportTeam').value = teamFolderName;
    }
    if (weekNum) {
        document.getElementById('reportWeek').value = weekNum;
    }
    if (season) {
        document.getElementById('reportSeason').value = season;
    }
    
    document.getElementById('saveReportModal').classList.remove('hidden');
    
    // Update info text based on GitHub token availability
    const infoText = document.getElementById('saveReportInfo');
    if (infoText) {
        if (appState.githubToken) {
            infoText.textContent = '💡 You\'ll be able to choose where to save the file on your device. The report will also be saved to GitHub for cross-device access.';
        } else {
            infoText.textContent = '💡 You\'ll be able to choose where to save the file on your device.';
        }
    }
}

function closeSaveReportModal() {
    document.getElementById('saveReportModal').classList.add('hidden');
    document.getElementById('saveReportForm').reset();
    appState.currentReportContent = null;
}

async function saveReport() {
    const title = document.getElementById('reportTitle').value.trim();
    const type = document.getElementById('reportType').value;
    const team = document.getElementById('reportTeam').value.trim();
    const week = document.getElementById('reportWeek').value.trim();
    const season = document.getElementById('reportSeason').value.trim();
    const content = appState.currentReportContent;
    
    if (!title || !content) {
        alert('Please provide a title and content');
        return;
    }
    
    try {
        // Build report header (similar to Python app)
        const timestamp = new Date().toISOString();
        const dateStr = new Date().toLocaleString();
        
        let header = '='.repeat(80) + '\n';
        header += `${type.toUpperCase()} REPORT\n`;
        header += '='.repeat(80) + '\n';
        if (team) {
            header += `Team: ${team}\n`;
        }
        if (week) {
            header += `Week: ${week}\n`;
        }
        if (season) {
            header += `Season: ${season}\n`;
        }
        if (week && season) {
            header += `Report Date: Week ${week}, ${season}\n`;
        }
        header += `Generated: ${dateStr}\n`;
        header += '='.repeat(80) + '\n\n';
        
        const fullContent = header + content + '\n\n';
        
        // Generate filename (similar to Python app format)
        let filename = '';
        const teamFolderName = team || 'NFL';
        const weekNum = week ? week.replace(/[^\d]/g, '') : '';
        const yearSuffix = season ? (season.length === 4 ? season.slice(-2) : season) : '';
        
        if (type === 'injury') {
            if (weekNum && yearSuffix) {
                filename = `${teamFolderName} injury week ${weekNum}-${yearSuffix}.txt`;
            } else if (weekNum) {
                filename = `${teamFolderName} injury week ${weekNum}.txt`;
            } else if (yearSuffix) {
                filename = `${teamFolderName} injury ${yearSuffix}.txt`;
            } else {
                const timestampShort = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
                filename = `${teamFolderName} injury ${timestampShort}.txt`;
            }
        } else {
            const typeName = type.charAt(0).toUpperCase() + type.slice(1);
            if (weekNum && yearSuffix) {
                filename = `${teamFolderName} ${typeName} week ${weekNum}-${yearSuffix}.txt`;
            } else if (weekNum) {
                filename = `${teamFolderName} ${typeName} week ${weekNum}.txt`;
            } else if (yearSuffix) {
                filename = `${teamFolderName} ${typeName} ${yearSuffix}.txt`;
            } else {
                filename = `${teamFolderName} ${typeName} ${new Date().toISOString().slice(0, 10)}.txt`;
            }
        }
        
        // Clean filename (remove invalid characters)
        filename = filename.replace(/[<>:"/\\|?*]/g, '_');
        
        // Try to use File System Access API (Chrome/Edge)
        if ('showSaveFilePicker' in window) {
            try {
                const fileHandle = await window.showSaveFilePicker({
                    suggestedName: filename,
                    types: [{
                        description: 'Text Files',
                        accept: { 'text/plain': ['.txt'] }
                    }]
                });
                
                const writable = await fileHandle.createWritable();
                await writable.write(fullContent);
                await writable.close();
                
                alert(`Report "${title}" saved successfully to your device!`);
                closeSaveReportModal();
                
                // Also save to GitHub if token is available (for cross-device sync)
                if (appState.githubToken) {
                    saveReportToGitHubAsync(title, type, team, week, season, content, timestamp);
                }
                return;
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('File System Access API error:', error);
                    // Fall through to download method
                } else {
                    // User cancelled
                    return;
                }
            }
        }
        
        // Fallback: Use download method (all browsers)
        const blob = new Blob([fullContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert(`Report "${title}" downloaded successfully!`);
        closeSaveReportModal();
        
        // Also save to GitHub if token is available (for cross-device sync)
        if (appState.githubToken) {
            saveReportToGitHubAsync(title, type, team, week, season, content, timestamp);
        }
        
    } catch (error) {
        console.error('Save report error:', error);
        alert(`Failed to save report: ${error.message}. Check console for details.`);
    }
}

// Async function to save to GitHub in background (non-blocking)
async function saveReportToGitHubAsync(title, type, team, week, season, content, timestamp) {
    try {
        const reportData = {
            title: title,
            type: type,
            team: team || null,
            week: week || null,
            season: season || null,
            content: content,
            savedAt: timestamp,
            id: Date.now().toString()
        };
        
        // Load existing reports
        let reports = [];
        if (appState.reportsGistId) {
            const existing = await loadReportsFromGitHub();
            if (existing && Array.isArray(existing)) {
                reports = existing;
            }
        }
        
        // Add new report
        reports.push(reportData);
        
        // Save to GitHub
        const saved = await saveReportsToGitHub(reports);
        if (saved) {
            appState.savedReports = reports;
            console.log('Report also saved to GitHub for cross-device sync');
        }
    } catch (error) {
        console.warn('Could not save to GitHub (non-critical):', error);
    }
}

async function saveReportsToGitHub(reports) {
    if (!appState.githubToken) {
        console.error('GitHub token not available');
        return false;
    }
    
    try {
        const gistData = {
            description: 'NFL Analytics Agent - Saved Reports',
            public: false,
            files: {
                'reports.json': {
                    content: JSON.stringify(reports, null, 2)
                }
            }
        };
        
        const url = appState.reportsGistId 
            ? `${GITHUB_CONFIG.API_BASE}/gists/${appState.reportsGistId}`
            : `${GITHUB_CONFIG.API_BASE}/gists`;
        
        const method = appState.reportsGistId ? 'PATCH' : 'POST';
        const authHeader = appState.githubToken.startsWith('ghp_') || appState.githubToken.startsWith('github_pat_') 
            ? `token ${appState.githubToken}` 
            : `Bearer ${appState.githubToken}`;
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Authorization': authHeader,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gistData)
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData.message || `HTTP ${response.status}: ${response.statusText}`;
            console.error('GitHub API error:', errorMessage, errorData);
            throw new Error(errorMessage);
        }
        
        const result = await response.json();
        appState.reportsGistId = result.id;
        localStorage.setItem('nflAgentReportsGistId', result.id);
        console.log('Reports saved to GitHub Gist:', result.html_url);
        return true;
    } catch (error) {
        console.error('Error saving reports to GitHub:', error);
        throw error; // Re-throw to be caught by caller
    }
}

async function loadReportsFromGitHub() {
    if (!appState.githubToken || !appState.reportsGistId) {
        return null;
    }
    
    try {
        const authHeader = appState.githubToken.startsWith('ghp_') || appState.githubToken.startsWith('github_pat_') 
            ? `token ${appState.githubToken}` 
            : `Bearer ${appState.githubToken}`;
        
        const response = await fetch(`${GITHUB_CONFIG.API_BASE}/gists/${appState.reportsGistId}`, {
            headers: {
                'Authorization': authHeader,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('GitHub API error loading reports:', errorData.message || response.statusText);
            return null;
        }
        
        const gist = await response.json();
        const file = gist.files['reports.json'];
        if (file) {
            const contentResponse = await fetch(file.raw_url);
            if (!contentResponse.ok) {
                console.error('Failed to fetch Gist content');
                return null;
            }
            const text = await contentResponse.text();
            try {
                const data = JSON.parse(text);
                return Array.isArray(data) ? data : [];
            } catch (parseError) {
                console.error('Error parsing reports JSON:', parseError);
                return null;
            }
        }
    } catch (error) {
        console.error('Error loading reports from GitHub:', error);
    }
    return null;
}

function openSavedReportsModal() {
    document.getElementById('savedReportsModal').classList.remove('hidden');
    displaySavedReports();
}

function closeSavedReportsModal() {
    document.getElementById('savedReportsModal').classList.add('hidden');
}

async function displaySavedReports() {
    const listContainer = document.getElementById('savedReportsList');
    listContainer.innerHTML = '<p class="info-text">Loading saved reports...</p>';
    
    // Load reports
    if (!appState.savedReports.length && appState.reportsGistId) {
        const reports = await loadReportsFromGitHub();
        if (reports) {
            appState.savedReports = reports;
        }
    }
    
    if (!appState.savedReports.length) {
        listContainer.innerHTML = '<p class="info-text">No saved reports yet. Save a report using the 💾 button on any response.</p>';
        return;
    }
    
    // Sort by date (newest first)
    const sortedReports = [...appState.savedReports].sort((a, b) => 
        new Date(b.savedAt) - new Date(a.savedAt)
    );
    
    let html = '<div class="reports-grid">';
    sortedReports.forEach(report => {
        const date = new Date(report.savedAt).toLocaleString();
        const typeIcon = {
            'injury': '🏥',
            'stats': '📊',
            'betting': '💰',
            'schedule': '📅',
            'analysis': '📈',
            'other': '📄'
        }[report.type] || '📄';
        
        html += `
            <div class="report-card">
                <div class="report-header">
                    <span class="report-icon">${typeIcon}</span>
                    <h3>${escapeHtml(report.title)}</h3>
                </div>
                <div class="report-meta">
                    <span class="report-type">${report.type}</span>
                    ${report.team ? `<span class="report-team">${escapeHtml(report.team)}</span>` : ''}
                    ${report.week ? `<span class="report-week">Week ${escapeHtml(report.week)}</span>` : ''}
                    ${report.season ? `<span class="report-season">${escapeHtml(report.season)}</span>` : ''}
                </div>
                <div class="report-date">${date}</div>
                <div class="report-actions">
                    <button class="btn btn-small" onclick="viewReport('${report.id}')">View</button>
                    <button class="btn btn-small" onclick="downloadReport('${report.id}')">Download</button>
                    <button class="btn btn-small btn-danger" onclick="deleteReport('${report.id}')">Delete</button>
                </div>
            </div>
        `;
    });
    html += '</div>';
    
    listContainer.innerHTML = html;
}

function viewReport(reportId) {
    const report = appState.savedReports.find(r => r.id === reportId);
    if (!report) return;
    
    // Create a modal to display the report
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 900px; max-height: 90vh; overflow-y: auto;">
            <h2>${escapeHtml(report.title)}</h2>
            <div class="report-view-meta">
                <span>Type: ${report.type}</span>
                ${report.team ? `<span>Team: ${escapeHtml(report.team)}</span>` : ''}
                ${report.week ? `<span>Week: ${escapeHtml(report.week)}</span>` : ''}
                ${report.season ? `<span>Season: ${escapeHtml(report.season)}</span>` : ''}
                <span>Saved: ${new Date(report.savedAt).toLocaleString()}</span>
            </div>
            <div class="report-view-content">${formatResponse(report.content)}</div>
            <div class="button-group" style="margin-top: 20px;">
                <button class="btn btn-primary" onclick="downloadReport('${report.id}')">Download</button>
                <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function downloadReport(reportId) {
    const report = appState.savedReports.find(r => r.id === reportId);
    if (!report) return;
    
    const header = '='.repeat(80) + '\n';
    const headerContent = `NFL ANALYTICS AGENT - ${report.title.toUpperCase()}\n`;
    const headerLine = '='.repeat(80) + '\n';
    const meta = `Type: ${report.type}\n` +
        (report.team ? `Team: ${report.team}\n` : '') +
        (report.week ? `Week: ${report.week}\n` : '') +
        (report.season ? `Season: ${report.season}\n` : '') +
        `Saved: ${new Date(report.savedAt).toLocaleString()}\n` +
        '='.repeat(80) + '\n\n';
    
    const content = header + headerContent + headerLine + meta + report.content;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.title.replace(/[^a-z0-9]/gi, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

async function deleteReport(reportId) {
    if (!confirm('Are you sure you want to delete this report?')) {
        return;
    }
    
    appState.savedReports = appState.savedReports.filter(r => r.id !== reportId);
    await saveReportsToGitHub(appState.savedReports);
    displaySavedReports();
}

// Make functions globally available
window.openSaveReportModal = openSaveReportModal;
window.closeSaveReportModal = closeSaveReportModal;
window.saveCurrentReport = saveCurrentReport;
window.viewReport = viewReport;
window.downloadReport = downloadReport;
window.deleteReport = deleteReport;

// ============================================================================
// Export Functionality
// ============================================================================

function openExportModal() {
    document.getElementById('exportModal').classList.remove('hidden');
}

function closeExportModal() {
    document.getElementById('exportModal').classList.add('hidden');
}

function exportData(format) {
    let content = '';
    let filename = '';
    let mimeType = '';
    
    if (format === 'txt') {
        content = 'NFL Analytics Agent - Conversation History\n\n';
        appState.conversationHistory.forEach((msg, idx) => {
            if (msg.role === 'user') {
                content += `\n[Query ${Math.floor(idx/2) + 1}]\n${msg.content}\n\n`;
            } else {
                content += `[Response]\n${msg.content}\n\n${'='.repeat(70)}\n`;
            }
        });
        filename = 'nfl_agent_conversation.txt';
        mimeType = 'text/plain';
    } else if (format === 'json') {
        content = JSON.stringify({
            history: appState.conversationHistory,
            exported: new Date().toISOString()
        }, null, 2);
        filename = 'nfl_agent_conversation.json';
        mimeType = 'application/json';
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    closeExportModal();
}

// ============================================================================
// Initialize Application
// ============================================================================

async function initializeApp() {
    // Load API keys
    if (typeof API_KEYS !== 'undefined') {
        appState.githubToken = API_KEYS.github;
        console.log('API keys loaded');
    }
    
    // Load conversation history from GitHub
    if (appState.githubToken) {
        const savedGistId = localStorage.getItem('nflAgentGistId');
        if (savedGistId) {
            appState.gistId = savedGistId;
            const savedData = await loadFromGitHub();
            if (savedData && savedData.history) {
                appState.conversationHistory = savedData.history;
                // Display saved history
                savedData.history.forEach(msg => {
                    if (msg.role === 'user') {
                        addToResults(msg.content, true);
                    } else {
                        addToResults(msg.content, false);
                    }
                });
            }
        }
        
        // Load saved reports
        const reportsGistId = localStorage.getItem('nflAgentReportsGistId');
        if (reportsGistId) {
            appState.reportsGistId = reportsGistId;
            try {
                const reports = await loadReportsFromGitHub();
                if (reports && Array.isArray(reports)) {
                    appState.savedReports = reports;
                }
            } catch (error) {
                console.warn('Could not load saved reports:', error);
            }
        }
    }
    
    // Setup event listeners
    document.getElementById('sendBtn').addEventListener('click', () => {
        const query = document.getElementById('queryInput').value.trim();
        if (query) {
            executeQuery(query);
            document.getElementById('queryInput').value = '';
        }
    });
    
    document.getElementById('queryInput').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            document.getElementById('sendBtn').click();
        }
    });
    
    document.getElementById('clearBtn').addEventListener('click', () => {
        if (confirm('Clear all conversation history?')) {
            appState.conversationHistory = [];
            document.getElementById('resultsContainer').innerHTML = `
                <div class="welcome-message">
                    <h2>Welcome to NFL Analytics Agent</h2>
                    <p>Ask me anything about the NFL - player stats, team comparisons, injury reports, betting odds, game schedules, and more!</p>
                </div>
            `;
        }
    });
    
    document.getElementById('saveBtn').addEventListener('click', async () => {
        if (appState.githubToken) {
            const saved = await saveToGitHub({
                history: appState.conversationHistory,
                lastUpdated: new Date().toISOString()
            });
            if (saved && appState.gistId) {
                localStorage.setItem('nflAgentGistId', appState.gistId);
                alert('Conversation saved to GitHub!');
            } else {
                alert('Failed to save. Check console for details.');
            }
        } else {
            alert('GitHub token not configured');
        }
    });
    
    document.getElementById('exportBtn').addEventListener('click', openExportModal);
    
    document.getElementById('savedReportsBtn').addEventListener('click', openSavedReportsModal);
    
    document.getElementById('saveReportForm').addEventListener('submit', (e) => {
        e.preventDefault();
        saveReport();
    });
    
    document.querySelectorAll('.export-option').forEach(option => {
        option.addEventListener('click', () => {
            exportData(option.dataset.format);
        });
    });
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
