import store from '../store';
import { Order_Actions } from '../types';
import { Dispatch } from 'react';
import axios, { AxiosResponse } from 'axios';
import { OrderActionTypes, orderPayload } from '../reducers/orderReducers';

export const createOrder = (order: typeof orderPayload) => async (
  dispatch: Dispatch<OrderActionTypes>,
  getState: typeof store.getState
) => {
  try {
    dispatch({
      type: Order_Actions.ORDER_CREATE_REQUEST
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

    const { data } = await axios.post<any, AxiosResponse<typeof orderPayload>>(
      `/api/orders`,
      order,
      config
    );
    dispatch({
      type: Order_Actions.ORDER_CREATE_SUCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: Order_Actions.ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
