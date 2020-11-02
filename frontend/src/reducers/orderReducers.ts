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

export interface OrderInitialType {
  loading?: boolean;
  order?: typeof orderPayload & { _id?: string };
  error?: Error;
  success?: boolean;
}

export type OrderActionTypes =
  | { type: Order_Actions.ORDER_CREATE_REQUEST }
  | { type: Order_Actions.ORDER_CREATE_SUCESS; payload: typeof orderPayload }
  | { type: Order_Actions.ORDER_CREATE_FAIL; payload: Error }
  | { type: Order_Actions.ORDER_DETAIL_REQUEST }
  | { type: Order_Actions.ORDER_DETAIL_SUCESS; payload: typeof orderPayload }
  | { type: Order_Actions.ORDER_DETAIL_FAIL; payload: Error };

export const orderCreateReducer = (
  state: OrderInitialType = { order: orderPayload },
  action: OrderActionTypes
): OrderInitialType => {
  switch (action.type) {
    case Order_Actions.ORDER_CREATE_REQUEST:
      return { ...state, loading: true };
    case Order_Actions.ORDER_CREATE_SUCESS:
      return { ...state, loading: false, order: action.payload, success: true };
    case Order_Actions.ORDER_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDetailReducer = (
  state: OrderInitialType = { order: orderPayload },
  action: OrderActionTypes
): OrderInitialType => {
  switch (action.type) {
    case Order_Actions.ORDER_DETAIL_REQUEST:
      return { ...state, loading: true };
    case Order_Actions.ORDER_DETAIL_SUCESS:
      return { ...state, loading: false, order: action.payload };
    case Order_Actions.ORDER_DETAIL_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
