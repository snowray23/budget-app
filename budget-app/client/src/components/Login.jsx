import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate= useNavigate()
    const [credential, setCredential] = useState({username: "", password: ""})
    const [errorMsge, setErrorMsg] = useState("")
    const [token, setToken] = useState("") 

    const handleChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log('Form submitted')

        axios.post('http://localhost:5000/login', credential)
        .then(res => {
          setToken(res.data.access_token)
          sessionStorage.setItem('token', res.data.access_token)
          navigate('/dashboard')
          setErrorMsg("")
        })
        .catch(err => {
          setErrorMsg(err.response.data.message)
        })  
    }

  return (
    <div id="login">
        <h2>Enter your username and password</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username*</Form.Label>
          <Form.Control type="text" value={credential.username} onChange={handleChange} name="username" required/>
        </Form.Group>

        <Form.Group className="password">
          <Form.Label>Password*</Form.Label>
          <Form.Control type="password" value={credential.password} onChange={handleChange} name="password" required/>
        </Form.Group>

        <div>
          <p className="text-danger"><small>{errorMsge}</small></p>
        </div>
        
        <Button className="btn btn-green w-100" disabled={!credential.username || !credential.password} type="submit" >
          Continue
        </Button>
      </Form>

      <Link to="/signup" className="signup-link">Create an account</Link>
    </div>
  );
};

export default Login;
