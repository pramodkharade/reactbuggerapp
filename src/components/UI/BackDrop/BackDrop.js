import React from 'react';
import Classes from './BackDrop.module.css'
const backDrop = (props) => (
props.show ? <div className={Classes.BackDrop} onClick={props.clicked}></div> : null
);

export default backDrop;