import express from 'express';
const router = express.Router();

import { addOrderItems, getOrderById } from '../controllers/orderController.js';
import protectRoute from '../middleware/authMiddleware.js';

//@Desc   Create new Order
//@route  POST api/orders
//@access Private
router.route('/').post(protectRoute, addOrderItems);
router.route('/:id').get(protectRoute, getOrderById);

export default router;
