import React from "react";
import axios from "axios";

class InventoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newCategory: "",
      category: "",
      itemName: "",
      quantity: "",
      inventoryData: [],
    };
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.getData = this.getData.bind(this);
    this.submitCategory = this.submitCategory.bind(this);
    this.handleInventoryChange = this.handleInventoryChange.bind(this);
    this.submitInventoryForm = this.submitInventoryForm.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.editQuantity = this.editQuantity.bind(this);
    // this.sendInventoryDisplay = this.sendInventoryDisplay.bind(this);
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

  // sendInventoryDisplay() {
  //   this.getData();
  // }

  handleCategoryChange(newCategory) {
    this.setState({ category: newCategory });
  }

  submitCategory(newCategory) {
    const categoryObj = {
      category: newCategory,
    };

    axios
      .post("http://localhost:5000/addInventoryCategory", categoryObj)
      .then((res) => {
        console.log(res.data);
        // this.setState((prev) => {
        //   console.log(prev);
        //   return { category: prev.categories.push(res) };
        // });
      });
  }

  handleInventoryChange(newInventory) {
    this.setState({
      category: newInventory._id,
      itemName: newInventory.itemName,
      quantity: newInventory.quantity,
    });
  }

  submitInventoryForm(event) {
    event.preventDefault();
    const inventoryObj = {
      _id: this.state.category,
      itemName: this.state.itemName,
      quantity: this.state.quantity,
    };

    axios
      .post("http://localhost:5000/insertInventory", inventoryObj)
      .then((res) => console.log(res.data));

    this.setState({
      category: "",
      itemName: "",
      quantity: "",
    });
  }

  deleteItem(ids) {
    // const itemID = event.target.parentNode.parentNode.id;
    // const categoryID =
    //   event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
    const deletedObject = {
      categoryID: ids.categoryID,
      itemID: ids.itemID,
    };

    axios
      .post("http://localhost:5000/deleteInventoryItem", deletedObject)
      .then((res) => console.log(res.data));
  }

  editQuantity(ids) {
    // event.preventDefault();
    // const itemID = event.target.parentNode.parentNode.id;
    // const categoryID =
    //   event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
    const editObject = {
      categoryID: ids.categoryID,
      itemID: ids.itemID,
    };

    axios
      .post("http://localhost:5000/editInventoryQuantity", editObject)
      .then((res) => console.log(res.data));
  }
  render() {
    return (
      <div>
        <InventoryDisplay
          displayCategory={this.state.inventoryData}
          deleteItem={this.deleteItem}
          editQuantity={this.editQuantity}
        />
        <InventoryCategory
          onCategoryChange={this.handleCategoryChange}
          submitCategory={this.submitCategory}
          newCategoryValue={this.state.category}
        />
        <InventoryForm
          onInventoryChange={this.handleInventoryChange}
          submitInventory={this.submitInventoryForm}
          displayCategory={this.state.inventoryData}
          categoryValue={this.state.category}
          itemName={this.state.itemName}
          quantity={this.state.quantity}
        />
      </div>
    );
  }
}

class InventoryCategory extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   category: "",
    // };
    // this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(event) {
    event.preventDefault();
    this.props.onCategoryChange(event.target.value);
    // this.setState({ [event.target.name]: event.target.value });
  }

  // submitHandler(event) {
  //   event.preventDefault();
  // const categoryObj = {
  //   category: this.props.category,
  // };

  // axios
  //   .post("http://localhost:5000/addInventoryCategory", categoryObj)
  //   .then((res) => {
  //     console.log(res.data);
  // this.setState((prev) => {
  //   console.log(prev);
  //   return { category: prev.categories.push(res) };
  // });
  // });
  // }

  render() {
    return (
      <form onSubmit={this.props.submitCategory}>
        <label>
          Category:
          <input
            type="text"
            name="category"
            onChange={this.changeHandler}
            value={this.props.categoryValue}
          />
        </label>
        <input type="submit" value="Add" />
      </form>
    );
  }
}

