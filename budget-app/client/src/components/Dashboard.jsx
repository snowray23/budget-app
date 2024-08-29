import React from 'react';


import NavDashboard from "../assets/NavDashboard.png"
import NavGoals from "../assets/NavGoals.png"
import NavTransactions from "../assets/NavTransactions.png"
import NavSettings from "../assets/NavSettings.png"

const Dashboard = () => {
  return (
    <div id="dashboard-container">
      <h2>Welcome back, name!</h2>

      <p>Show  accounts</p>

      <p>See recent transactions</p>





        <div className="goal-tracker">
            <h2>Goal Tracker</h2>


        </div>

      <nav className="bottom-nav">
        <div className="nav-item">
        <img src={NavDashboard} alt="Dashboard" className="icon" />
          <span className="nav-text">Dashboard</span>
        </div>
        <div className="nav-item">
        <img src={NavTransactions} alt="Transactions" className="icon" />
          <span className="nav-text">Transactions</span>
        </div>
        <div className="nav-item">
        <img src={NavGoals} alt="Goals" className="icon" />
          <span className="nav-text">Goals</span>
        </div>
        <div className="nav-item">
        <img src={NavSettings} alt="Settings" className="icon" />
          <span className="nav-text">Settings</span>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;