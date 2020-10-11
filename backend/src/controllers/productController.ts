import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel';

/**
 * @desc Fetch all products
 * @route Get /api/products
 * @access Public
 */
const getProducts = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.body);
  const products = await Product.find({});
  res.json(products);
});

/**
 * @desc Fetch one single product
 * @route Get /api/products/:id
 * @access Public
 */
const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProducts, getProductById };