class InventoryForm extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   category: "",
    //   itemName: "",
    //   quantity: "",
    //   inventoryData: [],
    // };
    // this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(event) {
    event.preventDefault();
    // this.setState({ [event.target.name]: event.target.value });
    this.props.onInventoryChange(event.target.value);
  }

  // submitHandler(event) {
  //   event.preventDefault();
  //   const inventoryObj = {
  //     [event.target.name]: event.target.value,
  //   };
  // }
  //   axios
  //     .post("http://localhost:5000/insertInventory", inventoryObj)
  //     .then((res) => console.log(res.data));

  //   this.setState({
  //     category: "",
  //     itemName: "",
  //     quantity: "",
  //   });
  // }

  // componentDidMount() {
  //   this.getData();
  // }

  // getData() {
  //   axios.get("http://localhost:5000/getAllInventory").then((res) => {
  //     let allCategories = [];
  //     const data = res.data;
  //     console.log(data);
  //     for (let i in data) {
  //       allCategories.push(data[i]);
  //       let allItemTypes = [];
  //       for (let j in data[i].itemTypes) {
  //         allItemTypes.push(data[i].itemTypes[j]);
  //       }
  //       allCategories[i].itemTypes = allItemTypes;
  //     }
  //     this.setState({ inventoryData: allCategories });
  //   });
  // }

  render() {
    return (
      <form onSubmit={this.props.submitInventory}>
        {/* change to dropdown */}
        <label>
          Category:
          {/* <input type="text" name="category" onChange={this.changeHandler} value={this.state.category}/> */}
          <select
            name="_id"
            value={this.props.category}
            onChange={this.changeHandler}
          >
            <option value="" disabled hidden>
              Select a Category
            </option>
            {this.props.displayCategory.map((category) => (
              <option key={category._id} value={category._id}>
                {" "}
                {category.category}{" "}
              </option>
            ))}
          </select>
        </label>
        <label>
          Item Name:
          <input
            type="text"
            name="itemName"
            onChange={this.changeHandler}
            value={this.props.itemName}
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            min="0"
            max="100"
            onChange={this.changeHandler}
            value={this.props.quantity}
          />
        </label>
        <input type="submit" value="Add" />
      </form>
    );
  }
}

class InventoryDisplay extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   inventoryData: [],
    // };
    // this.getData = this.getData.bind(this);
    // this.deleteItem = this.deleteItem.bind(this);
    // this.editQuantity = this.editQuantity.bind(this);
    this.deleteInventory = this.deleteInventory.bind(this);
    this.editInventory = this.editInventory.bind(this);
  }

  // componentDidMount() {
  //   this.getData();
  // }

  // getData() {
  //   axios.get("http://localhost:5000/getAllInventory").then((res) => {
  //     let allCategories = [];
  //     const data = res.data;
  //     console.log(data);
  //     for (let i in data) {
  //       allCategories.push(data[i]);
  //       let allItemTypes = [];
  //       for (let j in data[i].itemTypes) {
  //         allItemTypes.push(data[i].itemTypes[j]);
  //       }
  //       allCategories[i].itemTypes = allItemTypes;
  //     }
  //     this.setState({ inventoryData: allCategories });
  //   });
  // }

  // deleteItem(event) {
  //   event.preventDefault();
  //   const itemID = event.target.parentNode.parentNode.id;
  //   const categoryID =
  //     event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
  //   const deletedObject = {
  //     categoryID: categoryID,
  //     itemID: itemID,
  //   };

  //   axios
  //     .post("http://localhost:5000/deleteInventoryItem", deletedObject)
  //     .then((res) => console.log(res.data));
  // }

  // editQuantity(event) {
  //   event.preventDefault();
  //   const itemID = event.target.parentNode.parentNode.id;
  //   const categoryID =
  //     event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
  //   const editObject = {
  //     categoryID: categoryID,
  //     itemID: itemID,
  //   };

  //   axios
  //     .post("http://localhost:5000/editInventoryQuantity", editObject)
  //     .then((res) => console.log(res.data));
  // }
  deleteInventory(event) {
    const ids = {
      itemID: event.target.parentNode.parentNode.id,
      categoryID:
        event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id,
    };
    this.props.deleteItem(ids);
  }
  editInventory(event) {
    const ids = {
      itemID: event.target.parentNode.parentNode.id,
      categoryID:
        event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id,
    };
    this.props.editQuantity(ids);
  }
  render() {
    if (!this.props.displayCategory) {
      return null;
    }
    return (
      <div>
        <ul>
          {this.props.displayCategory.map((data) => (
            <li key={data._id} id={data._id}>
              <h2>{data.category}</h2>
              <table>
                <tbody>
                  <tr>
                    <th> Item Name </th>
                    <th> Quantity</th>
                    <th> Actions</th>
                  </tr>
                  {data.itemTypes.map((item) => (
                    <tr id={item._id} key={item._id}>
                      <td> {item.itemName} </td>
                      <td> {item.quantity} </td>
                      <td>
                        <input
                          type="button"
                          onClick={this.editInventory}
                          value="Edit Quantity"
                        />
                        <input
                          type="button"
                          onClick={this.deleteInventory}
                          value="Delete Item"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default InventoryPage;
