import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`Received response from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    if (error.response) {
      // Server responded with error status
      console.error('Error response:', error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
    } else {
      // Something else happened
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

export const stocksAPI = {
  // Get all stocks
  getAllStocks: async () => {
    try {
      const response = await api.get('/stocks');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching stocks:', error);
      throw new Error(error.response?.data?.error?.message || 'Failed to fetch stocks');
    }
  },

  // Search stocks
  searchStocks: async (query: string) => {
    try {
      const response = await api.get(`/stocks/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error: any) {
      console.error('Error searching stocks:', error);
      throw new Error(error.response?.data?.error?.message || 'Failed to search stocks');
    }
  },

  // Get single stock
  getStock: async (symbol: string) => {
    try {
      const response = await api.get(`/stocks/${symbol}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching stock:', error);
      throw new Error(error.response?.data?.error?.message || 'Failed to fetch stock');
    }
  },

  // Get cache statistics
  getCacheStats: async () => {
    try {
      const response = await api.get('/stocks/cache/stats');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching cache stats:', error);
      throw new Error(error.response?.data?.error?.message || 'Failed to fetch cache statistics');
    }
  },

  // Clear cache
  clearCache: async () => {
    try {
      const response = await api.delete('/stocks/cache/clear');
      return response.data;
    } catch (error: any) {
      console.error('Error clearing cache:', error);
      throw new Error(error.response?.data?.error?.message || 'Failed to clear cache');
    }
  }
};

export default api; 