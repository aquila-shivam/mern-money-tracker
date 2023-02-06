import "./App.css"
import { useEffect, useState } from "react";
function App() {

  const [name, setName] = useState('');
  const [datetime, setDateTime] = useState('');
  const [description, setDescription] = useState('');
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    getTransactions().then(setTransaction);
  }, [])


  async function getTransactions() {
    const url = `http://localhost:4000/api/transactions`;
    const response = await fetch(url);
    return await response.json();
  }

  function addNewTransactions(e) {
    e.preventDefault();
    const url = `http://localhost:4000/api/transaction`
    const price = name.split(' ')[0];
    fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        price,
        name: name.substring(price.length + 1),
        description,
        datetime,
      })
    }).then(response => {
      response.json().then(json => {
        console.log('result', json);
      })
    })
  }

  let balance = 0;
  for(const trans of transaction)
  {
    balance=balance + trans.price;
  }

  balance = balance.toFixed(2);
  const fraction = balance.split('.')[1];
  balance = balance.split('.')[0];


  return (
    <main>
      <h1>₹{balance}<span>.{fraction}</span></h1>
      <form onSubmit={addNewTransactions}>
        <div className="basic">
          <input type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder={'+200 book'} />
          <input type="datetime-local"
            value={datetime} onChange={e => setDateTime(e.target.value)} />
        </div>
        <div className="description">
          <input type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder={'description'} />
        </div>
        <button type="submit">Add New Transaction</button>
      </form>
      <div className="transactions">
        {transaction.length > 0 && transaction.map((t,key) => (
          <div className="transaction" key={key}>
            <div className="left">
              <div className="name">{t.name}</div>
              <div className="description">{t.description}</div>
            </div>
            <div className="right">
              <div className={"price " + (transaction.price < 0 ? "red" : "green")}>{t.price}</div>
              <div className="datetime">{t.datetime}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
