import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import exit from "../assets/exit.jpg";
import dropdown from "../assets/dropdown.png";
import dropup from "../assets/dropup.png"
import axios from "axios";

import DonoutChart from 'simple-react-donut-chart'
import 'simple-react-donut-chart/src/style.css'

import { jwtDecode } from "jwt-decode";
import Button from "react-bootstrap/esm/Button";

import { useNavigate } from "react-router-dom";

const Dashboard = ({ onDashboardData }) => {
  const [decodedToken, setDecodedToken] = useState(null);
  const [spendings, setSpendings] = useState(5000);
  const [budgetMode, setBudgetMode] = useState('showRemainingBudget')
  const [percentageVal, setPercentageVal] = useState(null)
  const [showAccounts, setShowAccounts] = useState(false)
  const [userGoals, setUserGoals] = useState([])

  const primaryGoal = userGoals.find(goal => goal.isPrimary) 
  const nonPrimaryGoals = userGoals.filter(goal => !goal.isPrimary) 

  const navigate = useNavigate()

  console.log(primaryGoal)

useEffect(() => {
    const token = sessionStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    setDecodedToken(decodedToken);
    onDashboardData(token);

    const budget = decodedToken?.budget || 0;
    const percentage = (budget - spendings) / budget * 100;
    setPercentageVal(percentage)
}, []);


useEffect(() => {
  console.log(decodedToken)
  const fetchUser = async () => {
    const token = sessionStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const response = await axios.get(`http://localhost:5000/goals/${decodedToken?.user_id}`)
    setUserGoals(response.data.goals)
  }

  fetchUser()
}, [])



const handleLogout = () => {
    sessionStorage.removeItem("token");
    setTimeout(() => {navigate('/login')}, 500)
    onDashboardData('');
    
};

const handleDropdownChange = e => {
  const budget = decodedToken?.budget || 0;
  
  if (e.target.value === 'remaining') {
    setBudgetMode('showRemainingBudget')
    const percentage = (budget - spendings) / budget * 100;
    setPercentageVal(percentage)
    console.log(percentage)

  } else if (e.target.value === 'spending') {
    setBudgetMode('showSpending')
    setPercentageVal(100-percentageVal)
  }
} 


  return (
    <div id="dashboard-container">
      <div className="logout" onClick={handleLogout}>
        <img src={exit} alt="logout" />
      </div>
      <h2>Welcome back, {decodedToken?.firstname}! </h2>
      
      {budgetMode === 'showRemainingBudget' && <DonoutChart
          percentage={percentageVal}
          colorOn="#56F0B8"
          colorOff="#16272F"
          circleColor="#0B0317"
          labelOn={`$${decodedToken?.budget}`}
          labelOff=""
          baseClass="customize"
          textStyle={{
              color: '#ff0000',
          }}
          labelStyle={{
              off: {
                  fontSize: '16px',
              },
              on: {
                  fontSize: '18px',
              },
          }}
/>}


{budgetMode === 'showSpending' && <DonoutChart
          percentage={percentageVal}
          colorOn="#16272F" 
          colorOff="#56F0B8" 
          circleColor="#0B0317"
          labelOn={`$${spendings}`}
          labelOff=""
          baseClass="customize"
          textStyle={{
              color: '#56F0B8',
          }}
          labelStyle={{
              off: {
                  fontSize: '16px',
              },
              on: {
                  fontSize: '18px',
              },
          }}
/>}

      <select id="dropdown" onChange={handleDropdownChange}>
        <option value="remaining">Remaining budget</option>
        <option value="spending">Spendings</option>
      </select>

      <p className="mb-0" onClick={() => setShowAccounts(!showAccounts)}>  Show accounts { showAccounts ? <img src={dropup} alt="dropup"  />: <img src={dropdown} alt="dropdown"  />} </p>
      {showAccounts && <div className="d-flex justify-content-between">
        <div className="w-50 me-1 account-item">
          <p className="mb-4">Checking</p>
          <p className="mb-0 fs-2 text-center">${decodedToken?.checking}</p>
        </div>
        <div className="w-50 ms-1 account-item">
          <p className="mb-4">Savings</p>
          <p className="mb-0 fs-2 text-center">${decodedToken?.savings}</p>
          </div>
      </div>}

      <p>
        See recent transactions <img src={dropdown} alt="dropdown" />
      </p>

      <div className="goal-tracker">
        <h2>Goal Tracker</h2>
        <div className='goal-item d-flex p-4 align-items-center'>
                <div className='me-3'><img src={`${primaryGoal?.icon}`} alt="asdas" /></div>
                <div>{primaryGoal?.text}</div>
                <div className="fs-2 ms-auto"> ${primaryGoal?.amount}</div>
        </div>

        <div className="d-flex py-4 justify-content-between gap-2 flex-wrap">
          {nonPrimaryGoals.map(goal => (
             <div key={goal.goal_id} id={goal.goal_id} className="account-item" style={{width: '48%'}}>
             <p className="mb-4">{goal?.text}</p>
             <p className="mb-0 fs-2 text-center">${goal?.amount}</p>
           </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
