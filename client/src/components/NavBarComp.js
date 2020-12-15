import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
import "./../index.css";

// import axios from "axios";
import CustomerCheckout from "./CheckoutComp";
import TransactionsLog from "./TransactionsLogComp";
import InventoryDisplay from "./InventoryDisplayComp";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

class NavBar extends React.Component {
  // constructor(props){
  //   super(props);
  // }
  render() {
    // const hasSession = sessionStorage.getItem("username");
    return (
      <div>
        <Router>
          <nav id="employeeNav">
            {/* <button>
                <Link to="/">Home</Link>
              </button> */}
            <br />
            <Link className="link" to="/checkout">
              Checkout
            </Link>
            <Link className="link" to="/transactions">
              Transactions
            </Link>
            <Link className="link" to="/inventory">
              Inventory Log
            </Link>
            <br />
            <br />
          </nav>
          <Switch>
            <Route path="/checkout" component={CustomerCheckout} />
            <Route path="/transactions" component={TransactionsLog} />
            <Route path="/inventory" component={InventoryDisplay} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default NavBar;
