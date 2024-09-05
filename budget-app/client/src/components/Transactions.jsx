import React, {useState} from "react";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import dropdown from "../assets/dropdown.png";
import Vector from "../assets/Vector.png"
import Form from "react-bootstrap/Form";

const Transactions = () => {
  const [step, setStep] = useState("one");

  return (
    <div id="transactions">
      {step === "one" && (
        <div>
          <h2>Transactions</h2>
          <p>
            See transactions <img src={dropdown} alt="dropdown" />
          </p>

          <Button className="btn btn-green w-100">See all</Button>
          <Button
            className="btn btn-green w-100"
            onClick={() => setStep("two")}
          >
            Add a transaction
          </Button>
        </div>
      )}

      {step === "two" && 
      <div>
        <img
            className="back"
            src={Vector}
            alt="backbutton"
            onClick={() => setStep("one")}
          />
          <h2>Add a transaction</h2>

          <Form.Group className="transaction">
          <Form.Label>Enter transaction name</Form.Label>
          <Form.Control type="text"  name="transaction" required/>
        </Form.Group>

        <Form.Group className="amount">
          <Form.Label>Enter the amount</Form.Label>
          <Form.Control type="text" name="amount" required/>
        </Form.Group>

        <Button className="btn btn-green w-50">Income</Button>
        <Button className="btn btn-green w-50">Expense</Button>
        <Button className="btn btn-green w-100">Continue</Button> 
        </div>}
    </div>
  );
};

export default Transactions;
