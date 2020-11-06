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

/**
 * @desc Delete a product
 * @route DELETE /api/products/:id
 * @access Private
 */
const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'PRODUCT REMOVED' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

/**
 * @desc Create a product
 * @route POST /api/products
 * @access Private
 */
const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    brand: 'samlpe brand',
    image: '/images/teset',
    category: 'sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'sample description'
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

/**
 * @desc Update a product
 * @route PUT /api/products
 * @access Private
 */
const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
  }
  const updatedProduct = await product?.save();
  res.status(201).json(updatedProduct);
});

export { getProducts, getProductById, deleteProduct, updateProduct, createProduct };
