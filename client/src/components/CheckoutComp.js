import React from "react";
import axios from "axios";

class CustomerCheckout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      date: new Date(),
      items: {},
      inventoryData: [],
      viewSummary: false,
      totalWeight: 0,
      totalPrice: 0,
      itemsForSummary: [],
    };
    this.getData = this.getData.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.submitCheckout = this.submitCheckout.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.getCalculations = this.getCalculations.bind(this);
    // this.changeHandler = this.changeHandler.bind(this);
  }
  changeHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  componentDidMount() {
    this.getData();
    this.setState({ viewSummary: false });
  }

  getData() {
    axios.get("http://localhost:5000/getAllInventory").then((res) => {
      let allCategories = [];
      const data = res.data;
      console.log(data);
      for (let i in data) {
        allCategories.push(data[i]);
        let allItemTypes = [];
        for (let j in data[i].itemTypes) {
          allItemTypes.push(data[i].itemTypes[j]);
        }
        allCategories[i].itemTypes = allItemTypes;
      }
      this.setState({ inventoryData: allCategories });
    });
  }

  handleQuantityChange(newItem) {
    let item = {
      [newItem.itemID]: {
        quantity: newItem.quantity,
        itemName: newItem.itemName,
        categoryID: newItem.categoryID,
      },
    };

    this.setState({
      items: Object.assign(this.state.items, item),
    });
  }

  submitCheckout(event) {
    event.preventDefault();
    const customerCheckoutObj = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      date: this.state.date,
      items: this.state.items,
    };
    axios.post("/customerCheckout", customerCheckoutObj).then((res) => {
      console.log(res.data);
    });

    axios
      .post(
        "http://localhost:5000/customerCheckoutChangeInventory",
        customerCheckoutObj
      )
      .then((res) => {
        console.log(res.data);
      });

    this.setState({ viewSummary: true });
    this.setState({ itemsForSummary: Object.values(this.state.items) });
    this.getCalculations();
  }

  getCalculations() {
    // const summaryInfo = {
    //   items: this.state.items,
    // };
    const summaryItems = Object.values(this.state.items);
    console.log("line 94");
    console.log(summaryItems);
    axios.get("/getAllInventory").then((res) => {
      console.log(res.data);
      let totalPrice = 0;
      let totalWeight = 0;
      for (let i in summaryItems) {
        let eachItemPrice = 0;
        let eachItemWeight = 0;
        for (let j in res.data) {
          if (summaryItems[i].categoryID === res.data[j]._id) {
            eachItemPrice = res.data[j].priceEstimate;
            eachItemWeight = res.data[j].weightEstimate;
            console.log(eachItemPrice);
            console.log(eachItemWeight);
          }
        }
        let eachTotalPrice = eachItemPrice * summaryItems[i].quantity;
        let eachTotalWeight = eachItemWeight * summaryItems[i].quantity;
        totalPrice = totalPrice + eachTotalPrice;
        totalWeight = totalWeight + eachTotalWeight;
      }

      this.setState({
        weight: totalWeight,
        price: totalPrice,
      });
    });
    // axios.post("/summaryCalculations", summaryInfo).then((res) => {
    //   const data = res.data;
    //   let totalPrice = 0;
    //   let totalWeight = 0;
    //   for (let i in data) {
    //     let eachItemPrice = data[i].priceEstimate * summaryItems[i].quantity;
    //     totalPrice = totalPrice + eachItemPrice;
    //     let eachItemWeight = data[i].weightEstimate * summaryItems[i].quantity;
    //     totalWeight = totalWeight + eachItemWeight;
    //   }
    //   this.setState({
    //     weight: totalWeight,
    //     price: totalPrice,
    //   });
    // });
  }
  render() {
    const notHours = false;
    let notOpen;
    if (notHours) {
      notOpen = (
        <div>
          <h1>Welcome to SWAP</h1>
          <p>It is not currently hours</p>
        </div>
      );
    } else {
    }
    return (
      <div>
        {notOpen}
        <h1>SWAP Customer Checkout</h1>
        <form onSubmit={this.submitCheckout}>
          <label>
            First Name:
            <input onChange={this.changeHandler} type="text" name="firstName" />
          </label>
          <label>
            Last Name:
            <input onChange={this.changeHandler} type="text" name="lastName" />
          </label>
          <label>
            Email:
            <input onChange={this.changeHandler} type="text" name="email" />
          </label>
          <ul>
            {this.state.inventoryData.map((data) => (
              <li key={data._id} id={data._id}>
                <h2>{data.category}</h2>
                <table>
                  <tbody>
                    <tr>
                      <th> Item Name </th>
                      <th> Quantity</th>
                    </tr>
                    {data.itemTypes.map((item) => (
                      <tr key={item._id}>
                        <td>
                          {item.itemName}
                          <ItemLine
                            categoryID={data._id}
                            itemID={item._id}
                            itemName={item.itemName}
                            handleQuantityChange={this.handleQuantityChange}
                            maxQuantity={item.quantity}
                          />
                          {/* <input
                            type="hidden"
                            name={"itemName/" + item._id}
                            value={item.itemName}
                          /> */}
                        </td>
                        {/* <td>
                          <ItemLine />
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </li>
            ))}
          </ul>
          <input type="submit" value="Checkout" />
        </form>
        {this.state.viewSummary && (
          <Summary
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            customerItems={this.state.itemsForSummary}
            weight={this.state.weight}
            price={this.state.price}
          />
        )}
      </div>
    );
  }
}

class ItemLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemID: this.props.itemID,
      itemNumber: 0,
    };
    // this.increaseButton = this.increaseButton.bind(this);
    // this.decreaseButton = this.decreaseButton.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.sendUp = this.sendUp.bind(this);
  }

  changeHandler(event) {
    event.preventDefault();
    this.setState({ itemNumber: event.target.value });
    this.sendUp(event.target.value);
    // if (event.target.value != this.state.itemNumber) {
    //   return;
    // } else {
    //   this.sendUp();
    // }
  }

  sendUp(value) {
    const newItem = {
      categoryID: this.props.categoryID,
      itemID: this.state.itemID,
      quantity: value,
      itemName: this.props.itemName,
    };
    console.log(newItem.quantity);
    this.props.handleQuantityChange(newItem);
  }
  // increaseButton(event) {
  //   event.preventDefault();
  //   let newValue = this.state.itemNumber + 1;
  //   this.setState({ itemNumber: newValue });
  //   this.changeHandler();
  // }
  // decreaseButton(event) {
  //   event.preventDefault();
  //   if (this.state.itemNumber > 0) {
  //     let newValue = this.state.itemNumber - 1;
  //     this.setState({ itemNumber: newValue });
  //   }
  //   this.changeHandler();
  // }

  render() {
    // this.changeHandler();
    return (
      <span>
        {/* <input
          id={this.props.itemID}
          type="hidden"
          name={"itemName/" + this.props.itemID}
          value={this.props.itemName}
        /> */}
        {/* <button onClick={this.decreaseButton}>-</button>
        <p> {this.state.itemNumber} </p> */}
        {/* <input
          id={this.props.itemID}
          type="hidden"
          name={"quantity/" + this.props.itemID}
          value={this.state.itemNumber}
          onChange={this.changeHandler}
        /> */}
        {/* <button onClick={this.increaseButton}>+</button> */}
        <input
          type="number"
          min="0"
          max={this.props.maxQuantity}
          value={this.state.itemNumber}
          name="itemQuantity"
          onChange={this.changeHandler}
        />
      </span>
    );
  }
}

class Summary extends React.Component {
  render() {
    return (
      <div>
        <h2>Thank you for coming to SWAP, {this.props.firstName}!</h2>
        <p>Today, you got: </p>
        <ul>
          {this.props.customerItems.map((data, index) => (
            <li key={index}>
              {data.itemName}: {data.quantity}
            </li>
          ))}
        </ul>
        <p>
          You saved approximately {this.props.weight} lbs worth of clothing from
          waste and also approximately ${this.props.price}.
        </p>
      </div>
    );
  }
}
export default CustomerCheckout;
