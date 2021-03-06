import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Classes from './Auth.module.css';
import * as authAction from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Your Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 7
        },
        valid: false,
        touched: false
      },

    },
    isSignUp: true
  }
  componentDidMount() {
    if (!this.props.buildBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
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
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
    }

    return isValid;

  }
  switchSignupAuthHandler = () => {
    this.setState(prevState => {
      console.log('Switch Handler', prevState);
      return {
        isSignUp: !prevState.isSignUp
      }
    });
  }
  inputChangedhandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    };
    this.setState({
      controls: updatedControls
    });
  }
  submitHandler =(event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp);
  }
  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let form = formElementsArray.map(formElement => (
      <Input key={formElement.id}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      changed={(event) => this.inputChangedhandler(event, formElement.id)}
      inValid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      valueType={formElement.id} />
    ));
    if (this.props.loading) {
      form = <Spinner/>;
    }
    let errorMessage = null;

    if (this.props.error) {
      errorMessage = (<p style={{
        color: 'red'
      }}>{this.props.error.message}</p>);
    }
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath}/>
    }
    return (
      <div className={Classes.Auth}>
        {authRedirect}
        {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success" >Submit </Button>
                </form>
                <Button
      btnType='Danger'
      clicked={this.switchSignupAuthHandler} >SWITCH TO {this.state.isSignUp ? 'SIGN-IN' : 'SIGN-UP'}</Button>
            </div>
      );
  }
}
const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(authAction.authenticate(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(authAction.setAuthRedirectPath('/'))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);