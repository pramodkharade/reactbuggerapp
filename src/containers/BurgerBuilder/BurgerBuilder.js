import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
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
    axios.get('/ingredients.json')
      .then((res) => {
        this.setState({
          ingredients: res.data
        });
        console.log('Ingredients are:', res);
      })
      .catch(error => {
        this.setState({
          error: true
        });
      })
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
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Pramod Kharade',
        address: {
          street: 'Dehu-alandi Road',
          ZipCode: '433443',
          country: 'India'
        },
        email: 'test@test.com'
      },
      delivertMethod: 'fastest'
    };
    axios.post('/orders.json', order).then((res) => {
      this.setState({
        loading: false,
        purchasing: false
      });
      console.log('Order Response:', res);
    })
      .catch((error) => {
        this.setState({
          loading: false,
          purchasing: false
        });
        console.log('Error Order:', error);
      });
  };
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let OrderSummarys = null;

    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;
    if (this.state.ingredients) {
      burger = (<Auxiliary>
      <Burger ingredients = {this.state.ingredients}/>
      <BuildControls ingredientAdded={this.addIngredientHandler}
      ingredientRemoved={this.removeIngredientHandler}
      disabled = {disabledInfo}
      purchasable = {this.state.purchasable}
      ordered={this.purchasingHandler}
      price={this.state.totalPrice}/>
   </Auxiliary>);
      OrderSummarys = <OrderSummary ingredients={this.state.ingredients}
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

export default withErrorHandler(BurgerBuilder, axios);