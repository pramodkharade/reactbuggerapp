import * as actionTypes from './actionTypes';
import axios from 'axios';
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
};
export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  }
};
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
}
export const authenticate = (email, password) => {
  return dispatch => {
    dispatch(authSuccess());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCeu1_NGdFW4o9LQm2_Wj-kxVqckWHSk-4', authData)
      .then((res) => {
        console.log('Sign up Sucess', res);
        dispatch(authSuccess(res.data));
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  }
}