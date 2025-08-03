const express = require('express');
const { query, validationResult } = require('express-validator');
const Stock = require('../models/Stock');

const router = express.Router();

// Validation middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: errors.array()
    });
  }
  next();
};

// @route   GET /api/market/overview
// @desc    Get market overview and statistics
// @access  Public
router.get('/overview', async (req, res) => {
  try {
    // Get all active stocks
    const stocks = await Stock.find({ isActive: true });

    // Calculate market statistics
    const totalStocks = stocks.length;
    const totalVolume = stocks.reduce((sum, stock) => sum + (stock.volume || 0), 0);
    const totalMarketCap = stocks.reduce((sum, stock) => sum + (stock.marketCap || 0), 0);

    // Calculate gainers and losers
    const gainers = stocks.filter(stock => stock.change > 0).length;
    const losers = stocks.filter(stock => stock.change < 0).length;
    const unchanged = stocks.filter(stock => stock.change === 0).length;

    // Calculate average change
    const avgChange = stocks.reduce((sum, stock) => sum + stock.changePercent, 0) / totalStocks;

    // Get top sectors by market cap
    const sectorStats = {};
    stocks.forEach(stock => {
      if (!sectorStats[stock.sector]) {
        sectorStats[stock.sector] = {
          count: 0,
          totalMarketCap: 0,
          totalVolume: 0,
          avgChange: 0
        };
      }
      sectorStats[stock.sector].count++;
      sectorStats[stock.sector].totalMarketCap += stock.marketCap || 0;
      sectorStats[stock.sector].totalVolume += stock.volume || 0;
      sectorStats[stock.sector].avgChange += stock.changePercent;
    });

    // Calculate average change for each sector
    Object.keys(sectorStats).forEach(sector => {
      sectorStats[sector].avgChange /= sectorStats[sector].count;
    });

    // Sort sectors by market cap
    const topSectors = Object.entries(sectorStats)
      .map(([sector, stats]) => ({
        sector,
        ...stats
      }))
      .sort((a, b) => b.totalMarketCap - a.totalMarketCap)
      .slice(0, 10);

    const marketOverview = {
      totalStocks,
      totalVolume,
      totalMarketCap,
      gainers,
      losers,
      unchanged,
      avgChange: parseFloat(avgChange.toFixed(2)),
      topSectors,
      lastUpdated: new Date().toISOString()
    };

    res.json({
      success: true,
      data: marketOverview
    });

  } catch (error) {
    console.error('Market overview error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching market overview'
    });
  }
});

// @route   GET /api/market/indices
// @desc    Get market indices performance
// @access  Public
router.get('/indices', async (req, res) => {
  try {
    // This would typically fetch from an external API
    // For now, we'll create mock data based on our stocks
    const stocks = await Stock.find({ isActive: true });

    // Calculate DFM General Index (mock)
    const totalMarketCap = stocks.reduce((sum, stock) => sum + (stock.marketCap || 0), 0);
    const avgChange = stocks.reduce((sum, stock) => sum + stock.changePercent, 0) / stocks.length;

    const indices = [
      {
        name: 'DFM General Index',
        symbol: 'DFMGI',
        value: 3500.25,
        change: 45.67,
        changePercent: parseFloat(avgChange.toFixed(2)),
        volume: stocks.reduce((sum, stock) => sum + (stock.volume || 0), 0),
        marketCap: totalMarketCap
      },
      {
        name: 'DFM Shariah Index',
        symbol: 'DFMSI',
        value: 1250.80,
        change: 12.45,
        changePercent: 1.00,
        volume: 15000000,
        marketCap: 45000000000
      },
      {
        name: 'DFM Financial Services Index',
        symbol: 'DFMFI',
        value: 2800.15,
        change: -25.30,
        changePercent: -0.89,
        volume: 25000000,
        marketCap: 35000000000
      }
    ];

    res.json({
      success: true,
      data: {
        indices,
        lastUpdated: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Market indices error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching market indices'
    });
  }
});

// @route   GET /api/market/sectors
// @desc    Get sector performance
// @access  Public
router.get('/sectors', [
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  validateRequest
], async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    const stocks = await Stock.find({ isActive: true });

    // Group stocks by sector
    const sectorData = {};
    stocks.forEach(stock => {
      if (!sectorData[stock.sector]) {
        sectorData[stock.sector] = {
          stocks: [],
          totalMarketCap: 0,
          totalVolume: 0,
          avgChange: 0
        };
      }
      sectorData[stock.sector].stocks.push(stock);
      sectorData[stock.sector].totalMarketCap += stock.marketCap || 0;
      sectorData[stock.sector].totalVolume += stock.volume || 0;
    });

    // Calculate averages and create sector performance data
    const sectorPerformance = Object.entries(sectorData).map(([sector, data]) => {
      const avgChange = data.stocks.reduce((sum, stock) => sum + stock.changePercent, 0) / data.stocks.length;
      const gainers = data.stocks.filter(stock => stock.change > 0).length;
      const losers = data.stocks.filter(stock => stock.change < 0).length;

      return {
        sector,
        stockCount: data.stocks.length,
        totalMarketCap: data.totalMarketCap,
        totalVolume: data.totalVolume,
        avgChange: parseFloat(avgChange.toFixed(2)),
        gainers,
        losers,
        unchanged: data.stocks.length - gainers - losers
      };
    });

    // Sort by market cap and limit results
    const sortedSectors = sectorPerformance
      .sort((a, b) => b.totalMarketCap - a.totalMarketCap)
      .slice(0, parseInt(limit));

    res.json({
      success: true,
      data: {
        sectors: sortedSectors,
        totalSectors: Object.keys(sectorData).length,
        lastUpdated: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Sector performance error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching sector performance'
    });
  }
});

