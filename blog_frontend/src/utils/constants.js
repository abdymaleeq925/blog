const rawApiUrl = window.location.hostname === 'localhost' 
    ? 'http://localhost:4444' 
    : (process.env.REACT_APP_BLOG_API_URL || 'https://blog-backend-m5ss.onrender.com');

// Ensure no trailing slash
export const API_URL = rawApiUrl.endsWith('/') ? rawApiUrl.slice(0, -1) : rawApiUrl;