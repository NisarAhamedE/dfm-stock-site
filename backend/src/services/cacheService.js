class CacheService {
  constructor() {
    this.cache = new Map();
    this.defaultTTL = 300; // 5 minutes in seconds
  }

  // Generate cache key
  generateKey(key) {
    return `dfm_stock_${key}`;
  }

  // Get value from cache
  get(key) {
    try {
      const cacheKey = this.generateKey(key);
      const item = this.cache.get(cacheKey);
      
      if (!item) {
        return null;
      }

      // Check if item has expired
      if (Date.now() > item.expiry) {
        this.cache.delete(cacheKey);
        return null;
      }

      return item.value;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  // Set value in cache
  set(key, value, ttl = this.defaultTTL) {
    try {
      const cacheKey = this.generateKey(key);
      const expiry = Date.now() + (ttl * 1000);
      
      this.cache.set(cacheKey, {
        value,
        expiry
      });

      // Clean up expired items periodically
      this.cleanup();
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  // Delete value from cache
  del(key) {
    try {
      const cacheKey = this.generateKey(key);
      this.cache.delete(cacheKey);
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }

  // Clear all cache
  clear() {
    try {
      this.cache.clear();
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  }

  // Clean up expired items
  cleanup() {
    try {
      const now = Date.now();
      for (const [key, item] of this.cache.entries()) {
        if (now > item.expiry) {
          this.cache.delete(key);
        }
      }
    } catch (error) {
      console.error('Cache cleanup error:', error);
    }
  }

  // Get cache statistics
  getStats() {
    try {
      const now = Date.now();
      let validItems = 0;
      let expiredItems = 0;

      for (const item of this.cache.values()) {
        if (now > item.expiry) {
          expiredItems++;
        } else {
          validItems++;
        }
      }

      return {
        total: this.cache.size,
        valid: validItems,
        expired: expiredItems
      };
    } catch (error) {
      console.error('Cache stats error:', error);
      return { total: 0, valid: 0, expired: 0 };
    }
  }
}

module.exports = CacheService; 