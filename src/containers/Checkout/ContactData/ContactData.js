import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Classes from './ContactData.module.css'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };
  orderHandler =(event) => {
    console.log('Form Data:', this.props.ingredients, this.props.price);
    event.preventDefault();
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Pramod Kharade',
        address: {
          street: 'Dehu-alandi Road',
          ZipCode: '433443',
          country: 'India'
        },
        email: 'test@test.com'
      },
      delivertMethod: 'fastest'
    };
    axios.post('/orders.json', order).then((res) => {
      this.setState({
        loading: false,
      });
      console.log('Order Response:', res);
      this.props.history.push('/');
    })
      .catch((error) => {
        this.setState({
          loading: false,

        });
        console.log('Error Order:', error);
      });
  }
  render() {
    let form = (
    <form>
          <Input inputtype='input' type="text" placeholder=" Your Name" name="name"/>
          <Input inputtype='input' type="text" placeholder=" Your Email" name="email"/>
          <Input inputtype='input' type="text" placeholder="Street" name="street"/>
          <Input inputtype='input' type="text" placeholder="Postal Code" name="postalcode"/>
          <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
      </form>);
    if (this.state.loading) {
      form = <Spinner/>;
    }
    return (
      <div className={Classes.ContactData}>
              <h4>Enter your contact data!</h4>
              {form}
          </div>
      );
  }
}

export default ContactData;