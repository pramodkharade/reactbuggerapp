import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Classes from './ContactData.module.css'
class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  };
  orderHandler =(event) => {
    console.log('Form Data:', this.props.ingredients);
    event.preventDefault();
  }
  render() {
    return (
      <div className={Classes.ContactData}>
              <h4>Enter your contact data!</h4>
              <form>
                  <input className={Classes.Input} type="text" placeholder=" Your Name" name="name"/>
                  <input className={Classes.Input} type="text" placeholder=" Your Email" name="email"/>
                  <input className={Classes.Input} type="text" placeholder="Street" name="street"/>
                  <input className={Classes.Input} type="text" placeholder="Postal Code" name="postalcode"/>
                  <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
              </form>
          </div>
      );
  }
}

export default ContactData;