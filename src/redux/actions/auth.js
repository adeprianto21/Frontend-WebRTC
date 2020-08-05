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

const authSuccess = (user, token, role) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user: user,
    token: token,
    role: role,
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

export const registerUser = (name, username, email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post('/user/register', {
        name: name,
        username: username,
        email: email,
        password: password,
      })
      .then((res) => {
        dispatch(authSuccess(res.data.user, res.data.token, res.data.role));
        dispatch(authDone());
      })
      .catch((err) => {
        if (err.response) {
          dispatch(authFail(err.response.data.msg));
        }
        dispatch(authDone());
      });
  };
};

export const authUser = (identifier, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post('/user/login', {
        identifier: identifier,
        password: password,
      })
      .then((res) => {
        dispatch(authSuccess(res.data.user, res.data.token, res.data.role));
        dispatch(authDone());
      })
      .catch((err) => {
        if (err.response) {
          dispatch(authFail(err.response.data.msg));
        }
        dispatch(authDone());
      });
  };
};

export const registerAdmin = (name, username, email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post('/admin/register', {
        name: name,
        username: username,
        email: email,
        password: password,
      })
      .then((res) => {
        dispatch(authSuccess(res.data.user, res.data.token, res.data.role));
        dispatch(authDone());
      })
      .catch((err) => {
        if (err.response) {
          dispatch(authFail(err.response.data.msg));
        }
        dispatch(authDone());
      });
  };
};

export const authAdmin = (identifier, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post('/admin/login', {
        identifier: identifier,
        password: password,
      })
      .then((res) => {
        dispatch(authSuccess(res.data.user, res.data.token, res.data.role));
        dispatch(authDone());
      })
      .catch((err) => {
        if (err.response) {
          dispatch(authFail(err.response.data.msg));
        }
        dispatch(authDone());
      });
  };
};
