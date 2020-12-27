import express from 'express';
import Product from '../models/productModel.js';
const router = express.Router();

//@Desc GET all products
//@route GET api/products
//@access Public
router.get('/', async (_, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//@Desc GET a product
//@route GET api/products/:id
//@access Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res
      .status(404)
      .json({ message: 'Product not found', error: `Error: ${error.message}` });
  }
});

export default router;