import * as actionTypes from './actionsTypes';
import axios from '../../axios/axios';

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authFail = (err) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: err,
  };
};

const authSuccess = (user, token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user: user,
    token: token,
  };
};

const authDone = () => {
  return {
    type: actionTypes.AUTH_DONE,
  };
};

export const clearError = () => {
  return {
    type: actionTypes.CLEAR_ERROR,
  };
};

export const auth = (identifier, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post('/user/login', {
        identifier: identifier,
        password: password,
      })
      .then((res) => {
        dispatch(authSuccess(res.data.user, res.data.token));
        dispatch(authDone());
      })
      .catch((err) => {
        if (err.response) {
          dispatch(authFail(err.response.data.msg));
        }
        if (err.request) {
          dispatch(authFail('Server Sedang Bermasalah'));
        }
        dispatch(authDone());
      });
  };
};
