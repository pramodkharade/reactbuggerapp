import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
const OrderSummary = (props) => {
  const integrdientSummary = Object.keys(props.ingredients)
    .map((igKey) => {
      return (<li key={igKey}>
                <span style={{
          textTransform: 'capitalize'
        }}>{igKey} </span>
                : {props.ingredients[igKey]}
             </li>);
    });
  return (
    <Auxiliary>
        <h3> Your Order</h3>
        <p>A delicious burger  with following integrdients:</p>
  <ul>{integrdientSummary}</ul>
  <p>Continue with Checkout ?</p>
    </Auxiliary>
    );
};

export default OrderSummary;