import React from "react";
import axios from "axios";

class CustomerCheckout extends React.Component{
    constructor(props){
        super(props);
        this.state={
            firstName:"",
            lastName:"",
            email:"",
            date: new Date,
            items:[],
            inventoryData:[]
        }
    }
   render(){
       return(
           <div>
               <label>
                   First Name:
                   <input type="text" name="firstName"/>
               </label>
               <label>
                   Last Name:
                   <input type="text" name="firstName"/>
               </label>
               <label>
                   Email:
                   <input type="text" name="firstName"/>
               </label>
               <ItemLine/>
           </div>
       )
   }
}


class ItemLine extends React.Component{

    render(){
        return (
            <div>
                <label> Item:
                    <select>
                        <option> </option>
                    </select>
                    </label>
                <label> Quantity:
                    <ItemCounter/>
                </label>
            </div>
        )
    }
}

class ItemCounter extends React.Component{
    constructor(props){
        super(props);
        this.state={
            itemNumber:0
        }
        this.increaseButton=this.increaseButton.bind(this);
        this.decreaseButton=this.decreaseButton.bind(this);
    }
    increaseButton(){
        let newValue=this.state.itemNumber+1;
        this.setState({itemNumber:newValue}); 
    }
    decreaseButton(){
        if(this.state.itemNumber>0){
            let newValue=this.state.itemNumber-1;
            this.setState({itemNumber:newValue});
        }
    
    }
    render(){
        return(
            <span>
                <button onClick={this.decreaseButton}> - </button>
                <p> {this.state.itemNumber} </p>
                <button onClick={this.increaseButton}> + </button>
            </span>
        )
    }
}

export default CustomerCheckout;