# DFM Stock Site

A comprehensive web application for displaying Dubai Financial Market (DFM) stock listings and detailed stock information in a user-friendly table format.

## 🚀 Features

- **Stock List Display**: View all DFM listed stocks in a responsive table
- **Real-time Data**: Current stock prices, market cap, and trading volume
- **Search & Filter**: Find stocks by name, symbol, or sector
- **Stock Details**: Detailed information for each stock with charts
- **Watchlist**: Create and manage personal stock watchlists
- **Market Overview**: DFM index performance and statistics
- **Responsive Design**: Mobile-friendly interface
- **Dark/Light Theme**: User preference toggle

## 🛠️ Tech Stack

### Frontend
- React.js with TypeScript
- Tailwind CSS for styling
- Redux Toolkit for state management
- Chart.js for data visualization
- Axios for API calls

### Backend
- Node.js with Express.js
- MongoDB for database
- JWT for authentication
- RESTful API design

## 📁 Project Structure

```
dfm_stock_site/
├── frontend/          # React frontend application
├── backend/           # Node.js backend server
├── docs/             # Documentation
├── requirements.md   # Detailed project requirements
└── README.md        # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dfm_stock_site
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Environment Setup**
   ```bash
   # Backend environment variables
   cp backend/.env.example backend/.env
   # Edit backend/.env with your configuration
   ```

5. **Start Development Servers**
   ```bash
   # Start backend server (from backend directory)
   npm run dev
   
   # Start frontend server (from frontend directory)
   npm start
   ```

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev          # Start development server
npm run build        # Build for production
npm test            # Run tests
```

### Frontend Development
```bash
cd frontend
npm start           # Start development server
npm run build       # Build for production
npm test           # Run tests
```

## 📊 API Endpoints

### Stock Endpoints
- `GET /api/stocks` - Get all stocks with pagination
- `GET /api/stocks/:symbol` - Get specific stock details
- `GET /api/stocks/search` - Search stocks
- `GET /api/market/overview` - Get market statistics

### User Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/user/watchlist` - Get user's watchlist
- `POST /api/user/watchlist` - Add stock to watchlist

## 🗄️ Database Schema

### Stock Collection
```javascript
{
  symbol: String,
  name: String,
  sector: String,
  currentPrice: Number,
  change: Number,
  volume: Number,
  marketCap: Number,
  lastUpdated: Date
}
```

### User Collection
```javascript
{
  email: String,
  password: String,
  watchlist: [String],
  preferences: Object,
  createdAt: Date
}
```

## 🚀 Deployment

### Frontend Deployment
- Deploy to Vercel or Netlify
- Configure environment variables
- Set up custom domain

### Backend Deployment
- Deploy to Heroku, AWS, or DigitalOcean
- Configure MongoDB connection
- Set up environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation in the `docs/` folder

## 🔄 Version History

- **v1.0.0** - Initial release with basic stock listing functionality
- **v1.1.0** - Added watchlist feature and user authentication
- **v1.2.0** - Enhanced UI with dark/light theme and responsive design

## 📈 Roadmap

- [ ] Real-time stock price updates
- [ ] Advanced charting and technical analysis
- [ ] Portfolio tracking functionality
- [ ] Mobile application
- [ ] Multi-language support (Arabic/English)
- [ ] Push notifications for price alerts 