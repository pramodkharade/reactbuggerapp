import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as orderAction from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends Component {

  componentDidMount() {
    this.props.onFetchOrder(this.props.token, this.props.userId);
  }
  render() {
    let ordersload = <Spinner/>;
    if (!this.props.loading) {
      ordersload = this.props.orders.map((order) => (<Order key={order.id}
        ingredients={order.ingredients}
        price={order.price} />));
    }
    return (<div>
      {ordersload}
    </div>)
  }
}
const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrder: (token, userId) => dispatch(orderAction.fetchOrders(token, userId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));