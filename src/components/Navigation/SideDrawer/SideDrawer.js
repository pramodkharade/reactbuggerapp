import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Classes from './SideDrawer.module.css';
import BackDrop from '../../UI/BackDrop/BackDrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
const sideDrawer = (props) => {
  let attachedClasses = [Classes.SideDrawer, Classes.Close];
  if (props.open) {
    attachedClasses = [Classes.SideDrawer, Classes.Open];
  }
  return (
    <Auxiliary>
          <BackDrop show={props.open} clicked={props.closed} />
    <div className={attachedClasses.join(' ')}>
            <div className={Classes.Logo}>
            <Logo/>
            </div>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
        </Auxiliary>
    );
};

export default sideDrawer;