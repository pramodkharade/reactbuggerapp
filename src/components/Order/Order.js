import React from 'react';
import Classes from './Order.module.css';
const Order = (props) => (
  <div className={Classes.Order}> 
        <p>Ingredient: Salad(2)</p>
        <p>Price: <strong>USD 4.5</strong></p>
    </div>
);

export default Order;