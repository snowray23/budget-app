
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import {useState, useEffect} from 'react';
import logoLg from '../assets/logo_lg.png'
import logo from '../assets/logo.png'


const LoginSignup = () => {
  const [showLanding, setShowLanding] = useState(true)

  useEffect(() => {
    setTimeout(() => { setShowLanding(false) }, 2000)
  }, [])

  return (
    <>
    {showLanding ? <div className="landing">
      <img src={logoLg} alt="large-logo" />
    </div> :
    <div id="login-signup">
      <div className="logo">
        <img
          src={logo}
          alt="Logo"
        />
      </div>

      <h2 className="title">Sign up or log in</h2>
      <Button as={Link} to="/login" className="btn btn-login w-100">Log In</Button>
      <Button as={Link} to="/signup" className="btn btn-green w-100" >Sign Up</Button>
    </div>}
    </>
  );
};

export default LoginSignup;
