import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel';

/**
 * @desc Create new order
 * @route POST /api/products
 * @access Private
 */
const addOrderItems = asyncHandler(async (req: Request, res: Response) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order Items');
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

/**
 * @desc Get order by ID
 * @route GET /api/order/:id
 * @access Private
 */
const getOrderById = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not Found');
  }
});

/**
 * @desc Update order to paid
 * @route PUT /api/order/:id/pay
 * @access Private
 */
const updateOrderToPaid = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      state: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email
    };
    const updateOrder = await order.save();
    res.json(updateOrder);
  } else {
    res.status(404);
    throw new Error('Order not Found');
  }
});

/**
 * @desc Get logged in user orders
 * @route Get /api/order/myorders
 * @access Private
 */
const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

export { addOrderItems, getMyOrders, getOrderById, updateOrderToPaid };
