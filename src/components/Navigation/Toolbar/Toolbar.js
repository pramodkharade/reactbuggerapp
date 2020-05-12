import React from 'react';
import Classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import logo from '../../Logo/Logo';
const toolBar = (props) => (
  <header className={Classes.Toolbar}>
        <div>MENU</div>
        <Logo/>
        <nav>...</nav>
    </header>
);

export default toolBar;