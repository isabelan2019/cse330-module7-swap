// import React from "react";
// import axios from "axios";

// class InventoryForm extends React.Component{
//     constructor(props){
//       super(props);
//       this.state={
//         category:"",
//         itemName:"",
//         quantity:""
//       };
//       this.submitHandler=this.submitHandler.bind(this);
//       this.changeHandler=this.changeHandler.bind(this);
//     }
  
//     changeHandler(event){
//       event.preventDefault();
//       this.setState({[event.target.name]:event.target.value});
//     }
  
//     submitHandler(event){
//       event.preventDefault();
//       const inventoryObj={
//         category:this.state.category,
//         itemName:this.state.itemName,
//         quantity:this.state.quantity
//       };
  
//       axios.post('http://localhost:5000/insertInventory', inventoryObj)
//         .then(res => console.log(res.data));
  
//       this.setState({
//         category:"",
//         itemName:"",
//         quantity:0
//       });
//     }
  
//     render(){
//       return(
//         <form onSubmit={this.submitHandler}>
//           {/* change to dropdown */}
//           <label>
//             Category:
//             <input type="text" name="category" onChange={this.changeHandler} value={this.state.category}/>
//           </label>
//           <label>
//             Item Name:
//             <input type="text" name="itemName" onChange={this.changeHandler} value={this.state.itemName}/>
//           </label>
//           <label>
//             Quantity:
//             <input type="number" name="quantity" min="0" max="100" onChange={this.changeHandler} value={this.state.quantity}/>
//           </label>
//           <input type="submit" value="Add"/>
  
//         </form>
//       )
//     }
//   }
//   export default InventoryForm;