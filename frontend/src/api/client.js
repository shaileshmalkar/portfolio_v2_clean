import axios from 'axios';

// Determine base URL based on environment
const getBaseURL = () => {
  // In production (Vercel), use relative path
  if (import.meta.env.PROD) {
    return '/api';
  }
  // In development, use local backend
  return 'http://127.0.0.1:8000/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 15000, // Increased timeout for Vercel
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    const fullUrl = `${config.baseURL}${config.url}`;
    console.log('API Request:', config.method?.toUpperCase(), fullUrl);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message;
    const errorDetails = error.response?.data || {};
    
    console.error('API Error Details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      message: errorMessage,
      data: errorDetails
    });
    
    return Promise.reject(error);
  }
);

export default api;
