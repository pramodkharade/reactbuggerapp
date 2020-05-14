import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import Classes from './CheckoutSummary.module.css';
const checkoutSummary = (props) => {
  return (
    <div className={Classes.CheckoutSummary}>
            <h1>We hope it taste is well!</h1>
            <div style={{
      width: '100%',
      margin: 'auto'
    }}>
        <Burger ingredients={props.ingredients}/>
        <Button
    btnType='Danger'
    clicked>CANCEL</Button>
        <Button
    btnType='Success'
    clicked>CONTINUE</Button>
    </div>
        </div>
    );
}

export default checkoutSummary;