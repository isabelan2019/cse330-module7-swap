import React from "react";
import axios from "axios";
// import loginForm from "./LoginFormComp";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true
        };
        this.showLogin = this.showLogin.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        
    }
    changeHandler(loginInfo){
        // event.preventDefault();
        console.log(loginInfo);
        this.setState({
            loginUsername:loginInfo.loginUsername,
            loginPassword:loginInfo.loginPassword
        })
    }
    submitLogin(loginObj){
        // event.preventDefault();

        // const loginObj={
        //     username: this.state.username,
        //     password: this.state.password
        // }

        console.log("sending"+JSON.stringify(loginObj));
        axios.post('http://localhost:5000/login', loginObj)
        .then(res => console.log(res.data));
        
        // this.setState({
        //     username:"",
        //     password:""
        // });
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
        return (
            <div id="login">
                <button onClick={this.showLogin}> Login</button>
                {form}
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
    }
    render(){
        return(
            <form onSubmit={this.submitHandler}>
                <label> Username: 
                    <input type="text" name="loginUsername" onChange={this.changeHandler} value={this.props.loginUsername}/>
                </label>
                <label> Password: 
                    <input type="password" name="loginPassword" onChange={this.changeHandler} value={this.props.loginPassword}/>
                </label>
                <input type="submit" value="Login"/>
            </form>
    
        );  
    }

    
}
export default Login;