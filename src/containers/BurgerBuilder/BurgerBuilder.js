import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
class BurgerBuilder extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {...}
  // }
  state = {
    ingredients: {
      salad: 2,
      cheese: 2,
      bacon: 3,
      meat: 2
    }
  };
  render() {
    return (
      <Auxiliary>
            <Burger ingredients = {this.state.ingredients}/>
            <div>
                Burger Controls
            </div>
        </Auxiliary>
      );
  }
}

export default BurgerBuilder;