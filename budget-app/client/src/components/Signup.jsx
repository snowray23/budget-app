import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState } from "react";
import Vector from "../assets/Vector.png";
import PasswordChecklist from "react-password-checklist";

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
  });
  const [currentStep, setCurrentStep] = useState("one");
  
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    console.log('Submitted')

    if (true) {
      
    } else {
      console.log('User registration unsuccessful!')
    }
  }

  return (
    <div id="signup">
      <Link to="/">
        <img className="back" src={Vector} alt="backbutton" />
      </Link>
      <Form>
        {currentStep === "one" && (
          <div className="step-one">
            <h2>What's your name?</h2>

            <Form.Group className="mb-3">
              <Form.Label>First Name*</Form.Label>
              <Form.Control
                type="text"
                value={userInfo.firstName}
                onChange={handleChange}
                name="firstName"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Last Name*</Form.Label>
              <Form.Control
                type="text"
                value={userInfo.lastName}
                onChange={handleChange}
                name="lastName"
                required
              />
            </Form.Group>

            <Button
              className="btn btn-green w-100"
              disabled={!userInfo.firstName || !userInfo.lastName}
              onClick={() => setCurrentStep("two")}
            >
              Continue
            </Button>
          </div>
        )}

        {currentStep === "two" && (
          <div>
            <img
              className="back"
              src={Vector}
              alt="backbutton"
              onClick={() => setCurrentStep("one")}
            />
            <h2>Choose a username</h2>
            <Form.Group className="mb-3">
              <Form.Label>Username*</Form.Label>
              <Form.Control
                type="text"
                value={userInfo.userName}
                onChange={handleChange}
                name="userName"
                required
              />
            </Form.Group>

            <Button
              className="btn btn-green w-100"
              disabled={!userInfo.userName}
              onClick={() => setCurrentStep("three")}
            >
              Continue
            </Button>
          </div>
        )}

        {currentStep === "three" && (
          <div>
            <img
              className="back"
              src={Vector}
              alt="backbutton"
              onClick={() => setCurrentStep("two")}
            />
            <h2>Set your password</h2>
            <Form.Group className="mb-3">
              <Form.Label>Password*</Form.Label>
              <Form.Control
                type="password"
                value={userInfo.password}
                onChange={handleChange}
                name="password"
                required
                autoComplete="off"
              />
            </Form.Group>

            <PasswordChecklist
              rules={["minLength", "lowercase", "capital", "number"]}
              minLength={8}
              value={userInfo.password}
              onChange={(isValid) => setIsFormValid(isValid)}
              messages={{
                minLength: "At least 8 characters",
                lowercase: "1 lowercase",
                number: "1 number",
                capital: "1 uppercase",
              }}
            />

            <Button 
              as={Link}
              to="/budget-setup"
              state={{ userInfo }}  
              className="btn btn-green w-100"
              disabled={!isFormValid}
            >
              Continue
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
};

export default Signup;
