import express from 'express';
const router = express.Router();

import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
} from '../controllers/userController.js';
import protectRoute from '../middleware/authMiddleware.js';
admin;
import { admin } from '../middleware/authMiddleware.js';

//@Desc Create new user
//@route POST api/users
//@access Public
router.route('/').post(registerUser).get(protectRoute, admin, getUsers);

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

//@Desc DELETE User
//@route DELETE api/users/:id
//@access Private/Admin
router.route('/:id').delete(protectRoute, admin, deleteUser);

export default router;
