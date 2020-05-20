import * as actionType from '../actions/actionTypes';
import { updateObject } from '../../share/utility';
const INGREDIENT_PRICE = {
  salad: 0.8,
  cheese: 0.9,
  meat: 3.3,
  bacon: 0.4
};
const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT:
      const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
      };
      const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
        building: true
      }
      return updateObject(state, updatedState);
    case actionType.REMOVE_INGREDIENT:
      const updatedIng = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
      };
      const updatedIngs = updateObject(state.ingredients, updatedIng);
      const updatedStates = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
        building: true
      }
      return updateObject(state, updatedStates);
    case actionType.SET_INGREDIENTS:
      return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false,
        building: false
      });
    case actionType.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, {
        error: true
      })
    default:
      return state;
  }

}

export default reducer;