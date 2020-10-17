import { USER_ACTIONS } from '../types';

export interface UserPayload {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

export type UserLoginActionTypes =
  | { type: USER_ACTIONS.USER_LOGIN_REQUEST }
  | { type: USER_ACTIONS.USER_LOGIN_SUCCESS; payload: UserPayload }
  | { type: USER_ACTIONS.USER_LOGIN_FAIL; payload: Error }
  | { type: USER_ACTIONS.USER_LOGOUT };

export type UserRegisterActionTypes =
  | { type: USER_ACTIONS.USER_REGISTER_REQUEST }
  | { type: USER_ACTIONS.USER_REGISTER_SUCCESS; payload: UserPayload }
  | { type: USER_ACTIONS.USER_REGISTER_FAIL; payload: Error };

export type UserDetailsActionTypes =
  | { type: USER_ACTIONS.USER_DETAILS_REQUEST }
  | { type: USER_ACTIONS.USER_DETAILS_SUCCESS; payload: UserPayload }
  | { type: USER_ACTIONS.USER_DETAILS_FAIL; payload: Error };

interface UserLoginStateType {
  loading?: boolean;
  userInfo?: UserPayload;
  error?: Error;
}

const userInitialState: UserLoginStateType = {};

export const userLoginReducer = (
  state: UserLoginStateType = userInitialState,
  action: UserLoginActionTypes
): UserLoginStateType => {
  switch (action.type) {
    case USER_ACTIONS.USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_ACTIONS.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_ACTIONS.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_ACTIONS.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (
  state: UserLoginStateType = userInitialState,
  action: UserRegisterActionTypes
): UserLoginStateType => {
  switch (action.type) {
    case USER_ACTIONS.USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_ACTIONS.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_ACTIONS.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

interface UserDetailsStateType {
  user?: UserPayload;
  loading?: boolean;
  error?: Error;
  success?: boolean;
}
export const userDetailsReducer = (
  state: UserDetailsStateType = {},
  action: UserDetailsActionTypes
): UserDetailsStateType => {
  switch (action.type) {
    case USER_ACTIONS.USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_ACTIONS.USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_ACTIONS.USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export type UserUpdateProfileActionTypes =
  | { type: USER_ACTIONS.USER_UPDATE_PROFILE_REQUEST }
  | { type: USER_ACTIONS.USER_UPDATE_PROFILE_SUCCESS; payload: UserPayload }
  | { type: USER_ACTIONS.USER_UPDATE_PROFILE_FAIL; payload: Error };

export const userUpdateProfileReducer = (
  state: UserDetailsStateType = {},
  action: UserUpdateProfileActionTypes
): UserDetailsStateType => {
  switch (action.type) {
    case USER_ACTIONS.USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_ACTIONS.USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case USER_ACTIONS.USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
