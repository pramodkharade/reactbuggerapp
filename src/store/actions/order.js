import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
}

export const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error: error
  }
}
export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
}
export const purchaseBurger = (orderData) => {

  return dispatch => {
    dispatch(purchaseBurgerStart())
    axios.post('/orders.json', orderData)
      .then((res) => {
        dispatch(purchaseBurgerSuccess(res.data.name, orderData));
        console.log('Order Response:', res);
      })
      .catch((error) => {
        dispatch(purchaseBurgerFailed(error))
        console.log('Error Order:', error);
      });
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

export const fetchOrderSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders: orders
  }
}
export const fetchOrderFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDER_FAIL,
    error: error
  }
}

export const fetchOrderSart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START
  }
}

export const fetchOrders = () => {
  return dispatch => {
    axios.get('/orders.json')
      .then((res) => {
        let fetchData = [];
        for (let key in res.data) {
          fetchData.push({
            ...res.data[key],
            id: key
          });
        }
        dispatch(fetchOrderSuccess(fetchData));
        console.log('Response Orders', fetchData);

      })
      .catch(error => {
        dispatch(fetchOrderFail(error));
        console.log('Error Order', error);
      });
  }
}