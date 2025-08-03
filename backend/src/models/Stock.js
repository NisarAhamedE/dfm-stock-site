const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  arabicName: {
    type: String,
    trim: true
  },
  sector: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  industry: {
    type: String,
    trim: true,
    index: true
  },
  currentPrice: {
    type: Number,
    required: true,
    min: 0
  },
  previousClose: {
    type: Number,
    required: true,
    min: 0
  },
  change: {
    type: Number,
    required: true
  },
  changePercent: {
    type: Number,
    required: true
  },
  volume: {
    type: Number,
    required: true,
    min: 0
  },
  marketCap: {
    type: Number,
    min: 0
  },
  peRatio: {
    type: Number
  },
  dividendYield: {
    type: Number,
    min: 0
  },
  fiftyTwoWeekHigh: {
    type: Number,
    min: 0
  },
  fiftyTwoWeekLow: {
    type: Number,
    min: 0
  },
  dayHigh: {
    type: Number,
    min: 0
  },
  dayLow: {
    type: Number,
    min: 0
  },
  openPrice: {
    type: Number,
    min: 0
  },
  bidPrice: {
    type: Number,
    min: 0
  },
  askPrice: {
    type: Number,
    min: 0
  },
  sharesOutstanding: {
    type: Number,
    min: 0
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
    index: true
  },
  companyInfo: {
    website: String,
    description: String,
    founded: Number,
    employees: Number,
    headquarters: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for price change direction
stockSchema.virtual('priceDirection').get(function() {
  return this.change >= 0 ? 'up' : 'down';
});

// Virtual for formatted price
stockSchema.virtual('formattedPrice').get(function() {
  return this.currentPrice?.toFixed(2) || '0.00';
});

// Virtual for formatted change
stockSchema.virtual('formattedChange').get(function() {
  return this.change?.toFixed(2) || '0.00';
});

// Virtual for formatted change percent
stockSchema.virtual('formattedChangePercent').get(function() {
  return this.changePercent?.toFixed(2) || '0.00';
});

// Indexes for better query performance
stockSchema.index({ symbol: 1, isActive: 1 });
stockSchema.index({ sector: 1, isActive: 1 });
stockSchema.index({ currentPrice: -1 });
stockSchema.index({ changePercent: -1 });
stockSchema.index({ volume: -1 });
stockSchema.index({ marketCap: -1 });

// Pre-save middleware to ensure symbol is uppercase
stockSchema.pre('save', function(next) {
  if (this.symbol) {
    this.symbol = this.symbol.toUpperCase();
  }
  next();
});

// Static method to find active stocks
stockSchema.statics.findActive = function() {
  return this.find({ isActive: true });
};

// Static method to search stocks
stockSchema.statics.search = function(query) {
  return this.find({
    $and: [
      { isActive: true },
      {
        $or: [
          { symbol: { $regex: query, $options: 'i' } },
          { name: { $regex: query, $options: 'i' } },
          { arabicName: { $regex: query, $options: 'i' } },
          { sector: { $regex: query, $options: 'i' } }
        ]
      }
    ]
  });
};

// Instance method to update stock data
stockSchema.methods.updateStockData = function(data) {
  Object.assign(this, data);
  this.lastUpdated = new Date();
  return this.save();
};

module.exports = mongoose.model('Stock', stockSchema); 