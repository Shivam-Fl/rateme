const mongoose = require('mongoose');


const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return; // Already connected
    }

    await mongoose.connect(process.env.MONGO_URI);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;