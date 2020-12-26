import express from 'express';
import dotenv from 'dotenv';

import products from './data/products.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('API RUNNING CORRECTLY');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/product/:id', (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  res.json(product);
});

const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV;

app.listen(5000, console.log(`Server running on port ${port} in ${env} mode.`));
