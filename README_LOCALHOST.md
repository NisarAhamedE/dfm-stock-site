# DFM Stock Site - Localhost Setup Guide

## 🚀 Quick Start

This guide will help you run the DFM Stock Site project on your local machine.

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **MongoDB** (optional - the app will work without it for basic functionality)

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/NisarAhamedE/dfm-stock-site.git
cd dfm_stocklist_site
```

### 2. Backend Setup

#### Navigate to backend directory:
```bash
cd backend
```

#### Install dependencies:
```bash
npm install
```

#### Create environment file:
```bash
# Copy the example environment file
cp env.example .env
```

#### Start the backend server:
```bash
npm run dev
```

The backend will start on `http://localhost:5000`

### 3. Frontend Setup

#### Open a new terminal and navigate to frontend directory:
```bash
cd frontend
```

#### Install dependencies:
```bash
npm install --legacy-peer-deps
```

#### Create environment file:
```bash
# Copy the example environment file
cp env.example .env
```

#### Start the frontend development server:
```bash
npm start
```

The frontend will start on `http://localhost:3000`

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 📊 Features

### ✅ Real-time Stock Data
- Live stock prices from Yahoo Finance API
- Real-time volume and market cap updates
- Current change percentages and price movements

### ✅ Interactive Table
- Sortable columns (Symbol, Name, Price, Change %, Volume, Market Cap)
- Search functionality by stock symbol or name
- Responsive design for mobile and desktop

### ✅ Performance Optimized
- In-memory caching for API responses
- Debounced search input
- Efficient data formatting and display

## 🔧 API Endpoints

### Stock Data
- `GET /api/stocks` - Get all DFM stocks
- `GET /api/stocks/search?q=query` - Search stocks
- `GET /api/stocks/:symbol` - Get specific stock
- `GET /api/stocks/cache/stats` - Get cache statistics
- `DELETE /api/stocks/cache/clear` - Clear cache

### Health Check
- `GET /health` - API health status

## 📱 DFM Stocks Available

The application displays real-time data for the following DFM stocks:
- EMAAR (Emaar Properties PJSC)
- DU (Emirates Integrated Telecommunications Company PJSC)
- ENBD (Emirates NBD Bank PJSC)
- DEWA (Dubai Electricity and Water Authority PJSC)
- SALIK (Salik Company PJSC)
- AMLAK (Amlak Finance PJSC)
- ARTC (Arabtec Holding PJSC)
- DAMAC (DAMAC Properties Dubai Co PJSC)
- DFM (Dubai Financial Market PJSC)
- GULFNAV (Gulf Navigation Holding PJSC)
- SHUAA (SHUAA Capital PSC)
- TECOM (TECOM Group PJSC)
- UPP (Union Properties PJSC)

## 🛠️ Development

### Backend Development
```bash
cd backend
npm run dev  # Start with nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm start    # Start React development server
```

### Building for Production
```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run build
```

## 🔍 Troubleshooting

### Common Issues

#### 1. Port Already in Use
If you get "port already in use" errors:
```bash
# Kill processes on specific ports
npx kill-port 3000 5000
```

#### 2. CORS Issues
The backend is configured to allow requests from `http://localhost:3000`. If you change the frontend port, update the CORS configuration in `backend/src/server.js`.

#### 3. Yahoo Finance API Issues
If the Yahoo Finance API is slow or unavailable:
- The app includes error handling and will show appropriate error messages
- Check the browser console and backend logs for detailed error information
- The cache system helps reduce API calls

#### 4. TypeScript Errors
If you encounter TypeScript errors:
```bash
cd frontend
npm install --legacy-peer-deps
```

### Logs and Debugging

#### Backend Logs
- Check the terminal where you ran `npm run dev` in the backend directory
- Look for API request logs and error messages

#### Frontend Logs
- Open browser developer tools (F12)
- Check the Console tab for error messages
- Check the Network tab for API request/response details

## 📁 Project Structure

```
dfm_stocklist_site/
├── backend/
│   ├── src/
│   │   ├── services/
│   │   │   ├── yahooFinance.js    # Yahoo Finance API integration
│   │   │   └── cacheService.js    # In-memory caching
│   │   ├── routes/
│   │   │   └── stocks.js          # API endpoints
│   │   ├── middleware/
│   │   │   └── errorHandler.js    # Error handling
│   │   ├── utils/
│   │   │   └── database.js        # MongoDB connection
│   │   └── server.js              # Main server file
│   ├── package.json
│   └── env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── StockTable/        # Stock table component
│   │   │   ├── SearchBar/         # Search functionality
│   │   │   └── Loading/           # Loading component
│   │   ├── services/
│   │   │   └── api.ts             # API service
│   │   ├── App.tsx                # Main app component
│   │   └── App.css                # Styles
│   ├── package.json
│   └── env.example
└── README_LOCALHOST.md
```

## 🎯 Next Steps

Once the application is running successfully:

1. **Explore the Features**: Try searching for stocks, sorting columns, and refreshing data
2. **Check Real-time Updates**: The data is fetched from Yahoo Finance API in real-time
3. **Test Responsive Design**: Resize your browser window to test mobile responsiveness
4. **Monitor Performance**: Check the cache statistics endpoint to see caching in action

## 📞 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review the console logs for error messages
3. Ensure all dependencies are installed correctly
4. Verify that both backend and frontend are running on the correct ports

## 🚀 Deployment

For production deployment:
1. Set up environment variables for production
2. Configure a production database (MongoDB Atlas recommended)
3. Set up proper CORS configuration
4. Use a process manager like PM2 for the backend
5. Build the frontend and serve with a web server

---

**Happy coding! 🎉** 