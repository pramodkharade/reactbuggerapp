import * as actionType from './actionTypes';
import axios from '../../axios-orders';
export const addIngrident = (name) => {
  return {
    type: actionType.ADD_INGREDIENT,
    ingredientName: name
  };
}
export const removeIngrident = (name) => {
  return {
    type: actionType.REMOVE_INGREDIENT,
    ingredientName: name
  };
}

export const setIngredients = (ingredients) => {
  return {
    type: actionType.SET_INGREDIENTS,
    ingredients: ingredients
  };
}
export const fetchIngredientsFailed = () => {
  return {
    type: actionType.FETCH_INGREDIENTS_FAILED
  };
}
export const initIngredient = () => {
  return dispatch => {
    axios.get('/ingredients.json')
      .then((res) => {
        dispatch(setIngredients(res.data));
        console.log('Ingredients are:', res);
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed(error));
      })
  }
}