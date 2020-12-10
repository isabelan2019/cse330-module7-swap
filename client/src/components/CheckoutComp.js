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
      items: [],
      inventoryData: [],
    };
    this.getData = this.getData.bind(this);
    // this.changeHandler = this.changeHandler.bind(this);
  }

  componentDidMount() {
    this.getData();
    console.log(this.state.inventoryData);
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
                      <tr id={item._id} key={item._id}>
                        <td>
                          {item.itemName}
                          <input
                            type="hidden"
                            name="itemName"
                            value={item.itemName}
                          />
                        </td>
                        <td>
                          <ItemCounter />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </li>
            ))}
          </ul>
        </form>
      </div>
    );
  }
}

class ItemCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemNumber: 0,
    };
    this.increaseButton = this.increaseButton.bind(this);
    this.decreaseButton = this.decreaseButton.bind(this);
  }
  increaseButton() {
    let newValue = this.state.itemNumber + 1;
    this.setState({ itemNumber: newValue });
  }
  decreaseButton() {
    if (this.state.itemNumber > 0) {
      let newValue = this.state.itemNumber - 1;
      this.setState({ itemNumber: newValue });
    }
  }
  render() {
    return (
      <span>
        <button onClick={this.decreaseButton}> - </button>
        <p> {this.state.itemNumber} </p>
        <button onClick={this.increaseButton}> + </button>
      </span>
    );
  }
}

export default CustomerCheckout;
