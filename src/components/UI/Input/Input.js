import React from 'react';
import Classes from './Input.module.css';
const input = (props) => {
  let inputElement = null;

  switch (props.inputtype) {
    case( 'input'):
      inputElement = <input className={Classes.InputElement} {...props}/>
      break;
    case( 'textarea'):
      inputElement = <textarea className={Classes.InputElement} {...props}/>;
      break;
    default:
      inputElement = <input className={Classes.InputElement} {...props}/>;
  }

  return (
    <div className={Classes.Input}>
        <label className={Classes.Label}>{props.label}</label>
        {inputElement}
        </div>
    );
}

export default input;