// @route   GET /api/market/trending
// @desc    Get trending stocks (highest volume and price movement)
// @access  Public
router.get('/trending', [
  query('limit').optional().isInt({ min: 1, max: 20 }).withMessage('Limit must be between 1 and 20'),
  validateRequest
], async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    // Get stocks with highest volume and significant price movement
    const trendingStocks = await Stock.find({ isActive: true })
      .sort({ volume: -1, changePercent: -1 })
      .limit(parseInt(limit))
      .select('symbol name currentPrice change changePercent volume sector');

    res.json({
      success: true,
      data: {
        trending: trendingStocks,
        lastUpdated: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Trending stocks error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching trending stocks'
    });
  }
});

// @route   GET /api/market/statistics
// @desc    Get detailed market statistics
// @access  Public
router.get('/statistics', async (req, res) => {
  try {
    const stocks = await Stock.find({ isActive: true });

    // Price statistics
    const prices = stocks.map(stock => stock.currentPrice).filter(price => price > 0);
    const avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);

    // Volume statistics
    const volumes = stocks.map(stock => stock.volume).filter(volume => volume > 0);
    const avgVolume = volumes.reduce((sum, volume) => sum + volume, 0) / volumes.length;
    const maxVolume = Math.max(...volumes);

    // Market cap statistics
    const marketCaps = stocks.map(stock => stock.marketCap).filter(mc => mc > 0);
    const avgMarketCap = marketCaps.reduce((sum, mc) => sum + mc, 0) / marketCaps.length;
    const totalMarketCap = marketCaps.reduce((sum, mc) => sum + mc, 0);

    // Change statistics
    const changes = stocks.map(stock => stock.changePercent);
    const avgChange = changes.reduce((sum, change) => sum + change, 0) / changes.length;
    const maxGain = Math.max(...changes);
    const maxLoss = Math.min(...changes);

    const statistics = {
      price: {
        average: parseFloat(avgPrice.toFixed(2)),
        highest: maxPrice,
        lowest: minPrice,
        range: maxPrice - minPrice
      },
      volume: {
        average: Math.round(avgVolume),
        highest: maxVolume,
        total: volumes.reduce((sum, vol) => sum + vol, 0)
      },
      marketCap: {
        average: Math.round(avgMarketCap),
        total: totalMarketCap,
        distribution: {
          large: marketCaps.filter(mc => mc > 10000000000).length, // > 10B
          medium: marketCaps.filter(mc => mc > 1000000000 && mc <= 10000000000).length, // 1B-10B
          small: marketCaps.filter(mc => mc <= 1000000000).length // < 1B
        }
      },
      performance: {
        averageChange: parseFloat(avgChange.toFixed(2)),
        maxGain: parseFloat(maxGain.toFixed(2)),
        maxLoss: parseFloat(maxLoss.toFixed(2)),
        gainers: stocks.filter(stock => stock.change > 0).length,
        losers: stocks.filter(stock => stock.change < 0).length,
        unchanged: stocks.filter(stock => stock.change === 0).length
      },
      lastUpdated: new Date().toISOString()
    };

    res.json({
      success: true,
      data: statistics
    });

  } catch (error) {
    console.error('Market statistics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching market statistics'
    });
  }
});

module.exports = router; 