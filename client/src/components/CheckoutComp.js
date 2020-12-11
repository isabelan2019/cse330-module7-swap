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
    };
    this.getData = this.getData.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    // this.changeHandler = this.changeHandler.bind(this);
  }

  componentDidMount() {
    this.getData();
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
      [newItem.id]: newItem.quantity,
    };

    this.setState({
      items: { ...this.state.items, item },
    });
    console.log(item);
  }

  render() {
    return (
      <div>
        <form>
          <label>
            First Name:
            <input type="text" name="firstName" />
          </label>
          <label>
            Last Name:
            <input type="text" name="firstName" />
          </label>
          <label>
            Email:
            <input type="text" name="firstName" />
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
                            itemID={item._id}
                            itemName={item.itemName}
                            handleQuantityChange={this.handleQuantityChange}
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
  }

  changeHandler(event) {
    event.preventDefault();
    this.setState({ itemNumber: event.target.value });
    if (event.target.value != this.state.itemNumber) {
      return;
    } else {
      this.sendUp();
    }
  }

  sendUp() {
    const newItem = {
      id: this.state.itemID,
      quantity: this.state.itemNumber,
    };
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
          value={this.state.itemNumber}
          name="itemQuantity"
          onChange={this.changeHandler}
        />
      </span>
    );
  }
}

export default CustomerCheckout;
