import express from 'express';
const router = express.Router();

import { authUser } from '../controllers/userController.js';

//@Desc POST User credencials
//@route POST api/users/login
//@access Public
router.route('/login').post(authUser);

export default router;
