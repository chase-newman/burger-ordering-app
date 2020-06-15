import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';


let controls = [
    { label: "Salad", type: "salad"},
    { label: "Cheese", type: "cheese"},
    { label: "Meat", type: "meat"},
    { label: "Bacon", type: "bacon"}
];
//My solution
// let displayControls = controls.map((el, ind) => {
//   return <BuildControl label={el.label} key={ind} />
// });

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
       {controls.map((el, ind) => {
           return <BuildControl 
                        added={() => {
                            props.ingredientAdded(el.type)
                        }}
                        removed={() => {
                            props.ingredientRemoved(el.type)
                        }}
                        label={el.label} 
                        key={ind} 
                        disabled={props.disabled[el.type]}/>
                    })}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>ORDER NOW</button>
    </div>    
);


export default buildControls;