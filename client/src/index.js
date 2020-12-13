import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import axios from "axios";
// import InventoryDisplay from "./components/InventoryDisplayComp";
// import CreateEmployee from "./components/CreateEmployee Comp";
import Login from "./components/LoginComp";
// import CustomerCheckout from "./components/CheckoutComp";
// import TransactionsLog from "./components/TransactionsLogComp";
// import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
// import NavBar from "./components/NavBarComp";

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
      {/* <NavBar /> */}
      <Login />
      {/* <h1>SWAP Inventory</h1>
      <InventoryDisplay /> */}
      {/* <h1> SWAP Customer Checkout</h1>
      <CustomerCheckout /> */}
      {/* <h1> SWAP Transactions Log</h1>
      <TransactionsLog /> */}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
