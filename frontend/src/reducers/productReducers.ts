import { ProductType } from '../components/Product';
import { PRODUCT_ACTIONS } from '../types';

export type ProductActionTypes =
  | { type: PRODUCT_ACTIONS.PRODUCT_LIST_REQUEST }
  | { type: PRODUCT_ACTIONS.PRODUCT_LIST_SUCCESS; payload: ProductType[] }
  | { type: PRODUCT_ACTIONS.PRODUCT_LIST_FAIL; payload: Error };

export type ProductDetailsActionTypes =
  | { type: PRODUCT_ACTIONS.PRODUCT_DETAILS_REQUEST }
  | { type: PRODUCT_ACTIONS.PRODUCT_DETAILS_SUCCESS; payload: ProductType }
  | { type: PRODUCT_ACTIONS.PRODUCT_DETAILS_FAIL; payload: Error };

export interface ProductListStateType {
  loading: boolean;
  products: ProductType[];
  error?: Error;
}

const productListInitialState = {
  loading: false,
  products: []
};

export const productListReducer = (
  state: ProductListStateType = productListInitialState,
  action: ProductActionTypes
): ProductListStateType => {
  switch (action.type) {
    case PRODUCT_ACTIONS.PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_ACTIONS.PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_ACTIONS.PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export interface ReviewType {
  comment: string;
}

export const ProductInitialState = {
  _id: '',
  name: '',
  image: '',
  description: '',
  brand: '',
  category: '',
  price: 0,
  countInStock: 0,
  rating: 0,
  numReviews: 0
};

export const productDetailsInitialState = {
  loading: false,
  product: ProductInitialState
};

export interface ProductDetailsStateType {
  loading: boolean;
  product: ProductType;
  error?: Error;
}

export const productDetailsReducer = (
  state: ProductDetailsStateType = productDetailsInitialState,
  action: ProductDetailsActionTypes
): ProductDetailsStateType => {
  switch (action.type) {
    case PRODUCT_ACTIONS.PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_ACTIONS.PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_ACTIONS.PRODUCT_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
