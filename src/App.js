import { useState, useEffect } from 'react';
import './App.css';
import { set } from 'mongoose';


function App() {

  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/transactions")
      .then(response => response.json())
      .then(transactions => {
        // Sort the transactions by datetime in descending order
        const sortedTransactions = transactions.sort((a, b) => {
          return new Date(b.datetime) - new Date(a.datetime);
        });
        setTransactions(sortedTransactions);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  function addNewTransaction(e) {
    e.preventDefault();
    const price = name.split(" ")[0];
    fetch('http://localhost:4000/api/transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price,
        name: name.substring(price.length + 1), 
        datetime,
        description
      })
    }).then(response => {
      if(response.ok) {
        response.json().then(json => {
          setName('');
          setDatetime('');
          setDescription('');
          return json;
        })
      } else throw new Error("Error")
    }).catch(error => {
      console.log('Error', error);
    })
  }

  let balance = 0;
  for (const transaction of transactions) {
    balance = balance + transaction.price;
  }

  balance = balance.toFixed(2);
  const fraction = balance.split(".")[1];
  balance = balance.split(".")[0];

  return (
    <main>
      <h1>${balance}<span>{fraction}</span></h1>
      <h2 className="balance-text">
        { balance > 0 ? "Your balance is positive! :)" : "Your balance is negative! :(" }</h2>
      <form onSubmit={addNewTransaction}>
        <div className="basic-info">
          <input 
            type="text" 
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="+400 New Gig"
          />
          <input 
            type="datetime-local"
            value={datetime}
            onChange={e => setDatetime(e.target.value)}
          />
        </div>
        <div className="description">
          <input 
            type="text" 
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder='description'
          />
        </div>
        <button type="submit">Add a new transcation</button>
      </form>
      <div className="transactions">
        {transactions.map(transaction => (
          <div className="transaction">
            <div className="left">
              <div className="name">{transaction.name}</div>
              <div className="description">{transaction.description}</div>
            </div>
            <div className="right">
              <div className={"price "+(transaction.price < 0 ? "red" : "green")}>{transaction.price}</div>
              <div className="datetime">{transaction.datetime}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
