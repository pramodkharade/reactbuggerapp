import React from 'react';
import Classes from './Burger.module.css'
import BurgerIngredient from './Burgeringredient/Burgeringredient';
const Burger = (props) => {
  return (
    <div className={Classes.Burger}>
        <BurgerIngredient type='bread-top'/>
        <BurgerIngredient type='Cheese'/>
        <BurgerIngredient type='meat'/>
        <BurgerIngredient type='bread-bottom'/>
    </div>
    );
};

export default Burger;