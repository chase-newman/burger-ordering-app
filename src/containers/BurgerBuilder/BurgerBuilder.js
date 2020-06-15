import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class builder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0, 
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }
    
    purchaseHandler = () => {
        this.setState({purchasing: true})
    }
    
    updatePurchaseState = (ingredients) => {
        //my solution
        ingredients = Object.values(ingredients)
        let sum = ingredients.reduce((a,b) => a + b);
        
        //couse solution
        //create an array of values and reduce that a array to single number
        // const sum = Object.keys(ingredients)
        //     .map(igKey => {
        //       return ingredients[igKey] 
        //     })
        //     .reduce((sum, el) => {
        //         return sum + el;
        //     },0);
        this.setState({purchasable: sum > 0});
    }
    
    addIngredientHandler = (type) => {
        //old count will be the previous count of the ingredient selected
        const oldCount = this.state.ingredients[type];
        //add an additional ingredient
        const updatedCount = oldCount + 1;
        //create a new ingredients object by coping the current
        //ingredient object stored in state
        const updatedIngredients = {
            ...this.state.ingredients
        };
        //adjust the new ingredient object counts to reflect
        // the new additional ingredient added
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        //update state with new price and ingredient totals
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }
    
    removeIngredientHandler = (type) => {
         //old count will be the previous count of the ingredient selected
        const oldCount = this.state.ingredients[type];
        if(oldCount > 0) {
            //remove the selected ingredient
            const updatedCount = oldCount - 1;
            //create a new ingredients object by coping the current
            //ingredient object stored in state
            const updatedIngredients = {
                ...this.state.ingredients
            };
            //adjust the new ingredient object counts to reflect
            // the new additional ingredient added
            updatedIngredients[type] = updatedCount;
            const priceReduction = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceReduction;
            //update state with new price and ingredient totals
            this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
            this.updatePurchaseState(updatedIngredients);
        } else {
            return;   
        }
    }
    
    
    render() {
        //Make a copy of ingredients
        const disabledInfo = {
            ...this.state.ingredients
        };
        //loop through the ingredients copy and check if the ingredients are greater than 0
        //returning true or false
        for(let key in disabledInfo) {
            //this will return true of false
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        //ex. {salad: true, meat: true, etc...}
        return (
            <Aux>
                <Modal show={this.state.purchasing}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    price={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo} 
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}/>
            </Aux>
        );
    }
}


export default builder;