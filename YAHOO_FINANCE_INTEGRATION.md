# Yahoo Finance API Integration Guide

## 📋 Overview

This guide outlines how to integrate Yahoo Finance API to fetch real-time stock data for DFM (Dubai Financial Market) stocks instead of using hardcoded data.

## 🎯 Yahoo Finance API Benefits

### ✅ **Real-time Data**
- Live stock prices and market data
- Real-time volume and market cap updates
- Current change percentages and price movements

### ✅ **Comprehensive Coverage**
- All major DFM stocks available
- Historical data for charts
- Financial metrics and ratios

### ✅ **Reliable & Free**
- No API key required for basic usage
- High rate limits
- Stable and well-maintained

## 🔧 Yahoo Finance API Integration

### 1. API Endpoints

#### 1.1 Stock Quote Endpoint
```javascript
// Get current stock data
GET https://query1.finance.yahoo.com/v8/finance/chart/{SYMBOL}.AD

// Example for EMAAR stock
GET https://query1.finance.yahoo.com/v8/finance/chart/EMAAR.AD
```

#### 1.2 Search Endpoint
```javascript
// Search for stocks
GET https://query1.finance.yahoo.com/v1/finance/search?q={SEARCH_TERM}

// Example
GET https://query1.finance.yahoo.com/v1/finance/search?q=EMAAR
```

#### 1.3 Multiple Stocks Endpoint
```javascript
// Get data for multiple stocks
GET https://query1.finance.yahoo.com/v8/finance/chart/{SYMBOL1}.AD,{SYMBOL2}.AD,{SYMBOL3}.AD

// Example
GET https://query1.finance.yahoo.com/v8/finance/chart/EMAAR.AD,DU.AD,ENBD.AD
```

### 2. DFM Stock Symbols

#### 2.1 Major DFM Stocks
```javascript
const dfmStocks = [
  { symbol: 'EMAAR', name: 'Emaar Properties PJSC' },
  { symbol: 'DU', name: 'Emirates Integrated Telecommunications Company PJSC' },
  { symbol: 'ENBD', name: 'Emirates NBD Bank PJSC' },
  { symbol: 'DEWA', name: 'Dubai Electricity and Water Authority PJSC' },
  { symbol: 'SALIK', name: 'Salik Company PJSC' },
  { symbol: 'AMLAK', name: 'Amlak Finance PJSC' },
  { symbol: 'ARTC', name: 'Arabtec Holding PJSC' },
  { symbol: 'DAMAC', name: 'DAMAC Properties Dubai Co PJSC' },
  { symbol: 'DFM', name: 'Dubai Financial Market PJSC' },
  { symbol: 'GULFNAV', name: 'Gulf Navigation Holding PJSC' },
  { symbol: 'SHUAA', name: 'SHUAA Capital PSC' },
  { symbol: 'TECOM', name: 'TECOM Group PJSC' },
  { symbol: 'UPP', name: 'Union Properties PJSC' },
  { symbol: 'WASL', name: 'Wasl Asset Management Group' }
];
```

#### 2.2 Symbol Format
- **Yahoo Finance Format**: `{SYMBOL}.AD` (AD = Abu Dhabi/Dubai)
- **Example**: `EMAAR.AD`, `DU.AD`, `ENBD.AD`

### 3. API Response Structure

#### 3.1 Stock Quote Response
```javascript
{
  "chart": {
    "result": [
      {
        "meta": {
          "currency": "AED",
          "symbol": "EMAAR.AD",
          "exchangeName": "DFM",
          "instrumentInfo": {
            "symbol": "EMAAR.AD",
            "shortName": "Emaar Properties PJSC"
          },
          "regularMarketPrice": 4.25,
          "previousClose": 4.17,
          "regularMarketVolume": 1200000,
          "marketCap": 15200000000
        },
        "timestamp": [1640995200, 1641081600, ...],
        "indicators": {
          "quote": [
            {
              "open": [4.20, 4.25, ...],
              "high": [4.30, 4.28, ...],
              "low": [4.15, 4.22, ...],
              "close": [4.25, 4.26, ...],
              "volume": [1200000, 1100000, ...]
            }
          ]
        }
      }
    ]
  }
}
```

### 4. Backend Implementation

