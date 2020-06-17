import React, {Component} from 'react';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';
import classes from './Modal.module.css';

//The modal uses inline styling to push it offscreen when show is false. 

class Modal extends Component {
    
    //Checks to see if modal and order summary updates are necessary to improve performance
    //and if orderSummary has changed aka props.children to load the spinner
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.show !== this.props.show || nextProps.children !== this.props.children) {
            return true
        } else {
            return false
        }
    }
    
    
     
    render() {
        return (
            <Aux>
                <Backdrop 
                    show={this.props.show} 
                    clicked={this.props.modalClosed}/>
                    <div 
                        className={classes.Modal}
                        style={{
                            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
                            opacity: this.props.show ? '1' : '0'
                        }}>
                        {this.props.children}
                    </div>
            </Aux>    
        );
    };
        
};


export default Modal;