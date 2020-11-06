import { PRODUCT_ACTIONS } from '../types';
import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import {
  ProductActionTypes,
  ProductCreateActionTypes,
  ProductDeleteActionTypes,
  ProductDetailsActionTypes
} from '../reducers/productReducers';
import { ProductType } from '../components/Product';
import store from '../store';

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

export const deleteProduct = (id: string) => async (
  dispatch: Dispatch<ProductDeleteActionTypes>,
  getState: typeof store.getState
) => {
  try {
    dispatch({
      type: PRODUCT_ACTIONS.PRODUCT_DELETE_REQUEST
    });
    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo?.token}`
      }
    };

    await axios.delete<any, AxiosResponse>(`/api/products/${id}`, config);
    dispatch({
      type: PRODUCT_ACTIONS.PRODUCT_DELETE_SUCCESS
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ACTIONS.PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const createProduct = () => async (
  dispatch: Dispatch<ProductCreateActionTypes>,
  getState: typeof store.getState
) => {
  try {
    dispatch({
      type: PRODUCT_ACTIONS.PRODUCT_CREATE_REQUEST
    });
    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo?.token}`
      }
    };

    const { data } = await axios.post<any, AxiosResponse>(`/api/products/`, {}, config);
    dispatch({
      type: PRODUCT_ACTIONS.PRODUCT_CREATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ACTIONS.PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
