import React from 'react';
import Classes from './Button.module.css'
const Button = (props) => (

  <button className={[Classes.Button, Classes[props.btnType]].join(' ')} onClick={props.clicked}>{props.children}</button>
);

export default Button;