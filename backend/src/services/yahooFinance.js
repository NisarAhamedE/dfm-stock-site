const axios = require('axios');

class YahooFinanceService {
  constructor() {
    this.baseUrl = 'https://query1.finance.yahoo.com';
    this.dfmStocks = [
      'EMAAR', 'DU', 'ENBD', 'DEWA', 'SALIK', 'AMLAK', 
      'ARTC', 'DAMAC', 'DFM', 'GULFNAV', 'SHUAA', 'TECOM', 'UPP'
    ];
  }

  // Get single stock data
  async getStockQuote(symbol) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/v8/finance/chart/${symbol}.AD`,
        {
          timeout: 10000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        }
      );
      
      if (!response.data.chart.result || response.data.chart.result.length === 0) {
        throw new Error(`No data found for symbol: ${symbol}`);
      }

      const result = response.data.chart.result[0];
      const meta = result.meta;
      
      return {
        symbol: symbol,
        name: meta.instrumentInfo?.shortName || symbol,
        currentPrice: meta.regularMarketPrice || 0,
        previousClose: meta.previousClose || 0,
        change: (meta.regularMarketPrice || 0) - (meta.previousClose || 0),
        changePercent: meta.previousClose ? 
          (((meta.regularMarketPrice || 0) - meta.previousClose) / meta.previousClose) * 100 : 0,
        volume: meta.regularMarketVolume || 0,
        marketCap: meta.marketCap || 0,
        lastUpdated: new Date(),
        currency: meta.currency || 'AED'
      };
    } catch (error) {
      console.error(`Error fetching ${symbol}:`, error.message);
      throw error;
    }
  }

  // Get multiple stocks data
  async getMultipleStocks(symbols = this.dfmStocks) {
    try {
      const symbolsString = symbols.map(s => `${s}.AD`).join(',');
      const response = await axios.get(
        `${this.baseUrl}/v8/finance/chart/${symbolsString}`,
        {
          timeout: 15000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        }
      );
      
      if (!response.data.chart.result) {
        throw new Error('No data received from Yahoo Finance');
      }

      return response.data.chart.result.map(result => {
        const meta = result.meta;
        return {
          symbol: meta.symbol.replace('.AD', ''),
          name: meta.instrumentInfo?.shortName || meta.symbol.replace('.AD', ''),
          currentPrice: meta.regularMarketPrice || 0,
          previousClose: meta.previousClose || 0,
          change: (meta.regularMarketPrice || 0) - (meta.previousClose || 0),
          changePercent: meta.previousClose ? 
            (((meta.regularMarketPrice || 0) - meta.previousClose) / meta.previousClose) * 100 : 0,
          volume: meta.regularMarketVolume || 0,
          marketCap: meta.marketCap || 0,
          lastUpdated: new Date(),
          currency: meta.currency || 'AED'
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
        `${this.baseUrl}/v1/finance/search?q=${encodeURIComponent(query)}`,
        {
          timeout: 10000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        }
      );
      
      if (!response.data.quotes) {
        return [];
      }

      return response.data.quotes
        .filter(quote => quote.exchange === 'DFM')
        .map(quote => ({
          symbol: quote.symbol.replace('.AD', ''),
          name: quote.shortname || quote.longname,
          exchange: quote.exchange
        }));
    } catch (error) {
      console.error('Error searching stocks:', error.message);
      throw error;
    }
  }

  // Get all DFM stocks
  async getAllDFMStocks() {
    return this.getMultipleStocks(this.dfmStocks);
  }
}

module.exports = YahooFinanceService; 