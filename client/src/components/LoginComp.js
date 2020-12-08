import React from "react";
// import axios from "axios";
import loginForm from "./LoginFormComp";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            username:"",
            password:"",
        };
        this.showLogin = this.showLogin.bind(this);
        
    }
    showLogin(){

        this.setState({
            show:!this.state.show
        });
        // console.log(this.state.show);
        // show = !show;
    }
    render (){
        return (
            <div id="login">
                <button onClick={this.showLogin}> Login</button>
                {this.state.show }
            </div>
        );
    }
    
}
export default Login;