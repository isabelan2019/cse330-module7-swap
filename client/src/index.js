import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import axios from "axios";
import InventoryDisplay from "./components/InventoryDisplayComp";
import CreateEmployee from "./components/CreateEmployee Comp";
import Login from "./components/LoginComp";
import CustomerCheckout from "./components/CheckoutComp";
import TransactionsLog from "./components/TransactionsLogComp";
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
// import InventoryDisplayTest from "./components/test";

// import InventoryForm from './components/InventoryFormComp';
// import InventoryCategory from './components/InventoryCategoryComp';

function App() {
  //connecting server to backend through axios: https://medium.com/better-programming/connect-your-express-and-react-applications-using-axios-c35723b6d667
  axios({
    method: "GET",
    url: "http://localhost:5000/",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log(res.data.message);
  });

  return (
    <div>
      <NavBar />
      <Login />
      <CreateEmployee />
      {/* <h1>SWAP Inventory</h1>
      <InventoryDisplay /> */}
      <h1> SWAP Customer Checkout</h1>
      <CustomerCheckout />
      {/* <h1> SWAP Transactions Log</h1>
      <TransactionsLog /> */}
    </div>
  );
}

class NavBar extends React.Component {
  // constructor(props){
  //   super(props);
  // }
  render(){
    return (
      <div>
        <Router>
        <nav>
          <button><Link to="/">Home</Link></button>
          <button> <Link to="/checkout">Checkout</Link></button>
          <button> <Link to="/transactions">Transactions</Link> </button>
          <button> <Link to="/inventory">Inventory Log</Link></button>

        </nav>
        <Switch>
          <Route path="/checkout" component={CustomerCheckout}/>
          <Route path="/transactions" component={TransactionsLog}/>
          <Route path="/inventory" component={InventoryDisplay}/>
        </Switch>
        </Router>
      </div>

    );

  }
  
}

// class CreateEmployee extends React.Component{
//   constructor(props){
//     super(props);
//     this.state={
//       firstName:"",
//       lastName:"",
//       username:"",
//       password:"",
//       verification:""
//     }
//     this.submitHandler=this.submitHandler.bind(this);
//     this.changeHandler=this.changeHandler.bind(this);
//   }
//   changeHandler(event){
//     event.preventDefault();
//     this.setState({[event.target.name]:event.target.value});
//   }
//   submitHandler(event){
//     event.preventDefault();

//     const employeeObj={
//       firstName:this.state.firstName,
//       lastName:this.state.lastName,
//       username:this.state.username,
//       password:this.state.password,
//       verification:this.state.verification
//     };

//     axios.post('http://localhost:5000/createEmployees', employeeObj)
//       .then(res => console.log(res.data));

//     this.setState({
//       firstName:"",
//       lastName:"",
//       username:"",
//       password:"",
//       verification:""
//     });

//   }

//   render(){
//     return(
//       <form onSubmit={this.submitHandler}>
//          <label>
//           First Name:
//           <input type="text" name="firstName" onChange={this.changeHandler} value={this.state.firstName}/>
//         </label>
//         <label>
//           Last Name:
//           <input type="text" name="lastName" onChange={this.changeHandler} value={this.state.lastName}/>
//         </label>
//         <label>
//           Username:
//           <input type="text" name="username" onChange={this.changeHandler} value={this.state.username}/>
//         </label>
//         <label>
//           Password:
//           <input type="password" name="password" onChange={this.changeHandler} value={this.state.password}/>
//         </label>
//         <label>
//           Verification Code:
//           <input type="password" name="verification" onChange={this.changeHandler} value={this.state.verification}/>
//         </label>
//         <input type="submit" value="Submit"/>
//       </form>
//     );
//   }
// }

// class InventoryCategory extends React.Component{
//   constructor(props){
//     super(props);
//     this.state={
//       category:"",
//       itemType:""
//     };
//     this.submitHandler=this.submitHandler.bind(this);
//     this.changeHandler=this.changeHandler.bind(this);
//   }

//   changeHandler(event){
//     event.preventDefault();
//     this.setState({[event.target.name]:event.target.value});
//   }

//   submitHandler(event){
//     event.preventDefault();
//     const categoryObj={
//       category:this.state.category,
//       itemType:this.state.itemType
//     };
//     axios.post('http://localhost:5000/addInventoryCategory', categoryObj)
//       .then(res => console.log(res.data));
//   }

