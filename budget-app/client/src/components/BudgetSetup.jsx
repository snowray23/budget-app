import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Vector from "../assets/Vector.png";
import { useLocation } from "react-router-dom";

import { expenses } from "../expenses";
import circle from "../assets/circle.webp"

const BudgetSetup = () => {
  const location = useLocation();
  const userInfo = (location.state && location.state.userInfo) || (localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')));

  const [step, setStep] = useState("one");
  const [financialInfo, setFinancialInfo] = useState({
    income: "",
    checking: "",
    savings: "",
  });
  const [selectedExpenses, setSelectedExpenses] = useState([]);
  const [allExpnseInputHasValue, setAllExpnseInputHasValue] = useState(false);
  const [remainingBalance, setRemainingBalance] = useState(0)


  const handleChange = (e) => {
    setFinancialInfo({ ...financialInfo, [e.target.name]: e.target.value });
  };

  const handleClick = (expense) => {
    const foundExpense = selectedExpenses.find(
      (item) => item.id === expense.id
    );
    if (!foundExpense) {
      expense.selected = true;
      setSelectedExpenses([...selectedExpenses, expense]);
    } else {
      expense.selected = false;
      const filteredExpenses = selectedExpenses.filter(
        (item) => item.id !== expense.id
      );
      setSelectedExpenses(filteredExpenses);
    }
  };

  const handleExpenseChange = (e, expenseItem) => {
    const updatedExpenses = selectedExpenses.map(item => {
      if(item.id === expenseItem.id) {
        return {...item, amount:  e.target.value}
      }
      return item
    })
    setSelectedExpenses(updatedExpenses)
  };
  
  const checkInputFieldHasValue = () => {
    const hasValueArr = selectedExpenses.filter(item => item.amount.length > 0)
   if  (hasValueArr.length === selectedExpenses.length) {
    setAllExpnseInputHasValue(true);
   }else {
        setAllExpnseInputHasValue(false)
    }
   };
  

  useEffect(() => {
    checkInputFieldHasValue()
  }, [selectedExpenses])

  useEffect(() => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
  }, [])
  

  return (
    <div id="budget-setup">
      {step === "one" && (
        <div>
          {/* <Link to="/">
        <img className="back" src={Vector} alt="backbutton" />
        </Link> */}
          <h2>Let's set up your budget</h2>

          <Form.Group className="mb-3">
            <Form.Label>What's your monthly income</Form.Label>
            <Form.Control
              type="number"
              value={financialInfo.income}
              onChange={handleChange}
              name="income"
              required
              placeholder="$0.00"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              How much have you got in your checking account?
            </Form.Label>
            <Form.Control
              type="number"
              value={financialInfo.checking}
              onChange={handleChange}
              name="checking"
              required
              placeholder="$0.00"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              How much have you got in your savings account?
            </Form.Label>
            <Form.Control
              type="number"
              value={financialInfo.savings}
              onChange={handleChange}
              name="savings"
              placeholder="$0.00"
            />
          </Form.Group>

          <Button
            className="btn btn-green w-100"
            disabled={
              !financialInfo.income ||
              !financialInfo.checking ||
              !financialInfo.savings
            }
            onClick={() => setStep("two")}
          >
            Continue
          </Button>
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

          <h2>Let's set up your budget</h2>
          <p className="my-0">What recurring expenses do you have?</p>

          <div className="goals d-flex flex-wrap gap-3 justify-content-center">
            {expenses.map((expense) => (
              <div
                style={{ border: expense.selected && "3px solid #f6f5f7" }}
                className="goal d-flex flex-column align-items-center"
                key={expense.id}
                onClick={() => handleClick(expense)}
              >
                <img src={expense.icon} alt={expense.text} />{" "}
                <p className="mt-4 text">{expense.text}</p>
              </div>
            ))}
          </div>

          <Button
            className="btn btn-green w-100"
            onClick={() => setStep("three")}
            disabled={selectedExpenses.length === 0}
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

          <h2>Let's set up your budget</h2>
          <p>How much do you spend on your recurring expenses?</p>
          <p>Enter the maximum amount you pay each month</p>

          <div className="expenses-list">
            {selectedExpenses.map((item) => (
              <div
                className="expense-item d-flex justify-content-between align-items-center px-2 py-3 my-2"
                key={item.id}
              >
                <div className="expense-icon">
                  <img src={item.icon} alt={item.text} className="me-2" />{" "}
                  <span>{item.text}</span>{" "}
                </div>
                <div className="expense-input d-flex align-items-center">
                  <span className="me-2">$</span>
                  <input
                    type="number"
                    className="w-100 p-2"
                    placeholder="$0.00"
                    onChange={(e) => handleExpenseChange(e, item)}
                  />{" "}
                </div>
              </div>
            ))}
          </div>

          <Button
            className="btn btn-green w-100"
            onClick={() => {
              setStep("four")
              setTimeout(() => {
                setStep("five")
              }, 3000)
              const income = financialInfo.income;
              let sumExpenses = 0;
              const expenses = selectedExpenses.forEach(item => {
                sumExpenses += Number(item.amount)
              })

              setRemainingBalance(income - sumExpenses)
            }}
            disabled={!allExpnseInputHasValue}
          >
            Continue
          </Button>
        </div>
      )}

{step === 'four' && <div id="spinner">
  <h2>Calculating your budget</h2>
  <img src={circle} alt="spinner" width="200px" height="200px"/>

  </div>}

  {step === 'five' && <div>
    <h2>Based on your income and expenses, we've calculated the amount you have to spend</h2>

<p id="remaining-balance">${remainingBalance}</p>
    <Button
            className="btn btn-green w-100"
            disabled={!allExpnseInputHasValue}
            as={Link}
            state={{ userInfo, financialInfo, remainingBalance }}
            to="/goal-setup"
          >
            Continue
          </Button>
    <Button
            className="w-100 mt-2 border-light"
            style={{background: 'transparent', color: '#F6F5F7'}}
            onClick={() => setStep('one')}
          >
            I want to change something
          </Button>
    
    </div>}

      
    </div>
  );
};

export default BudgetSetup;