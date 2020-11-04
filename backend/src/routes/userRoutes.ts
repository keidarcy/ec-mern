import express from 'express';
import {
  authUser,
  getUserProfile,
  getUsers,
  registerUser,
  updateUserProfile
} from '../controllers/userController';
import { admin, protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/').get(protect, admin, getUsers);
router.route('/login').post(authUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/profile').put(protect, updateUserProfile);
router.route('/register').post(registerUser);

export default router;
