import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Classes from './sideDrawer.module.css';
const sideDrawer = (props) => {
  return (
    <div className={Classes.SideDrawer}>
            <Logo/>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
    );
};

export default sideDrawer;