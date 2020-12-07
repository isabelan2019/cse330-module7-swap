import React from "react";
import axios from "axios";

class InventoryDisplay extends React.Component{
    constructor(props){
      super(props);
      let allCategories=[];
      axios.get('http://localhost:5000/getAllInventory')
        .then(res => {
          // console.log(res.data);
          const data = res.data;
          console.log(data);
          
          // let eachItem=[];
          for (let i in data){
            allCategories.push(data[i]);
            // for (let j in data.items){
            //   eachItem.push(data[i].items[j]);
            // }
          }
          // this.setState({categories: allCategories});
          // this.setState({items: eachItem});
          // console.log(this.state.categories);
         
        });
        this.state={
          categories: allCategories
        }
        console.log(this.state.categories);
      // this.getInventory=this.getInventory.bind(this);
    }
    

    // getInventory(){
    //   axios.get('http://localhost:5000/getAllInventory')
    //     .then(res => {
    //       // console.log(res.data);
    //       const data = res.data;
    //       console.log(data);
    //       let allCategories=[];
    //       // let eachItem=[];
    //       for (let i in data){
    //         allCategories.push(data[i]);
    //         // for (let j in data.items){
    //         //   eachItem.push(data[i].items[j]);
    //         // }
    //       }
    //       // this.setState({categories: allCategories});
    //       // this.setState({items: eachItem});
    //       // console.log(this.state.categories);
    //       this.setState=({categories: allCategories});
    //     });
    // }
    // changeHandler(event){
    //   event.preventDefault();
    //   this.setState({[event.target.name]:event.target.value});
    // }
    // const categoryObj = "null";
    // getInventory(event){
    //   event.preventDefault();
    //   // const categoryObj={
    //   //   category:this.state.category,
    //   // };
      
        
    // }

    render(){
      return(
        <div>
          {/* <ul>
            {this.state.categories.map(data=> 
            <li key={data._id}>
              {data.category}
              <table>
                <tbody>
                  {this.state.categories.itemTypes.map(items=>
                    <InventoryTableRow key={items._id} itemName={items.itemName} quantity={items.quantity}/>)}
                </tbody>
              </table>
            </li>)}
          </ul>
          <button type="button" onClick={this.submitHandler}>Get inventory</button>       */}
          {this.state.categories}
        </div>
      )
    }
  }

  class InventoryTableRow extends React.Component{
    render(){
      return(
        <tr key={this.props.items.key}>
          <td> {this.props.items.itemName} </td>
          <td> {this.props.items.quantity} </td>
        </tr>
      )
    }
  }

  class InventoryForm extends React.Component{
    constructor(props){
      super(props);
      this.state={
        category:"",
        itemName:"",
        quantity:""
      };
      this.submitHandler=this.submitHandler.bind(this);
      this.changeHandler=this.changeHandler.bind(this);
    }
  
    changeHandler(event){
      event.preventDefault();
      this.setState({[event.target.name]:event.target.value});
    }
  
    submitHandler(event){
      event.preventDefault();
      const inventoryObj={
        category:this.state.category,
        itemName:this.state.itemName,
        quantity:this.state.quantity
      };
  
      axios.post('http://localhost:5000/insertInventory', inventoryObj)
        .then(res => console.log(res.data));
  
      this.setState({
        category:"",
        itemName:"",
        quantity:0
      });
    }
  
    render(){
      return(
        <form onSubmit={this.submitHandler}>
          {/* change to dropdown */}
          <label>
            Category:
            <input type="text" name="category" onChange={this.changeHandler} value={this.state.category}/>
          </label>
          <label>
            Item Name:
            <input type="text" name="itemName" onChange={this.changeHandler} value={this.state.itemName}/>
          </label>
          <label>
            Quantity:
            <input type="number" name="quantity" min="0" max="100" onChange={this.changeHandler} value={this.state.quantity}/>
          </label>
          <input type="submit" value="Add"/>
        </form>
      )
    }
  }

  export default InventoryDisplay;