//   render(){
//     return(
//       <form onSubmit={this.submitHandler}>
//         <label>
//           Category:
//           <input type="text" name="category" onChange={this.changeHandler} value={this.state.category}/>
//         </label>
//         {/* <label>
//           Item Type:
//           <input type="text" name="itemType" onChange={this.changeHandler} value={this.state.itemType}/>
//         </label> */}
//         <input type="submit" value="Add"/>
//       </form>
//     )
//   }

// }
// class InventoryForm extends React.Component{
//   // axios.get('http://localhost:5000/addInventoryCategory', )
//   constructor(props){
//     super(props);
//     this.state={
//       category:"",
//       itemName:"",
//       quantity:""
//     };
//     this.submitHandler=this.submitHandler.bind(this);
//     this.changeHandler=this.changeHandler.bind(this);
//   }

//   changeHandler(event){
//     event.preventDefault();
//     this.setState({[event.target.name]:event.target.value});
//   }

//   submitHandler(event){
//     event.preventDefault();
//     const inventoryObj={
//       category:this.state.category,
//       itemName:this.state.itemName,
//       quantity:this.state.quantity
//     };

//     axios.post('http://localhost:5000/insertInventory', inventoryObj)
//       .then(res => console.log(res.data));

//     this.setState({
//       category:"",
//       itemName:"",
//       quantity:0
//     });
//   }

//   render(){
//     return(
//       <form onSubmit={this.submitHandler}>
//         {/* change to dropdown */}
//         <label>
//           Category:
//           <input type="text" name="category" onChange={this.changeHandler} value={this.state.category}/>
//         </label>
//         <label>
//           Item Name:
//           <input type="text" name="itemName" onChange={this.changeHandler} value={this.state.itemName}/>
//         </label>
//         <label>
//           Quantity:
//           <input type="number" name="quantity" min="0" max="100" onChange={this.changeHandler} value={this.state.quantity}/>
//         </label>
//         <input type="submit" value="Add"/>

//       </form>
//     )
//   }
// }

// class CategoryDisplay extends React.Component{
//   constructor(props){
//     super(props);
//     this.state={
//       categories:[],
//       // itemType:"",
//     };
//     this.submitHandler=this.submitHandler.bind(this);
//     this.changeHandler=this.changeHandler.bind(this);
//   }

//   changeHandler(event){
//     event.preventDefault();
//     this.setState({[event.target.name]:event.target.value});
//   }
//   // const categoryObj = "null";
//   submitHandler(event){
//     event.preventDefault();
//     // const categoryObj={
//     //   category:this.state.category,
//     // };
//     axios.get('http://localhost:5000/getAllInventory')
//       .then(res => {
//         // console.log(res.data);
//         const data = res.data;
//         console.log(data);
//         let allCategories=[];
//         for (let i in data){
//           allCategories.push(data[i]);
//         }
//         this.setState({categories: allCategories});
//         // console.log(this.state.categories);
//       });

//   }

//   render(){
//     return(
//       <div>
//         <ul>
//           {this.state.categories.map(data=> <li key={data._id}>{data.category}</li>)}
//         </ul>
//         <button type="button" onClick={this.submitHandler}>Get inventory</button>
//       </div>
//     )
//   }

// }

// class ItemInventory extends React.Component{
//   constructor(props){
//     super(props);
//   }
//   render(){
//     return(
//       <table>
//         <tbody>
//           <tr>
//             <th> Item Type </th>
//             <th> Quantity </th>
//           </tr>

//         </tbody>
//       </table>
//     )
//   }
// }

// class CategoryDisplay extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {val: 0};
//     this.plus = this.plus.bind(this);
//     this.minus = this.minus.bind(this);
//   }
//   plus(){
//     //increment
//     console.log("up");
//     this.setState( state => ({
//       val: state.val + 1
//     }));
//     //call item inventory to update the dynamic display
//   }
//   minus(){
//     //increment
//     console.log("down");
//     if (this.state.val >0 ) {
//       this.setState( state => ({
//         val: state.val - 1
//       }));
//     }


ReactDOM.render(<App />, document.getElementById("root"));
