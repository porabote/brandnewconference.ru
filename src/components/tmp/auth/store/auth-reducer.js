import {
  AUTH_CHECK,
  AUTH_CHECK_SUCCESS,
  LOGIN,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from './auth-types';

const initialState = {
  isAuth: false,
  access_token: null,
  user: {
    account_alias: "",
    api_id: null,
    avatar: "",
    exp: 0,
    iat: 0,
    id: null,
    name: "",
    post_name: "",
    role_id: null,
    username: "",
  },
  dictsRequired: [
    "accounts",
  ],
};

const authReducer = (store = initialState, action) => {
  switch (action.type) {
    case AUTH_CHECK_SUCCESS:
        return {
          ...store,
          isAuth: true,
          access_token: action.payload.access_token,
          user: JSON.parse(localStorage.getItem('porabote_user')),
        }
    case LOGIN_REQUEST:
      return {...store}
    case LOGIN_SUCCESS:
      return {
        ...store,
        isAuth: true,
        user: {...action.payload.user},
        access_token: action.payload.access_token,
      }
    case LOGIN_FAILURE:
      return {...store, isAuth: false, authError: action.payload}
    case LOGOUT:
      return {...store, isAuth: false}
    default: return store
  }
};

export default authReducer;