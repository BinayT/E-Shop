import express from 'express';
import products from './data/products.js';

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

app.listen(5000, console.log('Server running on port 5000'));
