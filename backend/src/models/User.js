const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  watchlist: [{
    type: String,
    uppercase: true,
    trim: true
  }],
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'auto'
    },
    defaultSort: {
      type: String,
      enum: ['symbol', 'name', 'currentPrice', 'changePercent', 'volume', 'marketCap'],
      default: 'symbol'
    },
    defaultSortOrder: {
      type: String,
      enum: ['asc', 'desc'],
      default: 'asc'
    },
    notifications: {
      email: {
        type: Boolean,
        default: false
      },
      priceAlerts: {
        type: Boolean,
        default: false
      }
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ isActive: 1 });

// Virtual for user's full profile
userSchema.virtual('profile').get(function() {
  return {
    id: this._id,
    email: this.email,
    name: this.name,
    watchlist: this.watchlist,
    preferences: this.preferences,
    isActive: this.isActive,
    emailVerified: this.emailVerified,
    createdAt: this.createdAt
  };
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Instance method to add stock to watchlist
userSchema.methods.addToWatchlist = function(symbol) {
  if (!this.watchlist.includes(symbol.toUpperCase())) {
    this.watchlist.push(symbol.toUpperCase());
    return this.save();
  }
  return Promise.resolve(this);
};

// Instance method to remove stock from watchlist
userSchema.methods.removeFromWatchlist = function(symbol) {
  this.watchlist = this.watchlist.filter(s => s !== symbol.toUpperCase());
  return this.save();
};

// Instance method to update preferences
userSchema.methods.updatePreferences = function(preferences) {
  this.preferences = { ...this.preferences, ...preferences };
  return this.save();
};

// Static method to find user by email
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase(), isActive: true });
};

// Static method to create user
userSchema.statics.createUser = async function(userData) {
  const user = new this(userData);
  return user.save();
};

module.exports = mongoose.model('User', userSchema); 