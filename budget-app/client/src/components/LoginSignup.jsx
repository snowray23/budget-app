
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const LoginSignup = () => {
  return (
    <div id="login-signup">
      <div className="logo">
        <img
          src="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/c7/ae/9a/c7ae9a7c-f4fc-07ad-04b3-dc04d76a95e3/AppIcon-0-0-1x_U007epad-0-85-220.png/60x60bb.jpg"
          alt="Logo"
        />
      </div>

      <h2 className="title">Sign up or log in</h2>
      <Button as={Link} to="/login" className="btn btn-login w-100">Log In</Button>
      <Button className="btn btn-green">Sign Up</Button>
    </div>
  );
};

export default LoginSignup;
