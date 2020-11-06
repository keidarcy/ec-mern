import express from 'express';
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct
} from '../controllers/productController';
import { admin, protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
