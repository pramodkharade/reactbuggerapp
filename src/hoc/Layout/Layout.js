import React, { Component } from 'react';
import { connect } from 'react-redux';
import Auxiliary from '../Auxiliary/Auxiliary';
import Classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
class Layout extends Component {
  state = {
    showSideDrawer: false
  };
  sideDrawerHandler = () => {
    this.setState({
      showSideDrawer: false
    });
  }
  sideDrawerToggleHandler = () => {
    this.setState((preState) => {
      return {
        showSideDrawer: !preState.showSideDrawer
      }
    });
  };
  render() {
    return ( <Auxiliary>
      <Toolbar
      isAuth={this.props.isAuthenticated}
      drawerToggleClicked={this.sideDrawerToggleHandler}/>
      <SideDrawer
      isAuth={this.props.isAuthenticated}
      show={this.state.showSideDrawer}
      open={this.state.showSideDrawer}
      closed={this.sideDrawerHandler}/>
      <main className={Classes.Content}>
          {this.props.children}
      </main>
      </Auxiliary>);
  }

}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
}
export default connect(mapStateToProps)(Layout);