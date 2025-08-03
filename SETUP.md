# DFM Stock Site - Setup Guide

This guide will help you set up and run the DFM Stock Site project on your local machine.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** - [Download here](https://git-scm.com/)

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd dfm_stock_site
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp env.example .env

# Edit .env file with your configuration
# (See Environment Configuration section below)

# Seed the database with sample data
npm run seed

# Start the development server
npm run dev
```

The backend server will start on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend application will start on `http://localhost:3000`

## Environment Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/dfm_stock_site

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# API Configuration
API_BASE_URL=http://localhost:5000/api

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info

# Security
BCRYPT_ROUNDS=12
```

### MongoDB Setup

#### Option 1: Local MongoDB Installation

1. Download and install MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. Create a database named `dfm_stock_site`

#### Option 2: MongoDB Atlas (Cloud)

1. Create a free account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in your `.env` file

## Database Seeding

The project includes sample DFM stock data. To populate your database:

```bash
cd backend
npm run seed
```

This will create:
- 10 sample DFM stocks with realistic data
- A demo user account (email: `demo@dfmstock.com`, password: `Demo123!`)

## Project Structure

```
dfm_stock_site/
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Utility functions
│   │   └── server.js        # Main server file
│   ├── data/                # Sample data
│   ├── package.json
│   └── env.example
├── frontend/                # React application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── store/           # Redux store
│   │   ├── utils/           # Utility functions
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── public/              # Static assets
│   └── package.json
├── docs/                    # Documentation
├── requirements.md          # Project requirements
├── README.md               # Project overview
└── SETUP.md               # This file
```

## Available Scripts

### Backend Scripts

```bash
cd backend

npm run dev          # Start development server with nodemon
npm start           # Start production server
npm run seed        # Seed database with sample data
npm test           # Run tests
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint issues
```

### Frontend Scripts

```bash
cd frontend

npm start          # Start development server
npm run build      # Build for production
npm test          # Run tests
npm run lint      # Run ESLint
npm run lint:fix  # Fix ESLint issues
```

## API Endpoints

Once the backend is running, you can access the API at `http://localhost:5000/api`

### Public Endpoints

- `GET /api/stocks` - Get all stocks with pagination
- `GET /api/stocks/:symbol` - Get specific stock details
- `GET /api/stocks/search` - Search stocks
- `GET /api/market/overview` - Get market overview
- `GET /api/market/indices` - Get market indices
- `GET /api/market/sectors` - Get sector performance
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Protected Endpoints (require authentication)

- `GET /api/users/watchlist` - Get user's watchlist
- `POST /api/users/watchlist` - Add stock to watchlist
- `DELETE /api/users/watchlist/:symbol` - Remove stock from watchlist
- `GET /api/auth/me` - Get current user profile

## Testing the Application

### 1. Health Check

Visit `http://localhost:5000/health` to verify the backend is running.

### 2. API Testing

You can test the API endpoints using tools like:
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [curl](https://curl.se/)

### 3. Frontend Testing

Visit `http://localhost:3000` to access the web application.

### 4. Demo Account

Use the demo account to test authenticated features:
- Email: `demo@dfmstock.com`
- Password: `Demo123!`

## Development Workflow

### 1. Backend Development

```bash
cd backend
npm run dev
```

The server will automatically restart when you make changes to the code.

### 2. Frontend Development

```bash
cd frontend
npm start
```

The React app will automatically reload when you make changes.

### 3. Database Changes

If you modify the database schema:

1. Update the models in `backend/src/models/`
2. Run the seeder to update sample data: `npm run seed`

## Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error

**Error**: `MongoDB connection failed`

**Solution**: 
- Ensure MongoDB is running
- Check your `MONGODB_URI` in the `.env` file
- Verify network connectivity if using MongoDB Atlas

#### 2. Port Already in Use

**Error**: `EADDRINUSE: address already in use`

**Solution**:
- Change the port in your `.env` file
- Or kill the process using the port: `lsof -ti:5000 | xargs kill -9`

#### 3. Module Not Found

**Error**: `Cannot find module`

**Solution**:
- Run `npm install` in the respective directory
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

#### 4. CORS Error

**Error**: `Access to fetch at 'http://localhost:5000' from origin 'http://localhost:3000' has been blocked by CORS policy`

**Solution**:
- Ensure the backend is running on port 5000
- Check that `FRONTEND_URL` is set correctly in your `.env` file

### Getting Help

If you encounter issues:

1. Check the console logs for error messages
2. Verify all prerequisites are installed
3. Ensure all environment variables are set correctly
4. Check that both backend and frontend are running
5. Review the troubleshooting section above

## Next Steps

Once you have the application running:

1. **Explore the Features**: Test all the functionality including stock listing, search, watchlist, etc.
2. **Review the Code**: Familiarize yourself with the project structure and codebase
3. **Customize**: Modify the styling, add new features, or integrate with real DFM data
4. **Deploy**: Prepare the application for production deployment

## Production Deployment

For production deployment, you'll need to:

1. Set up a production MongoDB database
2. Configure environment variables for production
3. Build the frontend: `npm run build`
4. Set up a reverse proxy (nginx, Apache)
5. Use a process manager (PM2, Docker)
6. Set up SSL certificates
7. Configure monitoring and logging

See the `README.md` file for more deployment details. 