import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import * as actionTypes from '../actions/actionsTypes';

const initialState = {
  user: null,
  token: null,
  error: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        user: null,
        token: null,
        error: null,
        loading: true,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        user: null,
        token: null,
        error: action.error,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        user: action.user,
        token: action.token,
        error: null,
      };
    case actionTypes.AUTH_DONE:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        user: null,
        token: null,
        error: null,
        loading: false,
      };
    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: 'auth',
  storage: storage,
};

export default persistReducer(persistConfig, authReducer);
