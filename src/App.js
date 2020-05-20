import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Order/Orders';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as  authAction from './store/actions/index';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
class App extends Component {
  render() {
    let route = null;

    if (!this.props.isAuthenticated) {
      route = (
        <Switch>
        <Route path='/' exact component={BurgerBuilder} />
        <Route path='/auth' component={Auth} />
        <Redirect to='/'/>
      </Switch>
      );
    }
    if (this.props.isAuthenticated) {
      route = (
        <Switch>
        <Route path='/checkout' component={Checkout} />
        <Route path='/orders' component={Orders} />
        <Route path='/logout' component={Logout} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/'/>
      </Switch>
      );
    }
    return (
      <div className="App">
      <Layout>
        {route}
      </Layout>
    </div>
      );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(authAction.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
