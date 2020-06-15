import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';



const burger = (props) => {
    
    //My solution
    let arr = [];
    let ing = Object.keys(props.ingredients)
            .forEach(ingKey => {
                let num = props.ingredients[ingKey]
                for(let i = 0; i < num; i++) {
                    arr.push(ingKey);
                }
            });
    ing = arr.map((ing, ind) => {
           return <BurgerIngredient key={ind} type={ing} />
        });
  //if array is empty show a message to user to add ingredients
   if(arr.length === 0) {
       ing = <p>Please Start Adding Ingredients</p>
   }     
   
    
    
    //Course Solution:Turning the props object into an array via Object.keys
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
        // create an array with the build Array method for JS, which 
        // uses the # of each of ingredients type to fill the array to render the correct amount of each ingredient
        // Array(2) === [" ", " "]
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
        });
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []);
    
    //if the array is empty show a message to user to add ingredients
    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please Start Adding Ingredients</p>
    } 

    
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
                {ing}
           <BurgerIngredient type="bread-bottom" />
        </div>
    );  
};

export default burger;