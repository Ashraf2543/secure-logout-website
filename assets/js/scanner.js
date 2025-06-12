/**
 * Browser scan simulation
 * Mock functionality for demo purposes
 */

const scanButton = document.getElementById('scan-btn');
const resultsContainer = document.getElementById('scan-results');

if (scanButton && resultsContainer) {
    scanButton.addEventListener('click', simulateBrowserScan);
}

// Mock scan function
function simulateBrowserScan() {
    // Show loading state
    scanButton.classList.add('loading');
    scanButton.disabled = true;
    
    // Clear previous results
    resultsContainer.innerHTML = '';
    resultsContainer.style.display = 'none';
    
    // Simulate API call delay
    setTimeout(() => {
        // Mock data - in real app this would come from extension API
        const mockSessions = [
            { id: 1, name: 'Google', domain: 'google.com', active: true },
            { id: 2, name: 'Facebook', domain: 'facebook.com', active: true },
            { id: 3, name: 'Twitter', domain: 'twitter.com', active: false }
        ];
        
        renderScanResults(mockSessions);
        
        // Reset button state
        scanButton.classList.remove('loading');
        scanButton.disabled = false;
    }, 1500);
}

// Render results to DOM
function renderScanResults(sessions) {
    if (!sessions.length) {
        resultsContainer.innerHTML = `
            <div class="scan-result scan-result--empty">
                No active sessions found
            </div>
        `;
        resultsContainer.style.display = 'block';
        return;
    }
    
    const activeSessions = sessions.filter(session => session.active);
    
    if (activeSessions.length === 0) {
        resultsContainer.innerHTML = `
            <div class="scan-result scan-result--safe">
                No active login sessions detected
            </div>
        `;
    } else {
        let resultsHTML = `
            <div class="scan-result scan-result--warning">
                <h3 class="scan-result__title">
                    ${activeSessions.length} active session${activeSessions.length > 1 ? 's' : ''} detected
                </h3>
                <ul class="scan-result__list">
        `;
        
        activeSessions.forEach(session => {
            resultsHTML += `
                <li class="scan-result__item">
                    <span class="scan-result__icon">${session.name.charAt(0)}</span>
                    <span class="scan-result__name">${session.name}</span>
                    <a href="https://${session.domain}/logout" target="_blank" class="scan-result__action">
                        Log out
                    </a>
                </li>
            `;
        });
        
        resultsHTML += `
                </ul>
                <p class="scan-result__hint">
                    Install the extension to log out from all sites with one click
                </p>
            </div>
        `;
        
        resultsContainer.innerHTML = resultsHTML;
    }
    
    resultsContainer.style.display = 'block';
    
    // Animate results appearance
    setTimeout(() => {
        resultsContainer.style.opacity = '1';
        resultsContainer.style.transform = 'translateY(0)';
    }, 10);
}

// Export for testing or module bundlers
export { simulateBrowserScan, renderScanResults };