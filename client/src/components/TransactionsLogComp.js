import React from "react";
import axios from "axios";

class TransactionsLog extends React.Component{
    constructor(props){
        super(props);
        this.state={
            transactionsData:[]
        }
        this.getData=this.getData.bind(this);
    }

    componentDidMount(){
        this.getData();
    }

    getData(){
        axios.get('http://localhost:5000/getTransactions')
        .then(res => {
          let allTransactions=[];
          const data = res.data;  
          console.log("transaction data");
          console.log(data);                  
          for (let i in data){
            allTransactions.push(data[i]);
            let allItems=[];
            let customerInfo=[];
            for (let j in data[i].items){
              allItems.push(data[i].items[j]);
            }
            for(let k in data[i].customer){
                customerInfo.push(data[i].customer[k])
            }
            allTransactions[i].items=allItems;
            allTransactions[i].customer=customerInfo;      
          }
          this.setState({transactionsData:allTransactions});          
        });
    }

  

    render(){
        console.log(this.state.transactionsData);
        if(!this.state.transactionsData){
            return null;
        }
        return(
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th> Date and Time</th>
                            <th> Customer First Name </th>
                            <th> Customer Last Name</th>
                            <th> Customer Email </th>
                            <th> Items</th>
                        </tr>
                        {this.state.transactionsData.map((data)=>
                        <tr key={data._id}>
                            <td>{data.Date}</td>
                            <td> {data.customer[0]} </td>
                            <td> {data.customer[1]}</td>
                            <td> {data.customer[2]} </td>
                            <td>
                                {data.items.map((item)=>
                                <ul>
                                    <li key={item._id}>
                                        Item: {item.itemName} 
                                        Quantity: {item.quantity}
                                    </li>
                                </ul>)}
                            </td>
                        </tr>)}
                    </tbody>
                    
                </table>
            </div>
        )
    }
}

export default TransactionsLog;