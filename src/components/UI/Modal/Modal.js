import React from 'react';
import classes from './Modal.module.css';

//The modal uses inline styling to push it offscreen when show is false. 

const Modal = (props) => (
        <div 
            className={classes.Modal}
            style={{
                transform: props.show ? "translateY(0)" : "translateY(-100vh)",
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
);


export default Modal;