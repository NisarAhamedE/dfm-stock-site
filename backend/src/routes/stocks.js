const express = require('express');
const router = express.Router();
const YahooFinanceService = require('../services/yahooFinance');
const CacheService = require('../services/cacheService');

const yahooFinance = new YahooFinanceService();
const cache = new CacheService();

// Get all DFM stocks
router.get('/', async (req, res) => {
  try {
    // Check cache first
    const cachedData = await cache.get('all_stocks');
    if (cachedData) {
      return res.json({
        success: true,
        data: cachedData,
        message: 'Stocks retrieved from cache',
        timestamp: new Date().toISOString(),
        cached: true
      });
    }

    // Fetch data from Yahoo Finance
    const stocksData = await yahooFinance.getAllDFMStocks();
    
    // Cache the data for 5 minutes
    await cache.set('all_stocks', stocksData, 300);
    
    res.json({
      success: true,
      data: stocksData,
      message: 'Stocks retrieved successfully',
      timestamp: new Date().toISOString(),
      cached: false
    });
  } catch (error) {
    console.error('Error fetching stocks:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'FETCH_ERROR',
        message: 'Failed to fetch stock data',
        details: error.message
      },
      timestamp: new Date().toISOString()
    });
  }
});

// Search stocks
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_QUERY',
          message: 'Search query is required'
        },
        timestamp: new Date().toISOString()
      });
    }

    const query = q.trim();

    // Check cache first
    const cacheKey = `search_${query.toLowerCase()}`;
    const cachedData = await cache.get(cacheKey);
    if (cachedData) {
      return res.json({
        success: true,
        data: cachedData,
        message: 'Search results from cache',
        timestamp: new Date().toISOString(),
        cached: true
      });
    }

    // Search Yahoo Finance
    const searchResults = await yahooFinance.searchStocks(query);
    
    // Cache the results for 10 minutes
    await cache.set(cacheKey, searchResults, 600);
    
    res.json({
      success: true,
      data: searchResults,
      message: 'Search completed successfully',
      timestamp: new Date().toISOString(),
      cached: false
    });
  } catch (error) {
    console.error('Error searching stocks:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'SEARCH_ERROR',
        message: 'Failed to search stocks',
        details: error.message
      },
      timestamp: new Date().toISOString()
    });
  }
});

// Get single stock
router.get('/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    
    if (!symbol || symbol.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_SYMBOL',
          message: 'Stock symbol is required'
        },
        timestamp: new Date().toISOString()
      });
    }

    const stockSymbol = symbol.trim().toUpperCase();

    // Check cache first
    const cacheKey = `stock_${stockSymbol}`;
    const cachedData = await cache.get(cacheKey);
    if (cachedData) {
      return res.json({
        success: true,
        data: cachedData,
        message: 'Stock data from cache',
        timestamp: new Date().toISOString(),
        cached: true
      });
    }

    // Fetch from Yahoo Finance
    const stockData = await yahooFinance.getStockQuote(stockSymbol);
    
    // Cache the data for 5 minutes
    await cache.set(cacheKey, stockData, 300);
    
    res.json({
      success: true,
      data: stockData,
      message: 'Stock data retrieved successfully',
      timestamp: new Date().toISOString(),
      cached: false
    });
  } catch (error) {
    console.error('Error fetching stock:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'STOCK_FETCH_ERROR',
        message: 'Failed to fetch stock data',
        details: error.message
      },
      timestamp: new Date().toISOString()
    });
  }
});

// Get cache statistics
router.get('/cache/stats', async (req, res) => {
  try {
    const stats = cache.getStats();
    res.json({
      success: true,
      data: stats,
      message: 'Cache statistics retrieved',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting cache stats:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'CACHE_STATS_ERROR',
        message: 'Failed to get cache statistics',
        details: error.message
      },
      timestamp: new Date().toISOString()
    });
  }
});

// Clear cache
router.delete('/cache/clear', async (req, res) => {
  try {
    cache.clear();
    res.json({
      success: true,
      message: 'Cache cleared successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error clearing cache:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'CACHE_CLEAR_ERROR',
        message: 'Failed to clear cache',
        details: error.message
      },
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router; 