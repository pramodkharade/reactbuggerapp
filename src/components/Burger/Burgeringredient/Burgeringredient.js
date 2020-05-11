import React, { Component } from 'react';
import Classes from './Burgeringredient.module.css';
import propTypes from 'prop-types';
class BurgerIngredient extends Component {
  render() {
    let ingredient = null;
    switch (this.props.type) {
      case( 'bread-bottom'):
        ingredient = <div className={Classes.BreadBottom}></div>;
        console.log('Calling Ingredient bottom', this.props.Type);
        break;
      case( 'bread-top'):
        console.log('Calling Ingredient top', this.props.Type);
        ingredient = (
          <div className={Classes.BreadTop}>
            <div className={Classes.Seeds1}></div>
            <div className={Classes.Seeds2}></div>
        </div>
        );
        break;
      case( 'meat'):
        console.log('Calling Ingredient Meat', this.props.Type);
        ingredient = <div className={Classes.Meat}></div>;
        break;
      case( 'Cheese'):
        console.log('Calling Ingredient cheese', this.props.Type);
        ingredient = <div className={Classes.Cheese}></div>;
        break;
      case( 'salad'):
        ingredient = <div className={Classes.Salad}></div>;
        break;
      case( 'bacon'):
        ingredient = <div className={Classes.Bacon}></div>;
        break;
      default:
        console.log('Calling Ingredient Default', this.props.Type);
        ingredient = null;
    }
    return ingredient;
  }
}
// eslint-disable-next-line react/no-typos
BurgerIngredient.propTypes = {
  type: propTypes.string.isRequired
};

export default BurgerIngredient;