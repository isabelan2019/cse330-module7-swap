import React from "react";
import axios from "axios";

class InventoryPage extends React.Component{
  render(){
    return(
      <div>
        <InventoryDisplay/>
        <InventoryCategory/>
        <InventoryForm/>
      </div>
    )
  }
}

class InventoryDisplay extends React.Component{
    constructor(props){
      super(props);
      this.state={
        inventoryData: [],
      }
      this.getData=this.getData.bind(this);
      this.deleteItem=this.deleteItem.bind(this);
      this.editQuantity=this.editQuantity.bind(this);
    }

    componentDidMount(){
      this.getData();
    }

    getData(){
      axios.get('http://localhost:5000/getAllInventory')
        .then(res => {
          let allCategories=[];
          const data = res.data;  
          console.log(data);                  
          for (let i in data){
            allCategories.push(data[i]);
            let allItemTypes=[];
            for (let j in data[i].itemTypes){
              allItemTypes.push(data[i].itemTypes[j]);
            }
            allCategories[i].itemTypes=allItemTypes;         
          }
          this.setState({inventoryData:allCategories});          
        });
    }

    deleteItem(event){
      event.preventDefault();
      const itemID=event.target.parentNode.parentNode.id
      const categoryID=event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
      const deletedObject={
        categoryID:categoryID,
        itemID:itemID
      }
      axios.post('http://localhost:5000/deleteInventoryItem',deletedObject)
        .then(res=>console.log(res.data));
    }

    editQuantity(event){
      event.preventDefault();
      const itemID=event.target.parentNode.parentNode.id
      const categoryID=event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
      const editObject={
        categoryID:categoryID,
        itemID:itemID
      }
      axios.post('http://localhost:5000/editInventoryQuantity',editObject)
        .then(res=>console.log(res.data));
    }
    

    render(){
      if(!this.state.inventoryData){
        return null;
      }
      return(
        <div>
          <ul>
            {this.state.inventoryData.map((data)=>
            <li key={data._id} id={data._id}>
              <h2>{data.category}</h2>
              <table>
                <tbody>
                <tr>
                  <th> Item Name </th>
                  <th> Quantity</th>
                  <th> Actions</th>
                </tr>
                {data.itemTypes.map((item)=>
                  <tr id={item._id} key={item._id}>
                    <td> {item.itemName} </td> 
                    <td> {item.quantity} </td>
                    <td> 
                      <input type="button" onClick={this.editQuantity} value="Edit Quantity" />
                      <input type="button" onClick={this.deleteItem} value="Delete Item"/>
                    </td>
                  </tr>
                  )}
                </tbody>
              </table>
            </li>)}
          </ul>
        </div>
      )
    }
  }

  class InventoryCategory extends React.Component{
    constructor(props){
      super(props);
      this.state={
        category:"",
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
      const categoryObj={
        category:this.state.category,
        itemType:this.state.itemType
      };
      axios.post('http://localhost:5000/addInventoryCategory', categoryObj)
        .then(res => {
          console.log(res.data)
          });

    }

    render(){
      return(
        <form onSubmit={this.submitHandler}>
          <label>
            Category:
            <input type="text" name="category" onChange={this.changeHandler} value={this.state.category}/>
          </label>
          <input type="submit" value="Add"/>
        </form>
      )
    }
  }

  class InventoryForm extends React.Component{
    constructor(props){
      super(props);
      this.state={
        category:"",
        itemName:"",
        quantity:"",
        inventoryData:[]
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
        _id:this.state.category,
        itemName:this.state.itemName,
        quantity:this.state.quantity
      };
  
      axios.post('http://localhost:5000/insertInventory', inventoryObj)
        .then(res => console.log(res.data));
  
      this.setState({
        category:"",
        itemName:"",
        quantity:""
      });
    }
    
    componentDidMount(){
      this.getData();
    }

    getData(){
      axios.get('http://localhost:5000/getAllInventory')
        .then(res => {
          let allCategories=[];
          const data = res.data;  
          console.log(data);                  
          for (let i in data){
            allCategories.push(data[i]);
            let allItemTypes=[];
            for (let j in data[i].itemTypes){
              allItemTypes.push(data[i].itemTypes[j]);
            }
            allCategories[i].itemTypes=allItemTypes;         
          }
          this.setState({inventoryData:allCategories});  
                
        });
    }

    render(){
      return(
        <form onSubmit={this.submitHandler}>
          {/* change to dropdown */}
          <label>
            Category:
            {/* <input type="text" name="category" onChange={this.changeHandler} value={this.state.category}/> */}
            <select name="category" value={this.state.category} onChange={this.changeHandler}>
            <option value="" disabled hidden> 
                Select a Category
            </option>
              {this.state.inventoryData.map((category)=>
              <option key={category._id} value={category._id}> {category.category} </option>)}
          </select>
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

  export default InventoryPage;
