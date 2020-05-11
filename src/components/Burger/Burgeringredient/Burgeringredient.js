import React from 'react';
import Classes from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';
import { Component } from 'react';
class BurgerIngredient extends Component {
  render() {
    let ingredient = null;
    switch (this.props.Type) {
      case( 'bread-bottom'):
        ingredient = <div className={Classes.BreadBottom}></div>;
        break;
      case( 'bread-top'):
        ingredient = (
          <div className={Classes.BreadTop}>
            <div className={Classes.Seeds1}></div>
            <div className={Classes.Seeds2}></div>
        </div>
        );
        break;
      case( 'meat'):
        ingredient = <div className={Classes.Meat}></div>;
        break;
      case( 'cheese'):
        ingredient = <div className={Classes.Cheese}></div>;
        break;
      case( 'salad'):
        ingredient = <div className={Classes.Salad}></div>;
        break;
      case( 'bacon'):
        ingredient = <div className={Classes.Bacon}></div>;
        break;
      default:
        ingredient = null;
    }
    return ingredient;
  }
}
// eslint-disable-next-line react/no-typos
BurgerIngredient.PropTypes = {
  type: PropTypes.string.isRequired
};

export default BurgerIngredient;