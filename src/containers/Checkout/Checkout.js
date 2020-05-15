import React, { Component } from "react";
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';
class Checkout extends Component {
  state = {
    ingredients: {}
  };
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {

      ingredients[param[0]] = +param[1];
    }
    this.setState({
      ingredients: ingredients
    });
  }
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  render() {
    return (
      <div>
                <CheckoutSummary ingredients = {this.state.ingredients}
      checkoutCancelled={this.checkoutCancelledHandler}
      checkoutContinued={this.checkoutContinuedHandler}/>
       
       <Route
      path={this.props.match.path + '/contact-data'}
      render={(props) => (<ContactData ingredients={this.state.ingredients} {...props} />)}
      />
            </div>
      );
  }
}

export default Checkout;