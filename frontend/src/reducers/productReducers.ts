import { ProductType } from '../components/Product';
import { PRODUCT_ACTIONS } from '../types';

export type ProductActionTypes =
  | { type: PRODUCT_ACTIONS.PRODUCT_LIST_REQUEST }
  | { type: PRODUCT_ACTIONS.PRODUCT_LIST_SUCCESS; payload: ProductType[] }
  | { type: PRODUCT_ACTIONS.PRODUCT_LIST_FAIL; payload: Error };

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
