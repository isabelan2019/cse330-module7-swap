import React from "react";
// import ReactDOM from "react-dom";
import "./../index.css";
import axios from "axios";
import NavBar from "./NavBarComp";
import CreateEmployee from "./CreateEmployee Comp";
import CustomerCheckout from "./CheckoutComp";

// import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
// import employeesSchema from "../../../api/schemas/employeesSchema";
// import loginForm from "./LoginFormComp";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      isLoggedIn: false,
      date: new Date(),
    };
    this.showLogin = this.showLogin.bind(this);
    this.logout = this.logout.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(loginInfo) {
    // event.preventDefault();
    // console.log(loginInfo);
    this.setState({
      loginUsername: loginInfo.loginUsername,
      loginPassword: loginInfo.loginPassword,
    });
  }
  submitLogin(loginObj) {
    // event.preventDefault();

    // const loginObj={
    //     username: this.state.username,
    //     password: this.state.password
    // }
    // const [auth, setAuth] = useState(null);

    console.log("sending" + JSON.stringify(loginObj));
    axios.post("http://localhost:5000/login", loginObj).then((res) => {
      console.log(JSON.stringify(res.data));
      if (!res.data) {
        alert("could not be logged in: " + res.data);
      } else {
        sessionStorage.setItem("username", res.data.username);
        this.setState({
          isLoggedIn: true,
        });
      }
    });

    this.setState({
      show: false,
    });
  }
  showLogin() {
    this.setState({
      show: !this.state.show,
    });
    console.log(this.state.show);
    // show = !show;
  }
  logout() {
    axios.post("http://localhost:5000/logout").then((res) => {
      console.log(res.data);
      sessionStorage.clear();
      this.setState({
        isLoggedIn: false,
      });
      sessionStorage.removeItem("username");
      sessionStorage.clear();
    });

    // this.render();
  }
  render() {
    const show = this.state.show;
    let loginButton;
    let form;
    if (show) {
      form = (
        <LoginForm
          checkLogin={this.submitLogin}
          onLoginChange={this.changeHandler}
        />
      );
    }
    const loggedIn = sessionStorage.getItem("username");
    let employeeNav;
    let navBar;
    let customerCheckout;
    let register;
    // let buttonText;
    if (loggedIn) {
      // buttonText = "Login";
      employeeNav = <EmployeeNav loggedOut={this.logout} />;
      navBar = <NavBar />;
    } else {
      // buttonText="log out";
      loginButton = (
        <button id="loginButton" onClick={this.showLogin}>
          {" "}
          Login
        </button>
      );
      register = <CreateEmployee />;

      // if during hours, checkout form
      //if not during hours, store closed
      console.log(this.state.date.getDay());
      const dayOfWeek = this.state.date.getDay();
      const hours = this.state.date.getHours();
      console.log(hours);
      // dayOfWeek>0 &&
      if (dayOfWeek > 0 && dayOfWeek < 6) {
        //mon-fri
        if (11 < hours && hours < 11) {
          //11-2
          customerCheckout = <CustomerCheckout />;
        } else {
          customerCheckout = (
            <h1>SWAP is not open at this time. Come back later!</h1>
          );
        }
      } else {
        customerCheckout = (
          <h1>SWAP is not open at this time. Come back later!</h1>
        );
      }
    }
    return (
      <div>
        <div id="notLoggedIn">
          <nav id="loginRegisterNav">
            {loginButton}
            {register}
          </nav>
          {form}
          {customerCheckout}
        </div>
        <div id="loggedIn">
          {employeeNav}
          {navBar}
        </div>
      </div>
    );
  }
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUsername: "",
      loginPassword: "",
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }
  changeHandler(event) {
    event.preventDefault();
    // console.log(event.target.value);
    this.props.onLoginChange(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }
  submitHandler(event) {
    event.preventDefault();
    console.log(this.props);
    const loginObj = {
      loginUsername: this.state.loginUsername,
      loginPassword: this.state.loginPassword,
    };
    console.log(loginObj);

    this.props.checkLogin(loginObj);
    this.setState({
      loginUsername: "",
      loginPassword: "",
    });
  }
  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <label>
          {" "}
          Username:
          <input
            type="text"
            name="loginUsername"
            onChange={this.changeHandler}
            value={this.state.loginUsername}
          />
        </label>
        <label>
          {" "}
          Password:
          <input
            type="password"
            name="loginPassword"
            onChange={this.changeHandler}
            value={this.state.loginPassword}
          />
        </label>
        <input type="submit" value="Log In" />
      </form>
    );
  }
}
class EmployeeNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //   showLogout: false,
      showVerification: false,
    };
    this.logout = this.logout.bind(this);
    this.showVerification = this.showVerification.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.changeVerification = this.changeVerification.bind(this);
  }
  changeHandler(obj) {
    this.setState({
      oldVerification: this.state.oldVerification,
      newVerification: this.state.newVerification,
    });
  }
  logout() {
    this.props.loggedOut();

    // this.setState({showLogout:true});
  }
  showVerification() {
    this.setState({ showVerification: !this.state.showVerification });
  }
  changeVerification(obj) {
    if (sessionStorage.getItem("username")) {
      axios
        .post("http://localhost:5000/changeVerification", obj)
        .then((res) => {
          console.log(res.data);
          if (!res.data._id) {
            alert("error: " + JSON.stringify(res.data.message));
          } else {
            alert("code changed");
          }
        });
    } else {
      alert("you are not signed in");
    }
  }
  render() {
    const showVerification = this.state.showVerification;
    let verificationForm;
    if (showVerification) {
      verificationForm = (
        <VerificationForm
          onChangeVerify={this.changeHandler}
          changeVerificatiion={this.changeVerification}
        />
      );
    }
    return (
      <div>
        <p>Welcome, {sessionStorage.getItem("username")}</p>
        <nav id="loggedInNav">
          <button onClick={this.logout}>Logout</button>
          <button onClick={this.showVerification}>Change Verification </button>
        </nav>
        {verificationForm}
      </div>
    );
  }
}
class VerificationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldVerification: "",
      newVerification: "",
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  changeHandler(event) {
    event.preventDefault();
    this.props.onChangeVerify(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }
  submitHandler(event) {
    event.preventDefault();
    // console.log(this.props);
    const verificationObj = {
      oldVerification: this.state.oldVerification,
      newVerification: this.state.newVerification,
      date: new Date(),
    };
    console.log(verificationObj);

    this.props.changeVerificatiion(verificationObj);
    this.setState({
      oldVerification: "",
      newVerification: "",
    });
  }
  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <label>
          {" "}
          Old Verification Code:
          <input
            type="text"
            name="oldVerification"
            onChange={this.changeHandler}
            value={this.state.oldVerification}
          />
        </label>
        <label>
          {" "}
          New Verification Code:
          <input
            type="text"
            name="newVerification"
            onChange={this.changeHandler}
            value={this.state.newVerification}
          />
        </label>
        <input type="submit" value="Change code" />
      </form>
    );
  }
}

export default Login;
