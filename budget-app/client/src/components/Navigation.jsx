import React from 'react'
import { Link } from 'react-router-dom'



import NavDashboard from "../assets/NavDashboard.png"
import NavGoals from "../assets/NavGoals.png"
import NavTransactions from "../assets/NavTransactions.png"
import NavSettings from "../assets/NavSettings.png"

const Navigation = () => {
  return (
    <nav className="bottom-nav">
        <div className="nav-item">
            <Link to="/dashboard">
                <img src={NavDashboard} alt="Dashboard" className="icon" />
                <span className="nav-text">Dashboard</span>
          </Link>
        </div>
        <div className="nav-item">
            <Link to="/transactions">
          <img src={NavTransactions} alt="Transactions" className="icon" />
          <span className="nav-text">Transactions</span>
          </Link>
        </div>
        <div className="nav-item">
            <Link to="/goals">
        <img src={NavGoals} alt="Goals" className="icon" />
          <span className="nav-text">Goals</span>
          </Link>
        </div>
        <div className="nav-item">
            <Link to="/settings">
                <img src={NavSettings} alt="Settings" className="icon" />
                <span className="nav-text">Settings</span>
            </Link>
        </div>
      </nav>
  )
}

export default Navigation
