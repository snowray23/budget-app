import "./App.css";
import LoginSignup from "./components/LoginSignup";
import Login from "./components/Login";

import {Route, Routes} from 'react-router-dom';
import Signup from "./components/Signup";
import BudgetSetup from "./components/BudgetSetup";
import GoalSetup from "./components/GoalSetup";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Goals from "./components/Goals";
import Settings from "./components/Settings";
import Navigation from './components/Navigation';

import {useState} from 'react'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const handleDashboardData = (data) => {
    setIsLoggedIn(true); 
  };
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginSignup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/budget-setup" element={<BudgetSetup/>}/>
        <Route path="/goal-setup" element={<GoalSetup/>}/>
        <Route path="/dashboard"  element={<Dashboard onDashboardData={handleDashboardData} />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      {isLoggedIn && <Navigation/>}
    </div>
  );
}

export default App;