#### 4.1 Yahoo Finance Service
```javascript
// services/yahooFinance.js
const axios = require('axios');
const redis = require('redis');

class YahooFinanceService {
  constructor() {
    this.baseUrl = 'https://query1.finance.yahoo.com';
    this.cache = redis.createClient();
  }

  // Get single stock data
  async getStockQuote(symbol) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/v8/finance/chart/${symbol}.AD`
      );
      
      const result = response.data.chart.result[0];
      const meta = result.meta;
      
      return {
        symbol: symbol,
        name: meta.instrumentInfo.shortName,
        currentPrice: meta.regularMarketPrice,
        previousClose: meta.previousClose,
        change: meta.regularMarketPrice - meta.previousClose,
        changePercent: ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose) * 100,
        volume: meta.regularMarketVolume,
        marketCap: meta.marketCap,
        lastUpdated: new Date(),
        currency: meta.currency
      };
    } catch (error) {
      console.error(`Error fetching ${symbol}:`, error.message);
      throw error;
    }
  }

  // Get multiple stocks data
  async getMultipleStocks(symbols) {
    try {
      const symbolsString = symbols.map(s => `${s}.AD`).join(',');
      const response = await axios.get(
        `${this.baseUrl}/v8/finance/chart/${symbolsString}`
      );
      
      return response.data.chart.result.map(result => {
        const meta = result.meta;
        return {
          symbol: meta.symbol.replace('.AD', ''),
          name: meta.instrumentInfo.shortName,
          currentPrice: meta.regularMarketPrice,
          previousClose: meta.previousClose,
          change: meta.regularMarketPrice - meta.previousClose,
          changePercent: ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose) * 100,
          volume: meta.regularMarketVolume,
          marketCap: meta.marketCap,
          lastUpdated: new Date(),
          currency: meta.currency
        };
      });
    } catch (error) {
      console.error('Error fetching multiple stocks:', error.message);
      throw error;
    }
  }

  // Search stocks
  async searchStocks(query) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/v1/finance/search?q=${encodeURIComponent(query)}`
      );
      
      return response.data.quotes
        .filter(quote => quote.exchange === 'DFM')
        .map(quote => ({
          symbol: quote.symbol.replace('.AD', ''),
          name: quote.shortname,
          exchange: quote.exchange
        }));
    } catch (error) {
      console.error('Error searching stocks:', error.message);
      throw error;
    }
  }
}

module.exports = YahooFinanceService;
```

#### 4.2 Caching Implementation
```javascript
// services/cacheService.js
const redis = require('redis');

class CacheService {
  constructor() {
    this.client = redis.createClient();
    this.defaultTTL = 300; // 5 minutes
  }

  async get(key) {
    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  async set(key, value, ttl = this.defaultTTL) {
    try {
      await this.client.setex(key, ttl, JSON.stringify(value));
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  async del(key) {
    try {
      await this.client.del(key);
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }
}

module.exports = CacheService;
```

#### 4.3 Updated Stock Routes
```javascript
// routes/stocks.js
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
    const cachedData = await cache.get('dfm_stocks');
    if (cachedData) {
      return res.json({
        success: true,
        data: cachedData,
        message: 'Stocks retrieved from cache',
        timestamp: new Date().toISOString()
      });
    }

    // Define DFM stocks
    const dfmStocks = [
      'EMAAR', 'DU', 'ENBD', 'DEWA', 'SALIK', 'AMLAK', 
      'ARTC', 'DAMAC', 'DFM', 'GULFNAV', 'SHUAA', 'TECOM', 'UPP'
    ];

    // Fetch data from Yahoo Finance
    const stocksData = await yahooFinance.getMultipleStocks(dfmStocks);
    
    // Cache the data
    await cache.set('dfm_stocks', stocksData);
    
    res.json({
      success: true,
      data: stocksData,
      message: 'Stocks retrieved successfully',
      timestamp: new Date().toISOString()
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
    
    if (!q) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_QUERY',
          message: 'Search query is required'
        }
      });
    }

    // Check cache first
    const cacheKey = `search_${q.toLowerCase()}`;
    const cachedData = await cache.get(cacheKey);
    if (cachedData) {
      return res.json({
        success: true,
        data: cachedData,
        message: 'Search results from cache',
        timestamp: new Date().toISOString()
      });
    }

    // Search Yahoo Finance
    const searchResults = await yahooFinance.searchStocks(q);
    
    // Cache the results
    await cache.set(cacheKey, searchResults, 600); // 10 minutes
    
    res.json({
      success: true,
      data: searchResults,
      message: 'Search completed successfully',
      timestamp: new Date().toISOString()
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
    
    // Check cache first
    const cacheKey = `stock_${symbol.toUpperCase()}`;
    const cachedData = await cache.get(cacheKey);
    if (cachedData) {
      return res.json({
        success: true,
        data: cachedData,
        message: 'Stock data from cache',
        timestamp: new Date().toISOString()
      });
    }

    // Fetch from Yahoo Finance
    const stockData = await yahooFinance.getStockQuote(symbol.toUpperCase());
    
    // Cache the data
    await cache.set(cacheKey, stockData);
    
    res.json({
      success: true,
      data: stockData,
      message: 'Stock data retrieved successfully',
      timestamp: new Date().toISOString()
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

module.exports = router;
```

