import React from "react";
import axios from "axios";

class InventoryDisplay extends React.Component{
    constructor(props){
      super(props);
      // const allCategories=[
        //{_id:"a", 
        //category:"shirts", 
        //itemTypes:[{
          //itemName:"tshirt", 
          //quantity:0}]}, 
        //{_id:"b", 
        //category:"pants",
        //itemTypes:[{
          //itemName:"jeans",
          //quantity:4}]}, 
        //{_id:"c",
        //category:"athleticwear", 
        //itemTypes:[{itemName:"leggings",
        //quantity:5}]
      //}];
      
        this.state={
          inventoryData: []
        }
        this.getData=this.getData.bind(this);
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
      // const test=this.state.inventoryData;
      // console.log(test.category);
      // const testMap=test.map((data)=><p>{data.category}</p>)
      // if (this.state.inventoryData.length > 0) 
      //   {console.log(this.state.inventoryData[0].category)};
      if(this.state.inventoryData.length==0){
        return null;
      }
      else{
        return(
          <div>
            <div>
            <ul>
              {this.state.inventoryData.map((data)=>
              <li key={data._id}>
                <h2>{data.category}</h2>
                <div>
                <table>
                  <tbody>
                  <th>
                    <td> Item Name </td>
                    <td> Quantity</td>
                    <td> Actions</td>
                  </th>
                  {data.itemTypes.map((item)=>
                    <tr id={item._id} key={item._id}>
                      <td> {item.itemName} </td> 
                      <td> {item.quantity} </td>
                      <td> 
                        <input type="button" value="edit" />
                        <input type="button" value="delete"/>
                      </td>
                    </tr>
                    // <InventoryTableRow key={items._id} itemName={items.itemName} quantity={items.quantity}/>
                    )}
                  </tbody>
                </table>
                </div>
              </li>)}
            </ul>
            {/* <button type="button" onClick={this.submitHandler}>Get inventory</button>       */}
            </div>
            <InventoryCategory/>
            <InventoryForm/>
          </div>
        )
      }
      
    }
  }

  // class InventoryTableRow extends React.Component{
  //   render(){
  //     return(
  //       <tr key={this.props.items.key}>
  //         <td> {this.props.items.itemName} </td>
  //         <td> {this.props.items.quantity} </td>
  //       </tr>
  //     )
  //   }
  // }

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
        .then(res => console.log(res.data));
    }

    render(){
      return(
        <form onSubmit={this.submitHandler}>
          <label>
            Category:
            <input type="text" name="category" onChange={this.changeHandler} value={this.state.category}/>
          </label>
          {/* <label>
            Item Type:
            <input type="text" name="itemType" onChange={this.changeHandler} value={this.state.itemType}/>
          </label> */}
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
  
    render(){
      return(
        <form onSubmit={this.submitHandler}>
          {/* change to dropdown */}
          <label>
            Category:
            {/* <input type="text" name="category" onChange={this.changeHandler} value={this.state.category}/> */}
            <InventoryDropDown onChange={this.changeHandler}/>
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

  class InventoryDropDown extends React.Component{
    constructor(props){
      super(props);
      this.state={
        inventoryData:[]
      }
      // this.changeHandler=this.changeHandler.bind(this);
    }

    // changeHandler(event){
    //   event.preventDefault();
    //   this.setState({[event.target.name]:event.target.value});
    // }

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
        <select name="category" onChange={this.props.changeHandler}>
          {this.state.inventoryData.map((category)=>
          <option key={category._id} value={category._id}> {category.category} </option>)}
        </select>
      )
    }
  }
  export default InventoryDisplay;
