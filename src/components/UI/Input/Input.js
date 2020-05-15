import React from 'react';
import Classes from './Input.module.css';
const input = (props) => {
  let inputElement = null;

  switch (props.elementType) {
    case( 'input'):
      inputElement = <input  className={Classes.InputElement}
      {...props.elementConfig}
      value={props.value}/>
      break;
    case( 'textarea'):
      inputElement = <textarea className={Classes.InputElement}
      {...props.elementConfig}
      value={props.value}/>;
      break;
    case( 'select'):
      inputElement = (<select className={Classes.InputElement}
      value={props.value}>
          {props.elementConfig.options.map((op) => (
        <option key={op.value} value={op.value}>{op.displayValue}</option>
      ))}
      </select>);
      break;
    default:
      inputElement = <input className={Classes.InputElement}
      {...props.elementConfig}
      value={props.value}/>;
  }

  return (
    <div className={Classes.Input}>
        <label className={Classes.Label}>{props.label}</label>
        {inputElement}
        </div>
    );
}

export default input;