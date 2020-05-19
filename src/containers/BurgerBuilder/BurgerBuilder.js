import React, { Component } from 'react';
import { connect } from 'react-redux';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {...}
  // }
  state = {
    purchasing: false,
    loading: false,
    error: false
  };
  componentDidMount() {
    // axios.get('/ingredients.json')
    //   .then((res) => {
    //     this.setState({
    //       ingredients: res.data
    //     });
    //     console.log('Ingredients are:', res);
    //   })
    //   .catch(error => {
    //     this.setState({
    //       error: true
    //     });
    //   })
  }
  updatePurchasableState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0

  };
  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICE[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({
  //     totalPrice: newPrice,
  //     ingredients: updatedIngredients
  //   });
  //   this.updatePurchasableState(updatedIngredients);
  // };
  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeducted = INGREDIENT_PRICE[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeducted;
  //   this.setState({
  //     totalPrice: newPrice,
  //     ingredients: updatedIngredients
  //   });
  //   this.updatePurchasableState(updatedIngredients);
  // };
  purchasingHandler =() => {
    this.setState({
      purchasing: true
    });
  };
  purchasingCancelHandler =() => {
    this.setState({
      purchasing: false
    });
  };
  purchasingContinueHandler = () => {
    //alert('You can continue!'
    this.props.history.push('/checkout');
  };
  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let OrderSummarys = null;

    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;
    if (this.props.ings) {
      burger = (<Auxiliary>
      <Burger ingredients = {this.props.ings}/>
      <BuildControls ingredientAdded={this.props.onIngredientAdded}
      ingredientRemoved={this.props.onIngredientRemoved}
      disabled = {disabledInfo}
      purchasable = {this.updatePurchasableState(this.props.ings)}
      ordered={this.purchasingHandler}
      price={this.props.price}/>
   </Auxiliary>);
      OrderSummarys = <OrderSummary ingredients={this.props.ings}
      purchasingCancelled = {this.purchasingCancelHandler}
      purchasingContinued = {this.purchasingContinueHandler}
      price={this.props.price}
      />;
    }
    if (this.state.loading) {
      OrderSummarys = <Spinner/>
    }
    return (
      <Auxiliary>
        <Modal show={this.state.purchasing} modalClosed={this.purchasingCancelHandler}>
        {OrderSummarys}
        </Modal>
            {burger}
        </Auxiliary>
      );
  }
}
const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (igName) => dispatch(burgerBuilderActions.addIngrident(igName)),
    onIngredientRemoved: (igName) => dispatch(burgerBuilderActions.removeIngrident(igName))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));