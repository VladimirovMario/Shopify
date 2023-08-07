const mongoose = require('mongoose');

const connectionString = 'mongodb://0.0.0.0:27017/shopify';

module.exports = async (app) => {
  console.log(app);
  try {
    mongoose.connect(connectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('✅ Database connected');
  } catch (error) {
    console.error('❌ Error initializing database');
    console.error(error.message);
    process.exit(1);
  }
};
