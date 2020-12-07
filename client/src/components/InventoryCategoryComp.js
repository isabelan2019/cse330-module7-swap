// import React from "react";
// import axios from "axios";


// class InventoryCategory extends React.Component{
//     constructor(props){
//       super(props);
//       this.state={
//         category:"",
//         itemType:""
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
//       const categoryObj={
//         category:this.state.category,
//         itemType:this.state.itemType
//       };
//       axios.post('http://localhost:5000/addInventoryCategory', categoryObj)
//         .then(res => console.log(res.data));
//     }
  
//     render(){
//       return(
//         <form onSubmit={this.submitHandler}>
//           <label>
//             Category:
//             <input type="text" name="category" onChange={this.changeHandler} value={this.state.category}/>
//           </label>
//           {/* <label>
//             Item Type:
//             <input type="text" name="itemType" onChange={this.changeHandler} value={this.state.itemType}/>
//           </label> */}
//           <input type="submit" value="Add"/>
//         </form>
//       )
//     }
//   }

//   export default InventoryCategory;