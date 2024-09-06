import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import dropdown from "../assets/dropdown.png";
import Vector from "../assets/Vector.png";
import Form from "react-bootstrap/Form";

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

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const today = new Date();
    const options = { month: "short", day: "2-digit", year: "numeric" };
    const formattedDate = today.toLocaleDateString("en-US", options);
    setTransaction({ ...transaction, date: formattedDate });
  }, []);

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

  return (
    <div id="transactions">
      {step === "one" && (
        <div>
          <h2>Transactions</h2>
          <p>
            See transactions <img src={dropdown} alt="dropdown" />
          </p>

          <p>You don't have any transaction</p>

          <div>
            <Button className="mb-2 btn btn-dark w-100 text-white border">
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
            <p className="mb-3 fs-2 ">${transaction.amount}</p>
            <p className="mb-3">{transaction.text}</p>
            <p>{transaction.type}</p>
          </div>

          <div id="categories" className="mb-4">
            <p className="my-4">Select the category</p>
            <div className="d-flex flex-wrap gap-1">
              {allTransactions.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectTransaction(item.id, item.icon)}
                  style={{ opacity: item.selected && 0.5 }}
                >
                  <img src={item.icon} alt={item.id} />
                </div>
              ))}
            </div>

            <Button
              className="btn btn-green w-100 my-5"
              onClick={() => setStep("four")}
              disabled={!transaction.icon}
            >
              Continue
            </Button>
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
          <div className="w-50">
            <img src={transaction.icon} alt={transaction.text} />
          </div>
          <div>
            <p className="mb-3 fs-2 ">${transaction.amount}</p>
            <p className="mb-3">{transaction.text}</p>
            <p>{transaction.type}</p>
          </div>
            
          </div>


          <Button
            className="btn btn-dark w-100 text-white border mb-2"
            onClick={() => setStep("two")}
        
          >
            Add another transaction
          </Button>

          
          <Button
            className="btn btn-green w-100 mb-2"
            onClick={() => setStep("one")}
          >
            Done
          </Button>
          
          

        
        
        </div>}
    </div>
  );
};

export default Transactions;
