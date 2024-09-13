import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import dropdown from "../assets/dropdown.png";
import Vector from "../assets/Vector.png";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import circle from "../assets/circle.webp"

import inarrow from "../assets/inarrow.png"
import outarrow from "../assets/outarrow.png"

import { transactions } from "../transaction";

const Transactions = () => {
  const [step, setStep] = useState("one");
  const [transaction, setTransaction] = useState({
    text: "",
    amount: "",
    type: "",
    date: "",
    icon: "",
  });
  const [allTransactions, setAllTransactions] = useState(transactions);
  const [error, setError] = useState("")
  const [transactionsDB, setTransactionDB] = useState([])
  const [isAdded, setIsAdded] = useState(false)
  const [limit, setLimit] = useState(7)
  const [limitBudgetMsg, setLimitBudgetMsg] = useState("")

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const today = new Date();
    const options = { month: "short", day: "2-digit", year: "numeric" };
    const formattedDate = today.toLocaleDateString("en-US", options);
    setTransaction({ ...transaction, date: formattedDate });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/transactions')
    .then(res => setTransactionDB(res.data))
  }, [isAdded])

  const handleSelectTransaction = (id, icon) => {
    const updatedTransactions = allTransactions.map((item) => {
      if (item.id === id) {
        return { ...item, selected: !item.selected };
      }
      return { ...item, selected: false };
    });

    setAllTransactions(updatedTransactions);

    const selectedItem = updatedTransactions.find((item) => item.id === id);
    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      icon: selectedItem.selected ? icon : "",
    }));
  };

  const handleAddTransaction = () => {
    const token = sessionStorage.getItem("token");
    const {user_id} = jwtDecode(token);
    const newTransaction = {user_id, ...transaction}
    
    axios.post('http://localhost:5000/add/transaction', newTransaction)
    .then(res => {
      setStep("four")
      setIsAdded(!isAdded)
      setLimitBudgetMsg(res.data.Message)
    })
    .catch(e => {
      setError('Transaction not added!')
      console.log(e)
    })
  }

  return (
    <div id="transactions">
      {step === "one" && (
        <div>
          <h2>Transactions</h2>
          <p>
            See transactions <img src={dropdown} alt="dropdown" />
          </p>

          {transactionsDB.length === 0 ? <p>You don't have any transaction</p> : <div>
            {transactionsDB.slice(0, limit).sort((a,b) => new Date(a.date) - new Date(b.date)).map((item, index) => (<div key={index} className="my-3">
              { transactionsDB[index].date !== transactionsDB[index - 1]?.date && <p>{item.date}</p>}
              <div className="d-flex justify-content-between align-items-center">
                <div><img src={item.icon} alt={item.text} /> </div>
                <div className="d-flex"><div style={{minWidth: '120px', maxWidth: '150px', wordBreak: 'break-word'}}>{item.text}</div> <div>{item.type === 'expense' ? <img src={outarrow} alt="red-arrow" /> :  <img src={inarrow} alt="green-arrow" /> }</div></div>
               
                <div>${item.amount}</div>
              </div>
            </div>))}
            
            </div>}


          <div className="my-5">
            <Button className="mb-2 btn btn-dark w-100 text-white border" onClick={() => setLimit(transactionsDB.length)}>
              See all
            </Button>
            <Button
              className="btn btn-green w-100"
              onClick={() => setStep("two")}
            >
              Add a transaction
            </Button>
          </div>
        </div>
      )}

      {step === "two" && (
        <div>
          <img
            className="back"
            src={Vector}
            alt="backbutton"
            onClick={() => setStep("one")}
          />
          <h2 className="mt-4">Add a transaction</h2>

          <Form.Group className="transaction my-4">
            <Form.Label>Enter transaction name</Form.Label>
            <Form.Control
              type="text"
              required
              name="text"
              onChange={handleChange}
              value={transaction.text}
              style={{ height: "44px" }}
            />
          </Form.Group>

          <Form.Group className="amount mb-4">
            <Form.Label>Enter the amount</Form.Label>
            <Form.Control
              type="text"
              required
              name="amount"
              onChange={handleChange}
              value={transaction.amount}
              style={{ height: "61px" }}
            />
          </Form.Group>

          <div className="gap-3 d-flex mb-4">
            <Button
              className="mb-2 btn btn-dark w-50 text-white border"
              onClick={() => setTransaction({ ...transaction, type: "income" })}
            >
              Income
            </Button>
            <Button
              className="mb-2 btn btn-dark w-50 text-white border"
              onClick={() =>
                setTransaction({ ...transaction, type: "expense" })
              }
            >
              Expense
            </Button>
          </div>

          <Button
            className="btn btn-green w-100"
            onClick={() => setStep("three")}
            disabled={!transaction.text || !transaction.amount || !transaction.type}
          >
            Continue
          </Button>
        </div>
      )}

      {step === "three" && (
        <div>
          <img
            className="back"
            src={Vector}
            alt="backbutton"
            onClick={() => setStep("two")}
          />
          <h2 className="my-4">Add a transaction</h2>

          <div id="transaction-summary" className="p-3 text-center">
            <p className="mb-3 fs-2 ">${Number(transaction.amount).toFixed(2)}</p>
            <p className="mb-3">{transaction.text}</p>
            <p>{transaction.type}</p>
          </div>

          <div id="categories" className="mb-4">
            <p className="my-4">Select the category</p>
            <div className="grid-container">
              {allTransactions.map((item) => (
                <div
                  className="text-center grid-item"
                  key={item.id}
                  onClick={() => handleSelectTransaction(item.id, item.icon)}
                  style={{ opacity: item.selected && 0.5 }}
                >
                  <img src={item.icon} alt={item.id} />
                  <p>{item.text}</p>
                </div>
              ))}
            </div>

            <Button
              className="btn btn-green w-100 my-5"
              onClick={handleAddTransaction}
              disabled={!transaction.icon}
            >
              Continue
            </Button>
            <p className="text-danger"><small>{error}</small></p>
          </div>
        </div>
      )}

      {step === "four" && <div>

        <img
            className="back"
            src={Vector}
            alt="backbutton"
            onClick={() => setStep("three")}
          />
          <h2 className="my-4">Add a transaction</h2>
        
        <div id="transaction-final" className="p-3 d-flex justify-content-even align-items-center mb-5">
          <div style={{flexGrow: 2}} className="text-center">
            <img src={transaction.icon} alt={transaction.text} />
          </div>
          <div  style={{flexGrow: 4}}>
            <p className="mb-3 fs-2 ">${Number(transaction.amount).toFixed(2)}</p>
            <p className="mb-3">{transaction.text}</p>
            <p>{transaction.type}</p>
          </div>
            
        </div>


          <Button
            className="btn btn-dark w-100 text-white border mb-2"
            onClick={
              () => {
                setStep("two") 
                setTransaction({...transaction, text: '', amount: ''})
            }
              
            }
        
          >
            Add another transaction
          </Button>

          
          <Button
            className="btn btn-green w-100 mb-2"
            onClick={() => setStep("one")}
          >
            Done
          </Button>
          
          <p className="text-danger">{limitBudgetMsg}</p>

        
        
        </div>}
    </div>
  );
};

export default Transactions;
