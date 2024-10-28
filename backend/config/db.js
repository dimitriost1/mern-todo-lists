const dotenv = require('dotenv');
dotenv.config({ path: './backend/.env' });
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Stop the app if there's a connection error
  }
};

module.exports = connectDB;
