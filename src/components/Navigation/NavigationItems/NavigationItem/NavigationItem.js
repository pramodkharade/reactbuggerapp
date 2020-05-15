import React from 'react';
import { NavLink } from 'react-router-dom';
import Classes from './NavigationItem.module.css';

const navigationItem = (props) => (
  <li className={Classes.NavigationItem}>
      <NavLink to={props.link}
  activeClassName={Classes.active}
  exact ={props.exact}
  > {props.children}</NavLink>
      </li>
);

export default navigationItem;