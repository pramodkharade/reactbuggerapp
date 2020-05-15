import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Classes from './ContactData.module.css'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 6
        },
        valid: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {
              value: 'fastest',
              displayValue: 'Fastest'
            },
            {
              value: 'cheapest',
              displayValue: 'Cheapest'
            }
          ]
        },
        value: '',
        valid: false
      }
    },
    loading: false
  };
  orderHandler =(event) => {
    console.log('Form Data:', this.props.ingredients, this.props.price);
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: formData
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
  checkValidity=(value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    return isValid;

  }
  inputChangedhandler = (event, inputidentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputidentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(event.target.value, updatedFormElement.validation)
    console.log('form Obj Validation::', updatedFormElement);
    updatedOrderForm[inputidentifier] = updatedFormElement;
    this.setState({
      orderForm: updatedOrderForm
    });
  }
  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
    <form onSubmit={this.orderHandler}>
          {formElementsArray.map((formElement, index) => {
      return (<Input elementType={formElement.config.elementType}
        key={formElement.id}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value} changed={(event) => this.inputChangedhandler(event, formElement.id)}/>);
    })}
          <Button btnType='Success'>ORDER</Button>
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