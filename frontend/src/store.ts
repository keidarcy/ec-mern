import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer
} from './reducers/productReducers';
import { cartReducer, shippingInitialState } from './reducers/cartReducers';
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer
} from './reducers/userReducers';
import {
  orderCreateReducer,
  orderDetailReducer,
  orderListMyReducer,
  orderPayReducer
} from './reducers/orderReducers';

const reducer = combineReducers({
  cart: cartReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetail: orderDetailReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems') as string)
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo') as string)
  : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress') as string)
  : shippingInitialState;

const paymentMethodFromStorage = (localStorage.getItem('paymentMethod') as string)
  ? JSON.parse(localStorage.getItem('paymentMethod') as string)
  : '';

const initialState = {
  cart: {
    paymentMethod: paymentMethodFromStorage,
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage
  },
  userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export type RootStore = ReturnType<typeof reducer>;

export default store;
