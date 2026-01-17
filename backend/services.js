const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');

// Routes
const categoryRoutes = require('./routes/categoryRoutes');
const loginRoutes = require('./routes/loginRoutes');
const subcategy = require('./routes/subcategoryRoutes');
const products = require('./routes/productRoutes');
const DisplayproductRoutes = require('./routes/displayproductRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const discountRoutes = require('./routes/discountRoutes');
const CollectionRoutes = require('./routes/collectionRoutes');
const userLoginRoute = require('./routes/UserLoginRoute');

const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect DB
connectDB();

// API routes
app.use('/api/loginRoutes', loginRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategory', subcategy);
app.use('/api/product', products);
app.use('/api/displayproducts', DisplayproductRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/discount', discountRoutes);
app.use('/api/collectionRoutes', CollectionRoutes);
app.use('/api/user', userLoginRoute);

// Root route
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = 5000;
const HOST = '127.0.0.1';

// Start server
app.listen(PORT, HOST, () => {
    console.log(`🚀 Server running at http://${HOST}:${PORT}`);
});
