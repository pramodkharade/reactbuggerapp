import Auxiliary from '../../hoc/Auxiliary';
import Classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import React, { Component } from 'react';
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
      <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
      <SideDrawer show={this.state.showSideDrawer} open={this.state.showSideDrawer} closed={this.sideDrawerHandler}/>
      <main className={Classes.Content}>
          {this.props.children}
      </main>
      </Auxiliary>);
  }

}

export default Layout;