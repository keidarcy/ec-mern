import express from 'express';
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  registerUser,
  updateUserById,
  updateUserProfile
} from '../controllers/userController';
import { admin, protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/').get(protect, admin, getUsers);
router.route('/login').post(authUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/profile').put(protect, updateUserProfile);
router.route('/register').post(registerUser);
router
  .route('/:id')
  .delete(protect, deleteUser)
  .get(protect, getUserById)
  .put(protect, updateUserById);

export default router;
