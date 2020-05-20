import * as actionTypes from './actionTypes';
import axios from 'axios';
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
};
export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId
  }
};
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
}
export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}
export const checkAuthExpired = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};
export const authenticate = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authSuccess());
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + actionTypes.API_KEY;
    if (!isSignUp) {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + actionTypes.API_KEY;
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
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthExpired(res.data.expiresIn));
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.error));
      });
  }
}
export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}