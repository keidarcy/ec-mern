import mongoose, { Schema, Document } from 'mongoose';
const OrderSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    orderItems: [
      {
        name: { type: String, require: true },
        qty: { type: Number, require: true },
        image: { type: String, require: true },
        price: { type: Number, require: true },
        product: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'Product' }
      }
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true }
    },
    paymentMethod: {
      type: String,
      required: true
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String }
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    totalPrice: { type: Number, required: true, default: 0.0 },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date }
  },
  {
    timestamps: true
  }
);

export interface IOrder extends Document {
  totalPrice: number;
  isPaid: boolean;
  paidAt: string | number;
  isDelivered: boolean;
  deliveredAt: string | number;
  paymentResult: {
    id: string;
    state: string;
    update_time: string;
    email_address: string;
  };
}
const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
