import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };
  componentDidMount() {
    axios.get('/orders.json')
      .then((res) => {
        let fetchData = [];
        for (let key in res.data) {
          fetchData.push({
            ...res.data[key],
            id: key
          });
        }
        console.log('Response Orders', fetchData);
        this.setState({
          loading: false,
          orders: fetchData
        });
      })
      .catch(error => {
        this.setState({
          loading: false
        });
        console.log('Error Order', error);
      });
  }
  render() {
    return (<div>
      {this.state.orders.map((order) => (<Order key={order.id}
        ingredients={order.ingredients}
        price={order.price} />))}
    </div>)
  }
}

export default withErrorHandler(Orders, axios);