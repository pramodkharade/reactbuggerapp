import React from 'react';
import Classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl';
const controls = [
  {
    label: 'Salad',
    type: 'salad'
  },
  {
    label: 'Bacon',
    type: 'bacon'
  },
  {
    label: 'Cheese',
    type: 'cheese'
  },
  {
    label: 'Meat',
    type: 'meat'
  },
];
const BuildControls = (props) => (
  <div className={Classes.BuildControls}>
    <p>Price <strong>$ {props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
    <BuildControl
    key={ctrl.label}
    label={ctrl.label}
    added={() => props.ingredientAdded(ctrl.type)}
    removed ={() => props.ingredientRemoved(ctrl.type)}
    disabled={props.disabled[ctrl.type]}/>
  ))}
  <button className={Classes.OrderButton} disabled={!props.purchasable}>ORDER NOW!</button>
    </div>
);

export default BuildControls;