import React from 'react'
import { NavLink } from 'react-router-dom'



import NavDashboard from "../assets/NavDashboard.png"
import NavGoals from "../assets/NavGoals.png"
import NavTransactions from "../assets/NavTransactions.png"
import NavSettings from "../assets/NavSettings.png"

const Navigation = () => {
  return (
    <nav className="bottom-nav">
        <div className="nav-item">
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
                <img src={NavDashboard} alt="Dashboard" className="icon" />
                <span className="nav-text">Dashboard</span>
          </NavLink>
        </div>
        <div className="nav-item">
            <NavLink to="/transactions" className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
          <img src={NavTransactions} alt="Transactions" className="icon" />
          <span className="nav-text">Transactions</span>
          </NavLink>
        </div>
        <div className="nav-item">
            <NavLink to="/goals" className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
        <img src={NavGoals} alt="Goals" className="icon" />
          <span className="nav-text">Goals</span>
          </NavLink>
        </div>
        <div className="nav-item">
            <NavLink to="/settings" className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
                <img src={NavSettings} alt="Settings" className="icon" />
                <span className="">Settings</span>
            </NavLink>
        </div>
      </nav>
  )
}

export default Navigation
