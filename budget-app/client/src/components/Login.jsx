import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const [credential, setCredential] = useState({username: "", password: ""})

    const handleChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log('Form submitted')
    }

  return (
    <div id="login">
        <h2>Enter your username and password</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username*</Form.Label>
          <Form.Control type="text" value={credential.username} onChange={handleChange} name="username"/>
        </Form.Group>

        <Form.Group className="password">
          <Form.Label>Password*</Form.Label>
          <Form.Control type="password" value={credential.password} onChange={handleChange} name="password"/>
        </Form.Group>
        
        <Button className="btn btn-green w-100" type="submit">
          Continue
        </Button>
      </Form>

      <Link to="/signup" className="signup-link">Create an account</Link>
    </div>
  );
};

export default Login;
