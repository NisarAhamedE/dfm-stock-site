const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error
  let statusCode = 500;
  let message = 'Internal Server Error';
  let errorCode = 'INTERNAL_ERROR';

  // Handle specific error types
  if (err.code === 'ECONNREFUSED') {
    statusCode = 503;
    message = 'Yahoo Finance service is temporarily unavailable';
    errorCode = 'SERVICE_UNAVAILABLE';
  } else if (err.response?.status === 404) {
    statusCode = 404;
    message = 'Stock not found';
    errorCode = 'STOCK_NOT_FOUND';
  } else if (err.response?.status === 429) {
    statusCode = 429;
    message = 'Too many requests to Yahoo Finance API';
    errorCode = 'RATE_LIMIT_EXCEEDED';
  } else if (err.code === 'ENOTFOUND') {
    statusCode = 503;
    message = 'Network error - unable to reach Yahoo Finance';
    errorCode = 'NETWORK_ERROR';
  } else if (err.code === 'ETIMEDOUT') {
    statusCode = 504;
    message = 'Request timeout - Yahoo Finance API is slow to respond';
    errorCode = 'TIMEOUT_ERROR';
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation error';
    errorCode = 'VALIDATION_ERROR';
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid data format';
    errorCode = 'INVALID_FORMAT';
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message: message,
      ...(process.env.NODE_ENV === 'development' && { details: err.message })
    },
    timestamp: new Date().toISOString()
  });
};

module.exports = errorHandler; 