import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import exit from "../assets/exit.jpg";
import dropdown from "../assets/dropdown.png";
import dropup from "../assets/dropup.png"
import axios from "axios";

import 'simple-react-donut-chart/src/style.css'
import { jwtDecode } from "jwt-decode";

import { useNavigate } from "react-router-dom";

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the components needed for the chart
ChartJS.register(ArcElement, Tooltip, Legend);


const DonutChart = ({ budgetMode, budget, spendings }) => {

  // Calculate the proportions for the chart
  const frac1 = (budget / (Number(budget) + Number(spendings))) * 100;
  const frac2 = (spendings / (Number(budget) + Number(spendings))) * 100;

  console.log(frac1);
  console.log(frac2);

  // Adjust the data to show the "empty" part with a separate value
  const mode = budgetMode === 'showRemainingBudget' ? [
    {
      label: 'Spendings',
      value: frac2,
    },
    {
      label: 'Remaining Budget',
      value: 100 - frac2,  // Remaining part
    }
  ] : [
    {
      label: 'Remaining Budget',
      value: frac1,
    },
    {
      label: 'Spendings',
      value: 100 - frac1,  // Remaining part
    }
  ];

  const data = {
    labels: [],
    datasets: [
      {
        label: 'Budgets',
        data: mode.map(item => item.value),
        backgroundColor: [
          '#16272F', // Color for remaining/empty part
          '#56F0B8', // Color for spendings
        ],
        borderColor: [
          '#16272F',
          '#56F0B8',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',  // Adjusted to a valid position
      },
      tooltip: {
        enabled: true,
      },
    },
    cutout: '90%',  // Adjust donut hole size
  };

  return <Doughnut data={data} options={options} />;
};


const Dashboard = ({ onDashboardData }) => {
  const [decodedToken] = useState(null);
  // const [spendings, setSpendings] = useState(0);
  // const [budget, setBudget] = useState(0);
  const [budgetMode, setBudgetMode] = useState('showRemainingBudget')
  const [showAccounts, setShowAccounts] = useState(false)
  const [userInfo, setUserInfo] = useState()
  const [userGoals, setUserGoals] = useState([])

  const primaryGoal = userGoals.find(goal => goal.isPrimary) 
  const nonPrimaryGoals = userGoals.filter(goal => !goal.isPrimary) 

  const navigate = useNavigate()


useEffect(() => {
  // console.log(decodedToken)
  const fetchUserGoals = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      return;
    }

    const decodedToken = jwtDecode(token);
    const response = await axios.get(`http://localhost:5000/goals/${decodedToken?.user_id}`)
    const useInfoResponse = await axios.get(`http://localhost:5000/users/${decodedToken?.user_id}`)
    setUserGoals(response.data.goals)
    setUserInfo(useInfoResponse.data)
    onDashboardData(token)
  }

  fetchUserGoals()
}, [onDashboardData])


const handleLogout = () => {
    sessionStorage.removeItem("token");
    setTimeout(() => {navigate('/login')}, 500)
    onDashboardData('');
};

const handleDropdownChange = e => {
  
  if (e.target.value === 'remaining') {
    setBudgetMode('showRemainingBudget')

  } else if (e.target.value === 'spending') {
    setBudgetMode('showSpending')
  }
} 


  return (
    <div id="dashboard-container">
      <div className="logout" onClick={handleLogout}>
        <i className="fa fa-sign-out fs-1" aria-hidden="true"></i>
      </div>
      <h2>Welcome back, {userInfo?.firstname}! </h2>


    <div className="w-75 mx-auto" id="chart-container">
    <DonutChart budget={userInfo?.budget} spendings={userInfo?.spendings} budgetMode={budgetMode}   emptyColor={'#e0e0e0'} />
    {userInfo && <label>${budgetMode === 'showSpending' ? userInfo?.spendings : userInfo?.budget }</label>}
    </div>

      <select id="dropdown" onChange={handleDropdownChange}>
        <option value="remaining">Remaining budget</option>
        <option value="spending">Spendings</option>
      </select>

      <p className="mb-0" onClick={() => setShowAccounts(!showAccounts)}>  Show accounts { showAccounts ? <img src={dropup} alt="dropup"  />: <img src={dropdown} alt="dropdown"  />} </p>
      {showAccounts && <div className="d-flex justify-content-between">
        <div className="w-50 me-1 account-item">
          <p className="mb-4">Checking</p>
          <p className="mb-0 fs-2 text-center">${userInfo?.checking}</p>
        </div>
        <div className="w-50 ms-1 account-item">
          <p className="mb-4">Savings</p>
          <p className="mb-0 fs-2 text-center">${userInfo?.savings}</p>
          </div>
      </div>}

      <p>
        See recent transactions <img src={dropdown} alt="dropdown" />
      </p>
      <Link to="/transactions">All Transactions</Link>

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
