
import React from "react";
import axios from "axios";

class CreateEmployee extends React.Component{
    constructor(props){
      super(props);
      this.state={
        show: false,
        firstName:"",
        lastName:"",
        username:"",
        password:"",
        verification:""
      }
      this.submitHandler=this.submitHandler.bind(this);
      this.changeHandler=this.changeHandler.bind(this);
      this.showRegisterForm=this.showRegisterForm.bind(this);
    }
    changeHandler(registerInfo){
      // event.preventDefault();
      this.setState({
        firstName:this.state.firstName,
        lastName:this.state.lastName,
        username:this.state.username,
        password:this.state.password,
        verification:this.state.verification
      });
    }
    submitHandler(employeeObj){
      // event.preventDefault();
      
      // const employeeObj={
      //   firstName:this.state.firstName,
      //   lastName:this.state.lastName,
      //   username:this.state.username,
      //   password:this.state.password,
      //   verification:this.state.verification
      // };
  
      axios.post('http://localhost:5000/createEmployees', employeeObj)
        .then(res => {
          console.log(res.data);
          if (!res.data.username) {
            alert("error: "+JSON.stringify(res.data));
          } else {
            alert("success");
          }
        });
        
  
    }
    showRegisterForm(){
      this.setState({
          show:!this.state.show
      });
      // console.log(this.state.show);
      // show = !show;
  }
  render (){
      const show = this.state.show;
      let form ;
      if (show){
          form = <EmployeeForm 
          register={this.submitHandler}
          onRegisterChange={this.changeHandler}
          />
      }
      return (
          <div id="login">
              <button onClick={this.showRegisterForm}> Register</button>
              {form}
          </div>
      );
  }
  
}

class EmployeeForm extends React.Component {
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
      this.props.onRegisterChange(event.target.value);
      this.setState({[event.target.name]:event.target.value})
  }
  submitHandler(event){
    event.preventDefault();
      
    const employeeObj={
      firstName:this.state.firstName,
      lastName:this.state.lastName,
      username:this.state.username,
      password:this.state.password,
      verification:this.state.verification
    };
      // console.log(employeeObj);

      this.props.register(employeeObj);
      this.setState({
        firstName:"",
        lastName:"",
        username:"",
        password:"",
        verification:""
      });
  }
  render(){
    return(
      <form onSubmit={this.submitHandler}>
         <label> 
          First Name:
          <input type="text" name="firstName" onChange={this.changeHandler} value={this.state.firstName}/>
        </label>
        <label> 
          Last Name:
          <input type="text" name="lastName" onChange={this.changeHandler} value={this.state.lastName}/>
        </label>
        <label> 
          Username: 
          <input type="text" name="username" onChange={this.changeHandler} value={this.state.username}/>
        </label>
        <label> 
          Password: 
          <input type="password" name="password" onChange={this.changeHandler} value={this.state.password}/>
        </label>
        <label> 
          Verification Code: 
          <input type="password" name="verification" onChange={this.changeHandler} value={this.state.verification}/>
        </label>
        <input type="submit" value="Make Account"/>
      </form>
    );
  } 

}      
    
  export default CreateEmployee;