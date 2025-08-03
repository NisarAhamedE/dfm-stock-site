import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p className="mt-4 text-gray-600 text-lg">Loading stock data...</p>
      <p className="mt-2 text-gray-500 text-sm">Fetching real-time data from Yahoo Finance</p>
    </div>
  );
};

export default Loading; 