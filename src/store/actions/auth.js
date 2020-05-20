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
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
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
        let expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('userId', res.data.localId);
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

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthExpired((expirationDate.getTime() - new Date().getTime() / 1000)));
      }
    }
  }
}