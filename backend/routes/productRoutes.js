import express from 'express';
const router = express.Router();

import protectRoute from '../middleware/authMiddleware.js';
admin;
import { admin } from '../middleware/authMiddleware.js';

import {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js';

//@Desc GET all products
//@route GET api/products
//@access Public
router
  .route('/')
  .get(getProducts)
  .get(getTopProducts)
  .post(protectRoute, admin, createProduct);

router.route('/top').get(getTopProducts);

//@Desc GET a product
//@route GET api/products/:id
//@access Public/private
router
  .route('/:id')
  .delete(protectRoute, admin, deleteProductById)
  .put(protectRoute, admin, updateProduct)
  .get(getProductById);

router.route('/:id/reviews').post(protectRoute, createProductReview);

export default router;
