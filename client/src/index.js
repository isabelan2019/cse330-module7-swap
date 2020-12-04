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
      <h1>SWAP Checkout</h1>
      <CategoryDisplay />
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
  render(){
    return(
      <form>
        <label for="username"> Username: </label>
        <input type="text" value={this.state.username}/>
        <label for="password"> Password: </label>
        <input type="password" value={this.state.password}/>
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

class CategoryDisplay extends React.Component {
  constructor(props){
    super(props);
    this.state = {val: 0};
    this.plus = this.plus.bind(this);
    this.minus = this.minus.bind(this);
  }
  plus(){
    //increment
    console.log("up");
    this.setState( state => ({
      val: state.val + 1
    }));
    //call item inventory to update the dynamic display
  }
  minus(){
    //increment
    console.log("down");
    if (this.state.val >0 ) {
      this.setState( state => ({
        val: state.val - 1
      }));
    }
    
    //call item inventory to update the dynamic display
  }

  render(){
    return (
      <div id="categoryDisplay">
        
        <div>
          <label for="shirts">Shirts</label>
          <ul id="shirts">
            <li>tee shirt 
              <div class="counter">
                <button class="minus" onClick={this.minus}>-</button>
                <input class="count" type="number" min="0" value={this.state.val}></input>
                <button class="plus" onClick={this.plus}>+</button>
              </div>
            </li>
            <li>crop-top / bralette<div class="counter">
                <button class="minus" onClick={this.minus}>-</button>
                <input class="count" type="number" min="0" value={this.state.val}></input>
                <button class="plus" onClick={this.plus}>+</button>
              </div></li>
            <li>tank top</li>
            <li>long sleeve</li>
            <li>button-down</li>
            <li>sweater</li>
          </ul>
        </div>
    
        <div>
          <label for="pants">Pants</label>
          <ul id="pants">
            <li>jeans</li>
            <li>shorts</li>
            <li>sweatpants</li>
            <li>leggings</li>
            <li>khakis</li>
          </ul>
        </div>

        <div>
          <label for="dresses-skirts">Dresses/Skirts</label>
          <ul id="dresses-skirts">
            <li>short dress</li>
            <li>long dress</li>
            <li>jumpsuit</li>
            <li>romper</li>
            <li>short skirts</li>
            <li>long skirts</li>
          </ul>
        </div>
        
        <div>
          <label for="jackets">jackets</label>
          <ul id="jackets">
            <li>denim</li>
            <li>blazer</li>
            <li>hoodie</li>
            <li>zip-up</li>
            <li>cardigan</li>
            <li>fleece</li>
            <li>winter coat</li>
          </ul>
        </div>
        
        <div>
          <label for="footwear">Footwear</label>
          <ul id="footwear">
            <li>socks</li>
            <li>sneakers</li>
            <li>boots</li>
            <li>heels</li>
            <li>dress shoes</li>
            <li>open toed (e.g. sandals, flip-flops)</li>
          </ul>
        </div>

        <div>
          <label for="accessories">Accessories</label>
          <ul id="accessories">
            <li>necklace</li>
            <li>bracelet</li>
            <li>scarves</li>
            <li>hats</li>
            <li>gloves</li>
            <li>sunglasses</li>
            <li>purse</li>
            <li>tote bag</li>
            <li>drawstring bag</li>
            <li>umbrella</li>
            <li>helmet</li>
          </ul>
        </div>
        <div>
          <label for="office">Office Items</label>
          <ul id="office">
            <li>book</li>
            <li>textbook</li>
            <li>notebook</li>
            <li>pen</li>
            <li>pencil</li>
            <li>backpack</li>
            <li>write in <input type="text" id="office-write"></input></li>
          </ul>
        </div>
        <div>
          <label for="household">Household Items</label>
          <ul id="household">
            <li>water bottle</li>
            <li>cup / mug</li>
            <li>bowl / plate</li>
            <li>utensils</li>
            <li>bedding</li>
            <li>storage caddy</li>
            <li>towel</li>
            <li>pot / pan</li>
            <li>hangers</li>
            <li>write in <input type="text" id="household-write"></input></li>
          </ul>
        </div>
        <div>
          <label for="miscellaneous">Miscellaneous</label>
          <ul id="miscellaneous">
            <li>CD</li>
            <li>write in<input type="text" id="misc-write"></input></li>
          </ul>
        </div>
        
        

       

      </div>      
    );
     
  }

}






ReactDOM.render(
  <App />,
  document.getElementById('root')
);
