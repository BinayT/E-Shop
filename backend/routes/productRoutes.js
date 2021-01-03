import express from 'express';
const router = express.Router();

import protectRoute from '../middleware/authMiddleware.js';
admin;
import { admin } from '../middleware/authMiddleware.js';

import {
  getProducts,
  getProductById,
  deleteProductById,
} from '../controllers/productController.js';

//@Desc GET all products
//@route GET api/products
//@access Public
router.route('/').get(getProducts);

//@Desc GET a product
//@route GET api/products/:id
//@access Public
router
  .route('/:id')
  .delete(protectRoute, admin, deleteProductById)
  .get(getProductById);

export default router;
