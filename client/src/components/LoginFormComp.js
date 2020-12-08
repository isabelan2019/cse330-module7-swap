import React from "react";
import axios from "axios";

class loginForm extends React.Component {
    constructor(props) {
        super(props);
        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.state ={
            username: "",
            password:""
        }
    }
    changeHandler(event){
        event.preventDefault();
        this.setState({[event.target.name]:event.target.value})
    }
    submitHandler(event){
        event.preventDefault();
        const loginObj={
            username: this.state.username,
            password: this.state.password
        }

    }
    render(){
        return (
            <form onSubmit={this.submitHandler}>
           
          <label> 
            Username: 
            <input type="text" name="username" onChange={this.changeHandler} value={this.state.username}/>
          </label>
          <label> 
            Password: 
            <input type="password" name="password" onChange={this.changeHandler} value={this.state.password}/>
          </label>
          
          <input type="submit" value="Submit"/>
        </form>
        );
    }

}
export default loginForm;