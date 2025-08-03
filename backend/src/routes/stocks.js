const express = require('express');
const { body, query, param, validationResult } = require('express-validator');
const Stock = require('../models/Stock');
const auth = require('../middleware/auth');

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

// @route   GET /api/stocks
// @desc    Get all stocks with pagination and filtering
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('sort').optional().isIn(['symbol', 'name', 'currentPrice', 'changePercent', 'volume', 'marketCap']).withMessage('Invalid sort field'),
  query('order').optional().isIn(['asc', 'desc']).withMessage('Order must be asc or desc'),
  query('sector').optional().isString().trim().notEmpty().withMessage('Sector must be a non-empty string'),
  validateRequest
], async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      sort = 'symbol',
      order = 'asc',
      sector,
      search
    } = req.query;

    // Build query
    let query = { isActive: true };
    
    if (sector) {
      query.sector = { $regex: sector, $options: 'i' };
    }

    if (search) {
      query.$or = [
        { symbol: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } },
        { arabicName: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOrder = order === 'desc' ? -1 : 1;

    // Execute query
    const stocks = await Stock.find(query)
      .sort({ [sort]: sortOrder })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    // Get total count for pagination
    const total = await Stock.countDocuments(query);

    // Calculate pagination info
    const totalPages = Math.ceil(total / parseInt(limit));
    const hasNextPage = parseInt(page) < totalPages;
    const hasPrevPage = parseInt(page) > 1;

    res.json({
      success: true,
      data: stocks,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems: total,
        itemsPerPage: parseInt(limit),
        hasNextPage,
        hasPrevPage
      }
    });

  } catch (error) {
    console.error('Error fetching stocks:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching stocks'
    });
  }
});

// @route   GET /api/stocks/search
// @desc    Search stocks by symbol, name, or sector
// @access  Public
router.get('/search', [
  query('q').notEmpty().withMessage('Search query is required'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  validateRequest
], async (req, res) => {
  try {
    const { q, limit = 10 } = req.query;

    const stocks = await Stock.search(q)
      .limit(parseInt(limit))
      .select('symbol name arabicName sector currentPrice change changePercent volume')
      .sort({ symbol: 1 });

    res.json({
      success: true,
      data: stocks,
      query: q,
      count: stocks.length
    });

  } catch (error) {
    console.error('Error searching stocks:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while searching stocks'
    });
  }
});

// @route   GET /api/stocks/:symbol
// @desc    Get specific stock details
// @access  Public
router.get('/:symbol', [
  param('symbol').isString().trim().notEmpty().withMessage('Stock symbol is required'),
  validateRequest
], async (req, res) => {
  try {
    const { symbol } = req.params;

    const stock = await Stock.findOne({
      symbol: symbol.toUpperCase(),
      isActive: true
    });

    if (!stock) {
      return res.status(404).json({
        success: false,
        message: 'Stock not found'
      });
    }

    res.json({
      success: true,
      data: stock
    });

  } catch (error) {
    console.error('Error fetching stock:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching stock details'
    });
  }
});

// @route   GET /api/stocks/sectors/list
// @desc    Get list of all sectors
// @access  Public
router.get('/sectors/list', async (req, res) => {
  try {
    const sectors = await Stock.distinct('sector', { isActive: true });
    
    res.json({
      success: true,
      data: sectors.sort()
    });

  } catch (error) {
    console.error('Error fetching sectors:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching sectors'
    });
  }
});

// @route   GET /api/stocks/sectors/:sector
// @desc    Get stocks by sector
// @access  Public
router.get('/sectors/:sector', [
  param('sector').isString().trim().notEmpty().withMessage('Sector is required'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  validateRequest
], async (req, res) => {
  try {
    const { sector } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const stocks = await Stock.find({
      sector: { $regex: sector, $options: 'i' },
      isActive: true
    })
      .sort({ symbol: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Stock.countDocuments({
      sector: { $regex: sector, $options: 'i' },
      isActive: true
    });

    const totalPages = Math.ceil(total / parseInt(limit));

    res.json({
      success: true,
      data: stocks,
      sector,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Error fetching stocks by sector:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching stocks by sector'
    });
  }
});

// @route   GET /api/stocks/top/gainers
// @desc    Get top gaining stocks
// @access  Public
router.get('/top/gainers', [
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  validateRequest
], async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const stocks = await Stock.find({ isActive: true })
      .sort({ changePercent: -1 })
      .limit(parseInt(limit))
      .select('symbol name currentPrice change changePercent volume sector');

    res.json({
      success: true,
      data: stocks
    });

  } catch (error) {
    console.error('Error fetching top gainers:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching top gainers'
    });
  }
});

// @route   GET /api/stocks/top/losers
// @desc    Get top losing stocks
// @access  Public
router.get('/top/losers', [
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  validateRequest
], async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const stocks = await Stock.find({ isActive: true })
      .sort({ changePercent: 1 })
      .limit(parseInt(limit))
      .select('symbol name currentPrice change changePercent volume sector');

    res.json({
      success: true,
      data: stocks
    });

  } catch (error) {
    console.error('Error fetching top losers:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching top losers'
    });
  }
});

// @route   GET /api/stocks/top/volume
// @desc    Get stocks with highest volume
// @access  Public
router.get('/top/volume', [
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  validateRequest
], async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const stocks = await Stock.find({ isActive: true })
      .sort({ volume: -1 })
      .limit(parseInt(limit))
      .select('symbol name currentPrice change changePercent volume sector');

    res.json({
      success: true,
      data: stocks
    });

  } catch (error) {
    console.error('Error fetching top volume stocks:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching top volume stocks'
    });
  }
});

module.exports = router; 