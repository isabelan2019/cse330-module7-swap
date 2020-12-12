import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
import axios from "axios";

// import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
// import employeesSchema from "../../../api/schemas/employeesSchema";
// import loginForm from "./LoginFormComp";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            isLoggedIn: true
        };
        this.showLogin = this.showLogin.bind(this);
        this.logout = this.logout.bind(this);
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
        // const [auth, setAuth] = useState(null);

        console.log("sending"+JSON.stringify(loginObj));
        axios.post('http://localhost:5000/login', loginObj)
        .then(res => {
            console.log(res.data);
            if (!res.data){
                alert("could not be logged in: "+res.data);
                
            } else {
                if (res.status===200){
                    console.log(JSON.stringify(res));
                    // this.props.history.push("/");
                    // setAuth(data);

                }
                this.setState({
                    isLoggedIn: true,
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
    logout(){
        this.setState({
            isLoggedIn: false
        });

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
            employeeNav = <EmployeeNav 
            loggedOut={this.logout}/>
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
    constructor(props){
      super(props);
      this.state={
        //   showLogout: false,
          showVerification:false
      }
      this.logout=this.logout.bind(this);
      this.showVerification=this.showVerification.bind(this);
      this.changeHandler = this.changeHandler.bind(this);
      this.changeVerification = this.changeVerification.bind(this);

    }
    changeHandler(obj){
        this.setState({
            oldVerification: this.state.oldVerification,
            newVerification: this.state.newVerification
        });
    }
    logout(){
        axios.post('http://localhost:5000/logout')
        .then(res => {
            console.log(res.data);
            this.props.loggedOut();
        });
        // this.setState({showLogout:true});

    }
    showVerification(){
        this.setState({showVerification:!this.state.showVerification});
    }
    changeVerification(obj){
        axios.post('http://localhost:5000/changeVerification', obj)
        .then(res => {
            console.log(res.data);
        });

    }
    render(){
        const showVerification =this.state.showVerification;
        let verificationForm;
        if (showVerification) {
            verificationForm = <VerificationForm 
            onChangeVerify={this.changeHandler}
            changeVerificatiion={this.changeVerification}
            />
        }
        return (
          
        <div>
          <nav>
            <button onClick={this.logout}>Logout</button>
            <button onClick={this.showVerification}>Change Verification </button>
          </nav>
          {verificationForm}
        </div>
  
      );
  
    }
    
  }
class VerificationForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            oldVerification:"",
            newVerification:""
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        
    }
    changeHandler(event){
        event.preventDefault();
        this.props.onChangeVerify(event.target.value);
        this.setState({[event.target.name]:event.target.value});

    }
    submitHandler(event){
        event.preventDefault();
        // console.log(this.props);
        const verificationObj={
            oldVerification: this.state.oldVerification,
            newVerification: this.state.newVerification
        }
        console.log(verificationObj);

        this.props.changeVerificatiion(verificationObj);
        this.setState({
            oldVerification:"",
            newVerification:""
        });

    }
    render(){
        return(
            <form onSubmit={this.submitHandler}>
                <label> Old Verification Code: 
                    <input type="text" name="oldVerification" onChange={this.changeHandler} value={this.state.oldVerification}/>
                </label>
                <label> New Verification Code: 
                    <input type="text" name="newVerification" onChange={this.changeHandler} value={this.state.newVerification}/>
                </label>
                <input type="submit" value="Change code"/>

            </form>
        );
    }
}

export default Login;