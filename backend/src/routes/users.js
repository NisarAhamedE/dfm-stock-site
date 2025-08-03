const express = require('express');
const { body, param, validationResult } = require('express-validator');
const User = require('../models/User');
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

// @route   GET /api/users/watchlist
// @desc    Get user's watchlist with stock details
// @access  Private
router.get('/watchlist', auth, async (req, res) => {
  try {
    const user = req.user;

    if (!user.watchlist || user.watchlist.length === 0) {
      return res.json({
        success: true,
        data: {
          watchlist: [],
          count: 0
        }
      });
    }

    // Get stock details for watchlist
    const stocks = await Stock.find({
      symbol: { $in: user.watchlist },
      isActive: true
    }).select('-__v');

    res.json({
      success: true,
      data: {
        watchlist: stocks,
        count: stocks.length
      }
    });

  } catch (error) {
    console.error('Get watchlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching watchlist'
    });
  }
});

// @route   POST /api/users/watchlist
// @desc    Add stock to user's watchlist
// @access  Private
router.post('/watchlist', [
  auth,
  body('symbol')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Stock symbol is required'),
  validateRequest
], async (req, res) => {
  try {
    const { symbol } = req.body;
    const user = req.user;

    // Check if stock exists
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

    // Check if already in watchlist
    if (user.watchlist.includes(symbol.toUpperCase())) {
      return res.status(400).json({
        success: false,
        message: 'Stock is already in your watchlist'
      });
    }

    // Add to watchlist
    await user.addToWatchlist(symbol);

    res.json({
      success: true,
      message: 'Stock added to watchlist successfully',
      data: {
        symbol: symbol.toUpperCase(),
        watchlist: user.watchlist
      }
    });

  } catch (error) {
    console.error('Add to watchlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding to watchlist'
    });
  }
});

// @route   DELETE /api/users/watchlist/:symbol
// @desc    Remove stock from user's watchlist
// @access  Private
router.delete('/watchlist/:symbol', [
  auth,
  param('symbol')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Stock symbol is required'),
  validateRequest
], async (req, res) => {
  try {
    const { symbol } = req.params;
    const user = req.user;

    // Check if stock is in watchlist
    if (!user.watchlist.includes(symbol.toUpperCase())) {
      return res.status(400).json({
        success: false,
        message: 'Stock is not in your watchlist'
      });
    }

    // Remove from watchlist
    await user.removeFromWatchlist(symbol);

    res.json({
      success: true,
      message: 'Stock removed from watchlist successfully',
      data: {
        symbol: symbol.toUpperCase(),
        watchlist: user.watchlist
      }
    });

  } catch (error) {
    console.error('Remove from watchlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while removing from watchlist'
    });
  }
});

// @route   PUT /api/users/preferences
// @desc    Update user preferences
// @access  Private
router.put('/preferences', [
  auth,
  body('theme')
    .optional()
    .isIn(['light', 'dark', 'auto'])
    .withMessage('Theme must be light, dark, or auto'),
  body('defaultSort')
    .optional()
    .isIn(['symbol', 'name', 'currentPrice', 'changePercent', 'volume', 'marketCap'])
    .withMessage('Invalid default sort field'),
  body('defaultSortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Default sort order must be asc or desc'),
  body('notifications.email')
    .optional()
    .isBoolean()
    .withMessage('Email notifications must be a boolean'),
  body('notifications.priceAlerts')
    .optional()
    .isBoolean()
    .withMessage('Price alerts must be a boolean'),
  validateRequest
], async (req, res) => {
  try {
    const user = req.user;
    const preferences = req.body;

    // Update preferences
    await user.updatePreferences(preferences);

    res.json({
      success: true,
      message: 'Preferences updated successfully',
      data: {
        preferences: user.preferences
      }
    });

  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating preferences'
    });
  }
});

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = req.user;

    res.json({
      success: true,
      data: {
        user: user.profile
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
});

// @route   DELETE /api/users/account
// @desc    Delete user account
// @access  Private
router.delete('/account', [
  auth,
  body('password')
    .notEmpty()
    .withMessage('Password is required for account deletion'),
  validateRequest
], async (req, res) => {
  try {
    const { password } = req.body;
    const user = req.user;

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Password is incorrect'
      });
    }

    // Deactivate account (soft delete)
    user.isActive = false;
    await user.save();

    res.json({
      success: true,
      message: 'Account deleted successfully'
    });

  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting account'
    });
  }
});

module.exports = router; 