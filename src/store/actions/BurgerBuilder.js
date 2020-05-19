import * as actionType from './actionTypes';

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