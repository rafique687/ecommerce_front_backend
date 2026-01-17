const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    //  await mongoose.connect('https://cloud.mongodb.com/v2/68c3d426833939788c6c139b#/metrics/replicaSet/68c3d503b80694565fb70d80/explorer/ecommercedb', {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true
    // });
    await mongoose.connect('mongodb://localhost:27017/ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('MongoDB connected');
    // console.log('Mongoose connected to DB:', mongoose.connection.name);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // stop server if DB fails
  }
};

module.exports = connectDB; // ✅ export the function itself


