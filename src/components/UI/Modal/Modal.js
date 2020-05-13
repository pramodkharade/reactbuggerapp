import React, { Component } from 'react';
import Classes from './Modal.module.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import BackDrop from '../BackDrop/BackDrop';
class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }
  render() {
    return (
      <Auxiliary>
        <BackDrop show={this.props.show}  clicked={this.props.modalClosed}/>
  <div className={Classes.Modal}
      style={{
        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: this.props.show ? '1' : '0'
      }}>
      {this.props.children}
  </div>
  </Auxiliary>
      );
  }
}


export default Modal;