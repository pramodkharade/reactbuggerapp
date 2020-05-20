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
export const authenticate = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authSuccess());
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCeu1_NGdFW4o9LQm2_Wj-kxVqckWHSk';
    if (!isSignUp) {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCeu1_NGdFW4o9LQm2_Wj-kxVqckWHSk";
    }
    console.log('sign up state', isSignUp);
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    axios.post(url, authData)
      .then((res) => {
        console.log('Sign up Sucess', res);
        dispatch(authSuccess(res.data));
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  }
}