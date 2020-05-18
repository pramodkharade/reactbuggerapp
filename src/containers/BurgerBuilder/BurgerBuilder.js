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
import * as actionType from '../../store/actions';
const INGREDIENT_PRICE = {
  salad: 0.8,
  cheese: 0.9,
  meat: 3.3,
  bacon: 0.4
};
class BurgerBuilder extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {...}
  // }
  state = {
    ingredients: null,
    totalPrice: 0,
    purchasable: false,
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
    this.setState({
      purchasable: sum > 0
    });
  };
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchasableState(updatedIngredients);
  };
  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeducted = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeducted;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchasableState(updatedIngredients);
  };
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
    //alert('You can continue!');
    this.setState({
      loading: true
    });

    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
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
      purchasable = {this.state.purchasable}
      ordered={this.purchasingHandler}
      price={this.state.totalPrice}/>
   </Auxiliary>);
      OrderSummarys = <OrderSummary ingredients={this.props.ings}
      purchasingCancelled = {this.purchasingCancelHandler}
      purchasingContinued = {this.purchasingContinueHandler}
      price={this.state.totalPrice}
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
    ings: state.ingredients
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (igName) => dispatch({
      type: actionType.ADD_INGREDIENT,
      ingredientName: igName
    }),
    onIngredientRemoved: (igName) => dispatch({
      type: actionType.REMOVE_INGREDIENT,
      ingredientName: igName
    })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));