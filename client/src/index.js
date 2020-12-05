import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Axios from "axios";


function App(){
  //connecting server to backend through axios: https://medium.com/better-programming/connect-your-express-and-react-applications-using-axios-c35723b6d667 
  Axios({
    method: "GET",
    url: "http://localhost:5000/",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    console.log(res.data.message);
  });

  return(
    <div>
      <NavBar />
      <LogIn />
    </div>
  );
}

function NavBar(){
  return(
    <nav>
      <button> Checkout</button>
      <button> Transactions </button>
      <button> Inventory Log</button>
    </nav>
  );
}

class LogIn extends React.Component{
  constructor(props){
    super(props);
    this.state={
      username:"",
      password:""
    }
  }
  submitHandler=(event)=>{
    event.preventDefault();

  }

  render(){
    return(
      <form onSubmit={this.submitHandler}>
        <label> 
          Username: 
          <input type="text" name="username" value={this.state.username}/>
        </label>
        <label> 
          Password: 
          <input type="password" name="password" value={this.state.password}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
    );
  } 
}

class ItemInventory extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <table>
        <tbody>
          <th> Item Type </th>
          <th> Quantity </th> 
        </tbody>
      </table>
    )
  }
}




ReactDOM.render(
  <App />,
  document.getElementById('root')
);
