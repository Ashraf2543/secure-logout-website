/**
 * Analytics initialization
 * Google Analytics 4 + Hotjar tracking
 */

// Configuration
const ANALYTICS_CONFIG = {
    ga4MeasurementId: 'G-XXXXXXXXXX', // Replace with your GA4 ID
    hotjarId: 0000000, // Replace with your Hotjar ID
    hotjarSnippetVersion: 6
};

// Initialize analytics
function initAnalytics() {
    if (typeof window !== 'undefined') {
        initGA4();
        initHotjar();
        trackPageView();
    }
}

// Google Analytics 4
function initGA4() {
    if (!ANALYTICS_CONFIG.ga4MeasurementId) return;
    
    // Load gtag.js if not already loaded
    if (!window.gtag) {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.ga4MeasurementId}`;
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        window.gtag = function() {
            dataLayer.push(arguments);
        };
        
        gtag('js', new Date());
        gtag('config', ANALYTICS_CONFIG.ga4MeasurementId, {
            anonymize_ip: true,
            allow_google_signals: false,
            allow_ad_personalization_signals: false
        });
    }
}

// Hotjar
function initHotjar() {
    if (!ANALYTICS_CONFIG.hotjarId) return;
    
    // Only load in production
    if (window.location.hostname !== 'securelogout.netlify.app') return;
    
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:ANALYTICS_CONFIG.hotjarId,
                      hjsv:ANALYTICS_CONFIG.hotjarSnippetVersion};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
}

// Track page view
function trackPageView() {
    if (window.gtag) {
        gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname
        });
    }
    
    if (window.hj) {
        hj('stateChange', document.title);
    }
}

// Track custom events
function trackEvent(eventName, eventData = {}) {
    if (window.gtag) {
        gtag('event', eventName, eventData);
    }
    
    if (window.hj) {
        hj('event', eventName, eventData);
    }
}

// Export for module bundlers
export { initAnalytics, trackEvent };