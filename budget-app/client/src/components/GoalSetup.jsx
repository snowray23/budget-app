import React, { useState } from 'react';
import { useLocation, Link } from "react-router-dom";
import Vector from "../assets/Vector.png";
import { goals } from '../goals'; 
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios'

const GoalSetup = () => {
  const location = useLocation();
  const { userInfo, financialInfo, remainingBalance } = location.state;
  
 
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [step, setStep] = useState("one"); 

  const [customGoalName, setCustomGoalName] = useState('')
  const [radioGoalSelected, setRadioGoalSelected] = useState(false);
  const [primaryGoalAmount, setPrimaryGoalAmount] = useState('')

  // console.log({...userInfo, ...financialInfo, budget: remainingBalance, goals: selectedGoals})

  const handleGoalClick = (goal) => {
    const foundGoal = selectedGoals.find(
      (item) => item.id === goal.id
    );
    if (!foundGoal) {
      goal.selected = true;
      setSelectedGoals([...selectedGoals, goal]);
    } else {
      goal.selected = false;
      const filteredGoals = selectedGoals.filter(
        (item) => item.id !== goal.id
      );
      setSelectedGoals(filteredGoals);
    }
  };


  const handleCustomGoalName = e => {
    setCustomGoalName( e.target.value)

    const updatedGoals = selectedGoals.map(item => {
      if(item.id === 'custom') {
          return {...item, text: e.target.value}
      }
      return item
    })

    setSelectedGoals(updatedGoals)
  }

  const handleRadioChange = id => {
    setRadioGoalSelected(true)
    setPrimaryGoalAmount('')

    const updatedGoals = selectedGoals.map(item => {
      if(item.id === id) {
          return {...item, isPrimary: true}
      } else {
        return {...item, isPrimary: false, amount: ''}
      }
      return item
    })
    setSelectedGoals(updatedGoals)
  }

  const handlePrimaryGoalAmount = (e) => {
    setPrimaryGoalAmount(e.target.value)
    const updatedGoals = selectedGoals.map(item => {
      if(item.isPrimary) {
          return {...item, amount: e.target.value}
      }
      return item
    })
    setSelectedGoals(updatedGoals)
  }

  const handleSecondaryGoals = (e, id) => {
    const updatedGoals = selectedGoals.map(item => {
      if(item.id === id) {
          return {...item, amount: e.target.value}
      }
      return item
    })
    setSelectedGoals(updatedGoals)
  }

 const handleClickSubmit = () => {
     
     const data = {...userInfo, ...financialInfo, budget: remainingBalance, goals: selectedGoals
      .map(item => ({ ...item, user_id: 1 })) // Add `user_id` property
      .map(({ selected, id, ...rest }) => rest)
      } // Remove `selected` and `id` properties}

     console.log(data)

     axios.post('http://127.0.0.1:5000/signup', data)
     .then(res => {
        setStep("four")
     })
     .catch(err => {
        alert('Signup failed!')
        console.log(err)
     })
 }

  
  return (
    <div id="goal-setup">
      {step === "one" && (
        <div>
          <Link to="/budget-setup">
            <img className="back" src={Vector} alt="backbutton" />
          </Link>

          <h2>What are your main financial goals?</h2>

          <div className="goalset d-flex flex-wrap" style={{ gap: '8px' }}>
            {goals.map((goal) => (
              <div
                className="goalset-item d-flex flex-column align-items-center justify-content-center"
                key={goal.id}
                onClick={() => handleGoalClick(goal)}
                style={{
                  border: goal.selected ? "3px solid #f6f5f7" : "none",
                }}
              >
                <img src={goal.icon} alt={goal.text} className="goalset-icon" />
                <p className="goalset-text mt-2">{goal.text}</p>
              </div>
            ))}
          </div>

          {  !selectedGoals.find(item => item.id === 'custom') && <Button className="btn btn-green w-100"
          onClick={() => setStep('two')}
          disabled={selectedGoals.length === 0}
          >Continue</Button>}

          { selectedGoals.find(item => item.id === 'custom') && <div className="custom-goal-info">
            <p className="custom-goal">Enter your custom financial goal</p>
            <input type="text" className="goal-amount" onChange={handleCustomGoalName} name='customName' value={customGoalName} />
            {/* <p>What amount do you want to save</p> */}
            {/* <input type="number" placeholder='$0.00' onChange={handleCustomGoalInfo} name="customAmount" value={customGoalInfo.customAmount} /> */}
            <Button className="btn btn-green w-100"
              onClick={() => setStep('two')}
              disabled={!customGoalName}
              >Continue</Button>
          </div>}
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

          <h2>Which one is your primary focus?</h2>

          <div className="goal-list">
            {selectedGoals.map((item, index) => (
              <div
                className="goal-item d-flex justify-content-between align-items-center px-3 py-3 my-2"
                key={item.id}
                
              >
                <div className="goal-icon">
                  <label htmlFor={`individual-goal-${index}`}>
                    <img src={item.icon} alt={item.text} className="me-2" />{" "}
                    <span>{item.text}</span>{" "}
                  </label>
                </div>
                <div className="goal-input d-flex align-items-center">
                  <input
                    name="goal"
                    type="radio"
                    className="w-100 p-2"
                    id={`individual-goal-${index}`}
                    onChange={() => handleRadioChange(item.id)}
                  />{" "}
                </div>
              </div>
            ))}
          </div>

          <h2>How much would you like to save?</h2>
          <input 
          type="number"
          className="primary-amount"
          placeholder='$0.00'
          onChange={handlePrimaryGoalAmount}
          value={primaryGoalAmount}
          />
          
          <Button
            className="btn btn-green w-100"
            onClick={() => setStep("three")}
            disabled={!radioGoalSelected || !primaryGoalAmount}
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

          <h2>Let's set up your secondary goals</h2>
          {selectedGoals.filter(item => !item.isPrimary).map(secondary => (
            <div key={secondary.id} className='secondary-goal-container mt-4'>
              <div className='secondary-goal d-flex p-4 align-items-center'>
                <div className='me-3'><img src={secondary.icon} alt={secondary.text} /></div>
                <div>{secondary.text}</div>
              </div>
              <h2>How much would you like to save?</h2>
              <input type="number" placeholder='$0.00' className='secondary-amount' onChange={(e) => handleSecondaryGoals(e, secondary.id)}/>
            </div>
          ))}

          <Button
            className="btn btn-green w-100"
            disabled={selectedGoals.filter(item => !item.isPrimary).length + 1 !== selectedGoals.filter(item => item.amount).length}
            onClick={handleClickSubmit}
          >
            Continue
          </Button>
  </div>
)}


{step === "four" && (
  <div className='d-flex justify-content-center align-items-center flex-column' style={{height: '60vh'}}>
  <h2>You're all set! </h2>

  <Button
            className="btn btn-green w-100"
          >
            Take me to my dashboard
          </Button>
          
  </div>
)}



    </div>
  );
};

export default GoalSetup;