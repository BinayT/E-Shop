import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use('/api/products', productRoutes);

const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV;

app.listen(
  5000,
  console.log(`Server running on port ${port} in ${env} mode.`.yellow.bold)
);