### 5. Frontend Integration

#### 5.1 API Service
```javascript
// services/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const stocksAPI = {
  // Get all stocks
  getAllStocks: async () => {
    try {
      const response = await api.get('/stocks');
      return response.data;
    } catch (error) {
      console.error('Error fetching stocks:', error);
      throw error;
    }
  },

  // Search stocks
  searchStocks: async (query) => {
    try {
      const response = await api.get(`/stocks/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching stocks:', error);
      throw error;
    }
  },

  // Get single stock
  getStock: async (symbol) => {
    try {
      const response = await api.get(`/stocks/${symbol}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching stock:', error);
      throw error;
    }
  }
};
```

#### 5.2 React Hook
```javascript
// hooks/useStocks.js
import { useState, useEffect } from 'react';
import { stocksAPI } from '../services/api';

export const useStocks = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStocks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await stocksAPI.getAllStocks();
      setStocks(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const searchStocks = async (query) => {
    try {
      setLoading(true);
      setError(null);
      const response = await stocksAPI.searchStocks(query);
      setStocks(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  return {
    stocks,
    loading,
    error,
    fetchStocks,
    searchStocks
  };
};
```

### 6. Environment Configuration

#### 6.1 Backend Environment Variables
```env
# .env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dfm_stock_site
REDIS_URL=redis://localhost:6379
YAHOO_FINANCE_BASE_URL=https://query1.finance.yahoo.com
CACHE_TTL=300
```

#### 6.2 Frontend Environment Variables
```env
# .env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_REFRESH_INTERVAL=30000
```

### 7. Error Handling

#### 7.1 API Error Handling
```javascript
// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err.code === 'ECONNREFUSED') {
    return res.status(503).json({
      success: false,
      error: {
        code: 'SERVICE_UNAVAILABLE',
        message: 'Yahoo Finance service is temporarily unavailable'
      }
    });
  }

  if (err.response?.status === 404) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'STOCK_NOT_FOUND',
        message: 'Stock not found'
      }
    });
  }

  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Internal server error'
    }
  });
};

module.exports = errorHandler;
```

### 8. Performance Optimization

#### 8.1 Caching Strategy
- **Stock Data**: Cache for 5 minutes
- **Search Results**: Cache for 10 minutes
- **Individual Stocks**: Cache for 5 minutes

#### 8.2 Rate Limiting
```javascript
// middleware/rateLimiter.js
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests, please try again later'
    }
  }
});

module.exports = apiLimiter;
```

### 9. Testing

#### 9.1 API Testing
```javascript
// tests/yahooFinance.test.js
const YahooFinanceService = require('../services/yahooFinance');

describe('Yahoo Finance Service', () => {
  let yahooFinance;

  beforeEach(() => {
    yahooFinance = new YahooFinanceService();
  });

  test('should fetch EMAAR stock data', async () => {
    const stockData = await yahooFinance.getStockQuote('EMAAR');
    
    expect(stockData).toHaveProperty('symbol', 'EMAAR');
    expect(stockData).toHaveProperty('currentPrice');
    expect(stockData).toHaveProperty('change');
    expect(stockData).toHaveProperty('volume');
  });

  test('should fetch multiple stocks', async () => {
    const stocksData = await yahooFinance.getMultipleStocks(['EMAAR', 'DU']);
    
    expect(stocksData).toHaveLength(2);
    expect(stocksData[0]).toHaveProperty('symbol');
    expect(stocksData[1]).toHaveProperty('symbol');
  });
});
```

## 🚀 Implementation Steps

### Phase 1: Setup Yahoo Finance Integration
1. Install required dependencies
2. Create Yahoo Finance service
3. Implement caching with Redis
4. Set up error handling

### Phase 2: Update Backend
1. Replace hardcoded data with API calls
2. Implement search functionality
3. Add rate limiting
4. Set up monitoring

### Phase 3: Update Frontend
1. Update API service to use new endpoints
2. Implement real-time data refresh
3. Add error handling and loading states
4. Test with real data

## ✅ Benefits

- **Real-time Data**: Live stock prices and market data
- **No Hardcoding**: Dynamic data from Yahoo Finance
- **Reliable**: Professional API with high uptime
- **Scalable**: Can handle multiple stocks efficiently
- **Cached**: Optimized performance with Redis caching

This integration will provide your DFM Stock Site with real-time, accurate stock data from Yahoo Finance instead of hardcoded values. 