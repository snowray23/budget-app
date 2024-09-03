import {useState, useEffect} from 'react';




import {jwtDecode} from 'jwt-decode';

const Dashboard = ({onDashboardData}) => {
  const [decodedToken, setDecodedToken] = useState(null)

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    const decodedToken = jwtDecode(token);
    setDecodedToken(decodedToken)
    onDashboardData(token)
  }, [])

  const handleLogout = () =>{
    sessionStorage.removeItem('token')
  }

  return (
    <div id="dashboard-container">
      <h2>Welcome back, {decodedToken?.firstname}! <span onClick={handleLogout}><small>Logout</small></span></h2>

      <p>Show  accounts</p>

      <p>See recent transactions</p>





        <div className="goal-tracker">
            <h2>Goal Tracker</h2>


        </div>

     
    </div>
  );
};

export default Dashboard;