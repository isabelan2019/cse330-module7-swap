import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
import axios from "axios";
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
// import employeesSchema from "../../../api/schemas/employeesSchema";
// import loginForm from "./LoginFormComp";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            isLoggedIn: false
        };
        this.showLogin = this.showLogin.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        
    }
    changeHandler(loginInfo){
        // event.preventDefault();
        // console.log(loginInfo);
        this.setState({
            loginUsername:loginInfo.loginUsername,
            loginPassword:loginInfo.loginPassword
        });
    }
    submitLogin(loginObj){
        // event.preventDefault();

        // const loginObj={
        //     username: this.state.username,
        //     password: this.state.password
        // }

        console.log("sending"+JSON.stringify(loginObj));
        axios.post('http://localhost:5000/login', loginObj)
        .then(res => {
            console.log(res.data);
            if (!res.data){
                alert("could not be logged in: "+res.data);
                
            } else {
                this.setState({
                    isLoggedIn: true
                });
            }
        });
        
        this.setState({
            show: false
        });
    }
    showLogin(){
        this.setState({
            show:!this.state.show
        });
        console.log(this.state.show);
        // show = !show;
    }
    render (){
        const show = this.state.show;
        let form ;
        if (show){
            form = <LoginForm 
            checkLogin={this.submitLogin}
            onLoginChange={this.changeHandler}
            />
        }
        const isLoggedIn = this.state.isLoggedIn;
        let employeeNav;
        // let buttonText;
        if (isLoggedIn){
            // buttonText = "Login";
            employeeNav = <EmployeeNav />
        } else {
            // buttonText="log out";
        }
        return (
            <div id="login">
                <button onClick={this.showLogin}> Login</button>
                {form}
                {employeeNav}
            </div>
        );
    }
    
}

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            loginUsername: "",
            loginPassword: ""
        }
        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }
    changeHandler(event){
        event.preventDefault();
        // console.log(event.target.value);
        this.props.onLoginChange(event.target.value);
        this.setState({[event.target.name]:event.target.value})
    }
    submitHandler(event){
        event.preventDefault();
        console.log(this.props);
        const loginObj={
            loginUsername: this.state.loginUsername,
            loginPassword: this.state.loginPassword
        }
        console.log(loginObj);

        this.props.checkLogin(loginObj);
        this.setState({
            loginUsername:"",
            loginPassword:""
        });
       
    }
    render(){
        return(
            <form onSubmit={this.submitHandler}>
                <label> Username: 
                    <input type="text" name="loginUsername" onChange={this.changeHandler} value={this.state.loginUsername}/>
                </label>
                <label> Password: 
                    <input type="password" name="loginPassword" onChange={this.changeHandler} value={this.state.loginPassword}/>
                </label>
                <input type="submit" value="Log In"/>
            </form>
        );  
    }

    
}
class EmployeeNav extends React.Component {
    // constructor(props){
    //   super(props);
    // }
    render(){
      return (
        <div>
          <Router>
          <nav>
            <button><Link to="/logout">Logout</Link></button>
            <button> <Link to="/verification">Change Verification </Link></button>
          </nav>
          <Switch>
            <Route path="/logout"/>
            <Route path="/verification"/>
          </Switch>
          </Router>
        </div>
  
      );
  
    }
    
  }
export default Login;