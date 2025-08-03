import React, { useState, useEffect } from 'react';
import './App.css';
import StockTable from './components/StockTable/StockTable';
import SearchBar from './components/SearchBar/SearchBar';
import Loading from './components/Loading/Loading';
import { stocksAPI } from './services/api';

interface Stock {
  symbol: string;
  name: string;
  currentPrice: number;
  previousClose: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  lastUpdated: string;
  currency: string;
}

function App() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<keyof Stock>('symbol');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Fetch stocks on component mount
  useEffect(() => {
    fetchStocks();
  }, []);

  // Filter stocks when search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredStocks(stocks);
    } else {
      const filtered = stocks.filter(stock =>
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStocks(filtered);
    }
  }, [searchTerm, stocks]);

  const fetchStocks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await stocksAPI.getAllStocks();
      setStocks(response.data);
      setFilteredStocks(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch stocks');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleSort = (column: keyof Stock) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const sortedStocks = [...filteredStocks].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  const formatNumber = (num: number): string => {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(1) + 'B';
    }
    if (num >= 1e6) {
      return (num / 1e6).toFixed(1) + 'M';
    }
    if (num >= 1e3) {
      return (num / 1e3).toFixed(1) + 'K';
    }
    return num.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchStocks}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">DFM Stock Site</h1>
              <p className="text-gray-600">Dubai Financial Market Stock Listings</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="text-sm font-medium text-gray-900">
                {stocks.length > 0 ? new Date(stocks[0].lastUpdated).toLocaleTimeString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Controls */}
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Stock Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <StockTable
            stocks={sortedStocks}
            onSort={handleSort}
            sortBy={sortBy}
            sortOrder={sortOrder}
            formatNumber={formatNumber}
          />
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Total Stocks: {stocks.length} | Showing: {filteredStocks.length}</p>
          <p className="mt-1">
            Data provided by Yahoo Finance API | 
            <button
              onClick={fetchStocks}
              className="ml-2 text-blue-600 hover:text-blue-800 underline"
            >
              Refresh Data
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}

export default App; 