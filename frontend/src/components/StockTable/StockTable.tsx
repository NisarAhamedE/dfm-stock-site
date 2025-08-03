import React from 'react';

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

interface StockTableProps {
  stocks: Stock[];
  onSort: (column: keyof Stock) => void;
  sortBy: keyof Stock;
  sortOrder: 'asc' | 'desc';
  formatNumber: (num: number) => string;
}

const StockTable: React.FC<StockTableProps> = ({
  stocks,
  onSort,
  sortBy,
  sortOrder,
  formatNumber
}) => {
  const getSortIcon = (column: keyof Stock) => {
    if (sortBy !== column) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    
    return sortOrder === 'asc' ? (
      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  const formatChange = (change: number) => {
    return change >= 0 ? `+${change.toFixed(2)}` : change.toFixed(2);
  };

  const formatChangePercent = (changePercent: number) => {
    return changePercent >= 0 ? `+${changePercent.toFixed(2)}%` : `${changePercent.toFixed(2)}%`;
  };

  if (stocks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No stocks found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => onSort('symbol')}
            >
              <div className="flex items-center space-x-1">
                <span>Symbol</span>
                {getSortIcon('symbol')}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => onSort('name')}
            >
              <div className="flex items-center space-x-1">
                <span>Name</span>
                {getSortIcon('name')}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => onSort('currentPrice')}
            >
              <div className="flex items-center justify-end space-x-1">
                <span>Price</span>
                {getSortIcon('currentPrice')}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => onSort('changePercent')}
            >
              <div className="flex items-center justify-end space-x-1">
                <span>Change %</span>
                {getSortIcon('changePercent')}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => onSort('volume')}
            >
              <div className="flex items-center justify-end space-x-1">
                <span>Volume</span>
                {getSortIcon('volume')}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => onSort('marketCap')}
            >
              <div className="flex items-center justify-end space-x-1">
                <span>Market Cap</span>
                {getSortIcon('marketCap')}
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {stocks.map((stock, index) => (
            <tr key={stock.symbol} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{stock.symbol}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 max-w-xs truncate" title={stock.name}>
                  {stock.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="text-sm font-medium text-gray-900">
                  {formatPrice(stock.currentPrice)} {stock.currency}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className={`text-sm font-medium ${
                  stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatChangePercent(stock.changePercent)}
                </div>
                <div className={`text-xs ${
                  stock.change >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {formatChange(stock.change)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="text-sm text-gray-900">
                  {formatNumber(stock.volume)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="text-sm text-gray-900">
                  {formatNumber(stock.marketCap)} {stock.currency}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable; 