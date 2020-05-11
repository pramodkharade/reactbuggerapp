import React from 'react';
import Classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl';
const controls = [
  {
    label: 'Cheese',
    type: 'cheese'
  },
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
        {controls.map(ctrl => (
    <BuildControl key={ctrl.label} label={ctrl.label}/>
  ))}
    </div>
);

export default BuildControls;