import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound } from './middleware/errorMiddleware.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use(notFound);

const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV;

app.listen(
  5000,
  console.log(`Server running on port ${port} in ${env} mode.`.yellow.bold)
);
