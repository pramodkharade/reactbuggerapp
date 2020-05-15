import React from 'react';
import Classes from './Order.module.css';
const Order = (props) => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }
  const ingredientsOutput = ingredients.map(ik => {
    return <span
      key={ik.name}
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px'
      }}>{ik.name} ({ik.amount})</span>;
  });
  return (<div className={Classes.Order}> 
    <p>Ingredient: {ingredientsOutput}</p>
<p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
</div>);
}

export default Order;