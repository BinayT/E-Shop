import express from 'express';
const router = express.Router();

import {
  addOrderItems,
  getOrderById,
  getMyOrders,
  updateOrderToPaid,
} from '../controllers/orderController.js';
import protectRoute from '../middleware/authMiddleware.js';

//@Desc   Create new Order
//@route  POST api/orders
//@access Private
router.route('/').post(protectRoute, addOrderItems);
router.route('/myorders').get(protectRoute, getMyOrders);
router.route('/:id').get(protectRoute, getOrderById);
router.route('/:id/pay').put(protectRoute, updateOrderToPaid);

export default router;
