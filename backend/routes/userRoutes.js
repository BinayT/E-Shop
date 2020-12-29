import express from 'express';
const router = express.Router();

import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/userController.js';
import protectRoute from '../middleware/authMiddleware.js';

//@Desc Create new user
//@route POST api/users
//@access Public
router.route('/').post(registerUser);

//@Desc POST User credencials
//@route POST api/users/login
//@access Public
router.route('/login').post(authUser);

//@Desc GET User Profile
//@route GET api/users/profile
//@access Private
router
  .route('/profile')
  .get(protectRoute, getUserProfile)
  .put(protectRoute, updateUserProfile);

export default router;
