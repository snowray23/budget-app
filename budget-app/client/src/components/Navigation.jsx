import { useState } from "react";
import { NavLink } from "react-router-dom";

import NavDashboard from "../assets/NavDashboard.png";
import NavGoals from "../assets/NavGoals.png";
import NavTransactions from "../assets/NavTransactions.png";
import NavSettings from "../assets/NavSettings.png";

import NavDashboardActive from "../assets/NavDashboardActive.png";
import NavGoalsActive from "../assets/NavGoalsActive.png";
import NavTransactionsActive from "../assets/NavTransactionsActive.png";
import NavSettingsActive from "../assets/NavSettingsActive.png";

const Navigation = () => {
  const [isNavActive, setIsNavActive] = useState(false);
  return (
    <nav className="bottom-nav">
      <div className="nav-item">
        <NavLink to="/dashboard">
          {({ isActive }) => (
            <>
              <img
                src={isActive ? NavDashboardActive : NavDashboard}
                alt="Dashboard"
                className="icon"
              />
            </>
          )}
        </NavLink>
      </div>
      <div className="nav-item">
      <NavLink to="/transactions">
          {({ isActive }) => (
            <>
              <img
                src={isActive ? NavTransactionsActive : NavTransactions}
                alt="transactions"
                className="icon"
              />
            </>
          )}
        </NavLink>
        
      </div>
      <div className="nav-item">
      <NavLink to="/goals">
          {({ isActive }) => (
            <>
              <img
                src={isActive ? NavGoalsActive : NavGoals}
                alt="goals"
                className="icon"
              />
            </>
          )}
        </NavLink>
        
      </div>
      <div className="nav-item">
      <NavLink to="/settings">
          {({ isActive }) => (
            <>
              <img
                src={isActive ? NavSettingsActive : NavSettings}
                alt="Settings"
                className="icon"
              />
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
