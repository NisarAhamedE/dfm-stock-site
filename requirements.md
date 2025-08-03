Nisar
# DFM Stock List Website - Project Requirements

## Project Overview
**Project Name:** DFM Stock Site  
**Description:** A comprehensive web application to display Dubai Financial Market (DFM) stock listings and detailed stock information in a user-friendly table format.

## Core Features

### Single Page Application
- **Stock List Display**: Show all DFM listed stocks in a responsive table format
- **Real-time Data**: Display current stock prices, market cap, and trading volume
- **Search & Filter**: Allow users to search stocks by name or symbol
- **Sorting**: Enable sorting by various columns (price, volume, market cap, change %)
- **Responsive Design**: Mobile-friendly interface
- **Simple & Clean**: Focus on essential information only

## Technical Requirements

### Frontend Technology Stack
- **Framework**: React.js with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **State Management**: React useState/useEffect (local state only)
- **HTTP Client**: Axios for API calls

### Backend Technology Stack
- **Framework**: Node.js with Express.js
- **Database**: MongoDB for flexible data storage
- **API**: RESTful API with JSON responses
- **Data Fetching**: Yahoo Finance API integration
- **Caching**: Redis for API response caching

### Data Sources
- **Primary**: Yahoo Finance API for real-time stock data
- **Secondary**: DFM official API (if available)
- **Fallback**: Web scraping from DFM website

## Project Structure

```
dfm_stock_site/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── StockTable/
│   │   │   ├── SearchBar/
│   │   │   └── Loading/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   ├── public/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   ├── data/
│   └── package.json
├── docs/
├── requirements.md
└── README.md
```

## Implementation Steps

### Phase 1: Basic Setup (Week 1)
1. **Initialize Project Structure**
   - Create React frontend with Vite
   - Set up Node.js backend with Express
   - Configure MongoDB connection
   - Set up Git repository

2. **Database Design**
   - Create simple stock data model
   - Set up database connection
   - Create initial data seeding scripts

### Phase 2: Core Features (Week 2)
3. **Backend Development**
   - Create RESTful endpoints for stock data
   - Implement Yahoo Finance API integration
   - Set up data caching with Redis
   - Set up basic error handling

4. **Frontend Development**
   - Build stock table component
   - Implement search functionality
   - Add sorting capabilities
   - Style with Tailwind CSS

### Phase 3: Polish & Deploy (Week 3)
5. **Enhancement**
   - Add loading states and error handling
   - Implement responsive design
   - Optimize performance

6. **Deployment**
   - Deploy to hosting platform
   - Set up basic monitoring

## Data Schema

### Stock Schema
```javascript
{
  symbol: String,
  name: String,
  sector: String,
  currentPrice: Number,
  previousClose: Number,
  change: Number,
  changePercent: Number,
  volume: Number,
  marketCap: Number,
  lastUpdated: Date
}
```


## API Endpoints

### Stock Endpoints
- `GET /api/stocks` - Get all stocks
- `GET /api/stocks/search` - Search stocks by name or symbol

## Performance Requirements
- **Page Load Time**: < 2 seconds for initial load
- **API Response Time**: < 500ms for data requests
- **Mobile Performance**: Optimized for mobile devices
- **Uptime**: 99% availability

## Security Requirements
- **Data Validation**: Input validation and sanitization
- **HTTPS**: Secure communication
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS**: Proper CORS configuration

## Future Enhancements
- **Real-time Updates**: WebSocket integration for live data
- **Stock Details**: Individual stock detail pages
- **Charts**: Price charts and technical indicators
- **Mobile App**: Native mobile application

## Success Metrics
- **Performance**: Page load times and API response times
- **Data Accuracy**: Stock price accuracy and update frequency
- **User Experience**: Clean, intuitive interface 