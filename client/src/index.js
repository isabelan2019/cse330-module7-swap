import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Axios from "axios";


function HelloWorld(){
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
    <p> Hello World </p>
  );
}


ReactDOM.render(
  <HelloWorld/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
