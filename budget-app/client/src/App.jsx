import "./App.css";
import LoginSignup from "./components/LoginSignup";
import Login from "./components/Login";

import {Route, Routes} from 'react-router-dom';
import Signup from "./components/Signup";
import BudgetSetup from "./components/BudgetSetup";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginSignup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/budget-setup" element={<BudgetSetup/>}/>
      </Routes>
    </div>
  );
}

export default App;
