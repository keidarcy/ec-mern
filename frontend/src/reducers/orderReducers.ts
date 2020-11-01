import { Order_Actions } from '../types';
import { shippingInitialState } from './cartReducers';

export const orderPayload = {
  orderItems: [
    {
      product: '',
      name: '',
      image: '',
      price: 0,
      countInStock: 0,
      qty: 0
    }
  ],
  shippingAddress: shippingInitialState,
  paymentMethod: '',
  itemsPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 0
};

export type OrderType = typeof orderPayload & { _id?: string };

interface OrderInitialType {
  loading?: boolean;
  order?: OrderType;
  error?: Error;
  success?: boolean;
}

export type OrderActionTypes =
  | { type: Order_Actions.ORDER_CREATE_REQUEST }
  | { type: Order_Actions.ORDER_CREATE_SUCESS; payload: OrderType }
  | { type: Order_Actions.ORDER_CREATE_FAIL; payload: Error };

export const orderCreateReducer = (
  state: OrderInitialType = { order: orderPayload },
  action: OrderActionTypes
): OrderInitialType => {
  switch (action.type) {
    case Order_Actions.ORDER_CREATE_REQUEST:
      return { loading: true };
    case Order_Actions.ORDER_CREATE_SUCESS:
      return { loading: false, order: action.payload, success: true };
    case Order_Actions.ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
