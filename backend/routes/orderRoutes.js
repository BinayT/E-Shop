import express from 'express';
const router = express.Router();

import { addOrderItems } from '../controllers/orderController.js';
import protectRoute from '../middleware/authMiddleware.js';

//@Desc   Create new Order
//@route  POST api/orders
//@access Private
router.route('/').post(protectRoute, addOrderItems);

export default router;
