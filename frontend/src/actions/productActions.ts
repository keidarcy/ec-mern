import { PRODUCT_ACTIONS } from '../types';
import axios from 'axios';
import { Dispatch } from 'redux';
import {
  ProductActionTypes,
  ProductDetailsActionTypes
} from '../reducers/productReducers';
import { ProductType } from '../components/Product';

export const listProducts = () => async (dispatch: Dispatch<ProductActionTypes>) => {
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

export const listProductDetails = (id: string) => async (
  dispatch: Dispatch<ProductDetailsActionTypes>
) => {
  try {
    dispatch({ type: PRODUCT_ACTIONS.PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get<ProductType>(`/api/products/${id}`);

    dispatch({
      type: PRODUCT_ACTIONS.PRODUCT_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ACTIONS.PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
