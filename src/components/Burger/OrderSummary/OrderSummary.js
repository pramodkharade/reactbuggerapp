import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';
class OrderSummary extends Component {
  componentWillUpdate() {
    console.log('Calling order Summary');
  }
  render() {
    const integrdientSummary = Object.keys(this.props.ingredients)
      .map((igKey) => {
        return (<li key={igKey}>
                <span style={{
            textTransform: 'capitalize'
          }}>{igKey} </span>
                : {this.props.ingredients[igKey]}
             </li>);
      });
    return (
      <Auxiliary>
        <h3> Your Order</h3>
        <p>A delicious burger  with following integrdients:</p>
        <ul>{integrdientSummary}</ul>
        <p><strong>Total Price: {this.props.price}</strong></p>
        <p>Continue with Checkout ?</p>
        <Button btnType='Danger' clicked={this.props.purchasingCancelled}>CANCEL</Button>
        <Button btnType='Success' clicked={this.props.purchasingContinued}>CONTINUE</Button>
     </Auxiliary>
      );
  }
}


export default OrderSummary;