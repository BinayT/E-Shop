import express from 'express';
const router = express.Router();

import {
  getProducts,
  getProductById,
} from '../controllers/productController.js';

//@Desc GET all products
//@route GET api/products
//@access Public
router.route('/').get(getProducts);

//@Desc GET a product
//@route GET api/products/:id
//@access Public
router.route('/:id').get(getProductById);

export default router;
