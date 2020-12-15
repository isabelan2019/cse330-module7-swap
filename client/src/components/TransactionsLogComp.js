import React from "react";
import axios from "axios";
import "./../index.css";


class TransactionsLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionsData: [],
    };
    this.getData = this.getData.bind(this);
    this.getLastMonth = this.getLastMonth.bind(this);
    this.getLastDay = this.getLastDay.bind(this);
    this.getLastWeek = this.getLastWeek.bind(this);
    this.getLastYear = this.getLastYear.bind(this);
    this.getLastHour = this.getLastHour.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios.get("http://localhost:5000/getTransactions").then((res) => {
      let allTransactions = [];
      const data = res.data;
      for (let i in data) {
        let dateISO = new Date(data[i].date);
        let date = dateISO.toLocaleString();
        allTransactions.push(data[i]);
        allTransactions[i].date = date;
        let allItems = [];
        let customerInfo = [];
        for (let j in data[i].items) {
          allItems.push(data[i].items[j]);
        }
        for (let k in data[i].customer) {
          customerInfo.push(data[i].customer[k]);
        }
        allTransactions[i].items = allItems;
        allTransactions[i].customer = customerInfo;
      }
      this.setState({ transactionsData: allTransactions });
    });
  }
  getLastHour() {
    axios.get("http://localhost:5000/getLastHour").then((res) => {
      let allTransactions = [];
      const data = res.data;
      for (let i in data) {
        let dateISO = new Date(data[i].date);
        let date = dateISO.toLocaleString();
        allTransactions.push(data[i]);
        allTransactions[i].date = date;
        let allItems = [];
        let customerInfo = [];
        for (let j in data[i].items) {
          allItems.push(data[i].items[j]);
        }
        for (let k in data[i].customer) {
          customerInfo.push(data[i].customer[k]);
        }
        allTransactions[i].items = allItems;
        allTransactions[i].customer = customerInfo;
      }
      this.setState({ transactionsData: allTransactions });
    });
  }
  getLastDay() {
    axios.get("http://localhost:5000/getLastDay").then((res) => {
      let allTransactions = [];
      const data = res.data;
      for (let i in data) {
        let dateISO = new Date(data[i].date);
        let date = dateISO.toLocaleString();
        allTransactions.push(data[i]);
        allTransactions[i].date = date;
        let allItems = [];
        let customerInfo = [];
        for (let j in data[i].items) {
          allItems.push(data[i].items[j]);
        }
        for (let k in data[i].customer) {
          customerInfo.push(data[i].customer[k]);
        }
        allTransactions[i].items = allItems;
        allTransactions[i].customer = customerInfo;
      }
      this.setState({ transactionsData: allTransactions });
    });
  }
  getLastWeek() {
    axios.get("http://localhost:5000/getLastWeek").then((res) => {
      let allTransactions = [];
      const data = res.data;
      for (let i in data) {
        let dateISO = new Date(data[i].date);
        let date = dateISO.toLocaleString();
        allTransactions.push(data[i]);
        allTransactions[i].date = date;
        let allItems = [];
        let customerInfo = [];
        for (let j in data[i].items) {
          allItems.push(data[i].items[j]);
        }
        for (let k in data[i].customer) {
          customerInfo.push(data[i].customer[k]);
        }
        allTransactions[i].items = allItems;
        allTransactions[i].customer = customerInfo;
      }
      this.setState({ transactionsData: allTransactions });
    });
  }

  getLastMonth() {
    axios.get("http://localhost:5000/getLastMonth").then((res) => {
      let allTransactions = [];
      const data = res.data;
      for (let i in data) {
        let dateISO = new Date(data[i].date);
        let date = dateISO.toLocaleString();
        allTransactions.push(data[i]);
        allTransactions[i].date = date;
        let allItems = [];
        let customerInfo = [];
        for (let j in data[i].items) {
          allItems.push(data[i].items[j]);
        }
        for (let k in data[i].customer) {
          customerInfo.push(data[i].customer[k]);
        }
        allTransactions[i].items = allItems;
        allTransactions[i].customer = customerInfo;
      }
      this.setState({ transactionsData: allTransactions });
    });
  }

  getLastYear() {
    axios.get("http://localhost:5000/getLastYear").then((res) => {
      let allTransactions = [];
      const data = res.data;
      for (let i in data) {
        let dateISO = new Date(data[i].date);
        let date = dateISO.toLocaleString();
        allTransactions.push(data[i]);
        allTransactions[i].date = date;
        let allItems = [];
        let customerInfo = [];
        for (let j in data[i].items) {
          allItems.push(data[i].items[j]);
        }
        for (let k in data[i].customer) {
          customerInfo.push(data[i].customer[k]);
        }
        allTransactions[i].items = allItems;
        allTransactions[i].customer = customerInfo;
      }
      this.setState({ transactionsData: allTransactions });
    });
  }
  sortDate(){
    // const obj = "date";
    // axios.get("http://localhost:5000/getTransactions", obj).then((res) => {
    //   let allTransactions = [];
    //   const data = res.data;
    //   console.log("transaction data");
    //   console.log(data);
    //   for (let i in data) {
    //     allTransactions.push(data[i]);
    //     let allItems = [];
    //     let customerInfo = [];
    //     for (let j in data[i].items) {
    //       allItems.push(data[i].items[j]);
    //     }
    //     for (let k in data[i].customer) {
    //       customerInfo.push(data[i].customer[k]);
    //     }
    //     allTransactions[i].items = allItems;
    //     allTransactions[i].customer = customerInfo;
    //   }
    //   this.setState({ transactionsData: allTransactions });
    // });
  
  }
  sortName(){

  }

  render() {
    console.log(this.state.transactionsData);
    const isLoggedIn = sessionStorage.getItem("username");
    // let notLoggedIn ;
    // let inventory;

    if (!this.state.transactionsData) {
      return null;
    } else if (!isLoggedIn) {
      //no username set
      return <p>You are not logged in.</p>;
    }
    return (
      <div>
        <label for="All">Sort by: </label>
        <input type="button" value="All" onClick={this.getData} />
        <input type="button" value="Last hour" onClick={this.getLastHour} />
        <input type="button" value="Last day" onClick={this.getLastDay} />
        <input type="button" value="Last week" onClick={this.getLastWeek} />
        <input type="button" value="Last month" onClick={this.getLastMonth} />
        <input type="button" value="Last year" onClick={this.getLastYear} />
        <br/><br/>
        <table id="transactionsTable">
          <tbody>
            <tr>
              <th id="transactionDate" > Date and Time </th>
              <th> First Name &ensp;</th>
              <th> Last Name &ensp;</th>
              <th> Email &ensp;</th>
              <th> Items &ensp;</th>
            </tr>
            {this.state.transactionsData.map((data) => (
              <tr key={data._id}>
                <td>{data.date} </td>
                <td> {data.customer[0]} </td>
                <td> {data.customer[1]}</td>
                <td> {data.customer[2]} </td>
                <td>
                  <ul>
                    {data.items.map((item) => (
                      <li key={item._id}>
                        {item.quantity} {item.itemName}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TransactionsLog;
