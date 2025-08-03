const mongoose = require('mongoose');
const Stock = require('../models/Stock');
const User = require('../models/User');
const sampleStocks = require('../../data/sampleStocks');
require('dotenv').config();

const connectDB = require('./database');

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();
    console.log('📦 Connected to MongoDB');

    // Clear existing data
    await Stock.deleteMany({});
    console.log('🗑️  Cleared existing stock data');

    // Insert sample stocks
    const stocks = await Stock.insertMany(sampleStocks);
    console.log(`✅ Inserted ${stocks.length} stocks`);

    // Create sample user
    const sampleUser = {
      name: 'Demo User',
      email: 'demo@dfmstock.com',
      password: 'Demo123!',
      watchlist: ['EMAAR', 'DU', 'ENBD'],
      preferences: {
        theme: 'auto',
        defaultSort: 'symbol',
        defaultSortOrder: 'asc',
        notifications: {
          email: false,
          priceAlerts: false
        }
      }
    };

    // Check if demo user exists
    const existingUser = await User.findByEmail(sampleUser.email);
    if (!existingUser) {
      const user = await User.createUser(sampleUser);
      console.log('✅ Created demo user');
      console.log('📧 Demo Email:', sampleUser.email);
      console.log('🔑 Demo Password:', sampleUser.password);
    } else {
      console.log('ℹ️  Demo user already exists');
    }

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Sample data includes:');
    console.log(`   • ${stocks.length} DFM stocks`);
    console.log(`   • Real estate, banking, telecom, and other sectors`);
    console.log(`   • Current prices, volumes, and market data`);
    console.log('\n🚀 You can now start the server and test the API');

    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase; 