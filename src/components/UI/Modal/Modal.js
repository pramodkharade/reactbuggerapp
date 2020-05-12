import React from 'react';
import Classes from './Modal.module.css';
const Modal = (props) => (
  <div className={Classes.Modal}>
      {props.children}
  </div>
);

export default Modal;