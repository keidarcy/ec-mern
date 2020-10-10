import { PRODUCT_ACTIONS } from '../types';
import axios from 'axios';
import { Dispatch } from 'redux';
import { ProductActionTypes } from '../reducers/productReducers';
import { ProductType } from '../components/Product';

export const listProducts = async (dispatch: Dispatch<ProductActionTypes>) => {
  try {
    dispatch({ type: PRODUCT_ACTIONS.PRODUCT_LIST_REQUEST });
    const { data } = await axios.get<ProductType[]>('/api/products');

    dispatch({
      type: PRODUCT_ACTIONS.PRODUCT_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ACTIONS.PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
