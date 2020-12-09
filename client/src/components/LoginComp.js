import React from "react";
import axios from "axios";
// import loginForm from "./LoginFormComp";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            username:"",
            password:""
        };
        this.showLogin = this.showLogin.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
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
        console.log("sending"+loginObj);
        axios.post('http://localhost:5000/login', loginObj)
        .then(res => console.log(res.data));
        
        this.setState({
            username:"",
            password:""
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
            form = <LoginForm onSubmit={this.submitHandler}/>
        }
        return (
            <div id="login">
                <button onClick={this.showLogin}> Login</button>
                {form}
            </div>
        );
    }
    
}

function LoginForm(props){
    return(
        <form onSubmit={props.submitHandler}>
            <label> Username: 
                <input type="text" name="loginUsername" onChange={props.changeHandler} value={props.username}/>
            </label>
            <label> Password: 
                <input type="password" name="loginPassword" onChange={props.changeHandler} value={props.password}/>
            </label>
            <input type="submit" value="Submit"/>
        </form>
    );
}
export default Login;