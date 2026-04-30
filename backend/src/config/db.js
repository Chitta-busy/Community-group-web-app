const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error(
      'Missing MONGO_URI. Create a .env file (root or backend/) with MONGO_URI, JWT_SECRET, and PORT. See .env.example.'
    );
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');
};

module.exports = connectDB;
