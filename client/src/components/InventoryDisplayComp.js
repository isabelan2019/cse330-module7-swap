import React from "react";
import axios from "axios";
import "./../index.css";


class InventoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newCategory: "",
      weightEstimate: 0,
      priceEstimate: 0,
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
    this.deleteCategoryInInventory = this.deleteCategoryInInventory.bind(this);
    // this.sendInventoryDisplay = this.sendInventoryDisplay.bind(this);
  }

  componentDidMount() {
    this.getData();
    console.log(this.state.inventoryData);
  }

  getData() {
    axios.get("/getAllInventory").then((res) => {
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

  handleCategoryChange(newCategoryObj) {
    this.setState({
      [newCategoryObj.name]: newCategoryObj.value,
    });
  }

  submitCategory(newCategoryObj) {
    const categoryObj = {
      category: newCategoryObj.category,
      price: newCategoryObj.price,
      weight: newCategoryObj.weight,
    };

    axios
      .post("http://localhost:5000/addInventoryCategory", categoryObj)
      .then((res) => {
        console.log(res.data);
        // this.setState((prev) => {
        //   console.log(prev);
        //   return { category: prev.categories.push(res) };
        // });
        this.getData();
        this.setState({ newCategory: "" });
      });

    this.setState({
      newCategory: "",
      priceEstimate: 0,
      weightEstimate: 0,
    });
  }

  handleInventoryChange(newInventory) {
    this.setState({
      [newInventory.name]: newInventory.value,
    });
  }

  submitInventoryForm(inventoryForm) {
    const inventoryObj = {
      _id: inventoryForm.category,
      itemName: inventoryForm.itemName,
      quantity: inventoryForm.quantity,
    };

    axios
      .post("http://localhost:5000/insertInventory", inventoryObj)
      .then((res) => {
        console.log(res.data);
        this.getData();
      });

    this.setState({
      category: "",
      itemName: "",
      quantity: 0,
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
      .then((res) => {
        console.log(res.data);
        this.getData();
      });
  }

  deleteCategoryInInventory(id) {
    const deletedObject = {
      categoryID: id,
    };

    axios
      .post("http://localhost:5000/deleteCategory", deletedObject)
      .then((res) => {
        console.log(res.data);
        this.getData();
      });
  }
  editQuantity(ids) {
    // event.preventDefault();
    // const itemID = event.target.parentNode.parentNode.id;
    // const categoryID =
    //   event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
    const editObject = {
      categoryID: ids.categoryID,
      itemID: ids.itemID,
      quantity: ids.quantity,
    };

    axios
      .post("http://localhost:5000/editInventoryQuantity", editObject)
      .then((res) => {
        console.log(res.data);
        this.getData();
      });
  }
  render() {
    const isLoggedIn = sessionStorage.getItem("username");
    let notLoggedIn;
    let inventory;
    if (!isLoggedIn) {
      //no username set
      notLoggedIn = <p>You are not logged in.</p>;
    } else {
      inventory = (
        <div>
          <InventoryDisplay
            displayCategory={this.state.inventoryData}
            deleteItem={this.deleteItem}
            editQuantity={this.editQuantity}
            deleteCategoryInInventory={this.deleteCategoryInInventory}
          />
          <InventoryCategory
            handleCategoryChange={this.handleCategoryChange}
            submitCategory={this.submitCategory}
            newCategoryValue={this.state.newCategory}
            weightEstimateValue={this.state.weightEstimate}
            priceEstimateValue={this.state.priceEstimate}
          />
          <InventoryForm
            handleInventoryChange={this.handleInventoryChange}
            submitInventoryForm={this.submitInventoryForm}
            displayCategory={this.state.inventoryData}
            categoryValue={this.state.category}
            itemNameValue={this.state.itemName}
            quantityValue={this.state.quantity}
          />
        </div>
      );
    }
    return (
      <div>
        {notLoggedIn}
        {inventory}
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
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(event) {
    event.preventDefault();
    const nameAttr = event.target.name;
    const valueAttr = event.target.value;
    // this.setState({ [event.target.name]: event.target.value });
    this.props.handleCategoryChange({
      name: nameAttr,
      value: valueAttr,
    });
    // this.setState({ [event.target.name]: event.target.value });
  }

  submitHandler(event) {
    event.preventDefault();
    const categoryObj = {
      category: this.props.newCategoryValue,
      weight: this.props.weightEstimateValue,
      price: this.props.priceEstimateValue,
    };
    this.props.submitCategory(categoryObj);
  }

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
      <form onSubmit={this.submitHandler}>
        <label>
          New Category:
          <input
            type="text"
            name="newCategory"
            onChange={this.changeHandler}
            value={this.props.newCategoryValue}
          />
        </label>
        <label>
          Price Estimate:
          <input
            type="number"
            name="priceEstimate"
            min="0"
            step="0.01"
            onChange={this.changeHandler}
            value={this.props.priceEstimateValue}
          />
        </label>
        <label>
          Weight Estimate:
          <input
            type="number"
            name="weightEstimate"
            min="0"
            step="0.01"
            onChange={this.changeHandler}
            value={this.props.weightEstimateValue}
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
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(event) {
    event.preventDefault();
    const nameAttr = event.target.name;
    const valueAttr = event.target.value;
    // this.setState({ [event.target.name]: event.target.value });
    this.props.handleInventoryChange({
      name: nameAttr,
      value: valueAttr,
    });
  }

  submitHandler(event) {
    event.preventDefault();
    const inventoryObj = {
      category: this.props.categoryValue,
      itemName: this.props.itemNameValue,
      quantity: this.props.quantityValue,
    };
    this.props.submitInventoryForm(inventoryObj);
  }

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        {/* change to dropdown */}
        <label>
          Add Item - 
          {/* <input type="text" name="category" onChange={this.changeHandler} value={this.state.category}/> */}
          <select
            name="category"
            value={this.props.categoryValue}
            onChange={this.changeHandler}
          >
            <option value="" disabled hidden>
              Select a Category
            </option>
            {this.props.displayCategory.map((category) => (
              <option key={category._id} value={category._id}>
                {category.category}
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
            value={this.props.itemNameValue}
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
            value={this.props.quantityValue}
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
    //   newQuantity: "",
    //   view: false,
    // };
    // this.state = {
    //   inventoryData: [],
    // };
    // this.getData = this.getData.bind(this);
    // this.deleteItem = this.deleteItem.bind(this);
    // this.editQuantity = this.editQuantity.bind(this);
    this.deleteInventory = this.deleteInventory.bind(this);
    this.editInventory = this.editInventory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    // this.changeHandler = this.changeHandler.bind(this);
    // this.showEdit = this.showEdit.bind(this);
  }

  deleteInventory(item) {
    // const ids = {
    //   itemID: event.target.parentNode.parentNode.id,
    //   categoryID:
    //     event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id,
    // };
    this.props.deleteItem(item);
  }
  editInventory(item) {
    // const ids = {
    //   itemID: event.target.parentNode.parentNode.id,
    //   categoryID:
    //     event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id,
    //   quantity: this.state.newQuantity,
    // };
    this.props.editQuantity(item);
    // this.setState({ view: false });
  }
  deleteCategory(event) {
    this.props.deleteCategoryInInventory(event.target.parentNode.id);
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
              <h2>{data.category} <input
                type="button"
                value="Delete"
                onClick={this.deleteCategory}
              />
              </h2>
              
              <table class="inventoryTable">
                <tbody>
                  <tr>
                    <th> Item Name &ensp;</th>
                    <th> Quantity &ensp;</th>
                    <th> Actions &ensp;</th>
                  </tr>
                  {data.itemTypes.map((item) => (
                    <InventoryLineItem
                      itemID={item._id}
                      key={item._id}
                      itemName={item.itemName}
                      itemQuantity={item.quantity}
                      editInventory={this.editInventory}
                      deleteInventory={this.deleteInventory}
                      // changeQuantityHandler={this.changeHandler}
                      // showEdit={this.showEdit}
                    />
                    // <tr id={item._id} key={item._id}>
                    //   <td> {item.itemName} </td>
                    //   <td onClick={this.showEdit}>
                    //     {item.quantity}
                    //     {this.state.view && (
                    //       <input
                    //         type="number"
                    //         name="newQuantity"
                    //         value={this.state.newQuantity}
                    //         onChange={this.changeHandler}
                    //       />
                    //     )}
                    //   </td>
                    //   <td>
                    //     <input
                    //       type="button"
                    //       onClick={this.editInventory}
                    //       value="Edit Quantity"
                    //     />
                    //     <input
                    //       type="button"
                    //       onClick={this.deleteInventory}
                    //       value="Delete Item"
                    //     />
                    //   </td>
                    // </tr>
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

class InventoryLineItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newQuantity: 0,
      view: false,
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.editHandler = this.editHandler.bind(this);
    this.showEdit = this.showEdit.bind(this);
  }

  showEdit(event) {
    event.preventDefault();
    this.setState({ view: true });
  }

  changeHandler(event) {
    event.preventDefault();
    // this.props.changeQuantityHandler(event.target.value);
    this.setState({ newQuantity: event.target.value });
  }

  editHandler(event) {
    event.preventDefault();
    const item = {
      itemID: event.target.parentNode.parentNode.id,
      categoryID:
        event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id,
      quantity: this.state.newQuantity,
      // view: false
    };
    this.props.editInventory(item);
    this.setState({ view: false });
  }

  deleteHandler(event) {
    event.preventDefault();
    const item = {
      itemID: event.target.parentNode.parentNode.id,
      categoryID:
        event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id,
    };
    this.props.deleteInventory(item);
  }

  render() {
    return (
      <tr id={this.props.itemID}>
        <td>{this.props.itemName}</td>
        <td class="inventoryQuantity" onClick={this.showEdit}>
          {this.props.itemQuantity}{" "}
          
        </td>
        <td>
        {this.state.view && (
            <input
              type="number"
              name="newQuantity"
              value={this.state.newQuantity}
              onChange={this.changeHandler}
            />
          )}
          <input
            type="button"
            onClick={this.editHandler}
            value="Edit Quantity"
          />
          <input
            type="button"
            onClick={this.deleteHandler}
            value="Delete Item"
          />
        </td>
      </tr>
    );
  }
}
export default InventoryPage;
