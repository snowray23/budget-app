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
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  return (
    <div id="signup">
         <Link to="/"><img
            className="back"
            src={Vector}
            alt="backbutton"
          /></Link>
      {currentStep === "one" && (
        <div className="step-one">
          <h2>What's your name?</h2>
          {/* <Form> */}
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

          <Form.Group className="password">
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
          {/* </Form> */}
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
          {/* <Form.Group className="mb-3">
            <Form.Label>Password*</Form.Label>
            <Form.Control
              type="password"
              value={userInfo.password}
              onChange={handleChange}
              name="password"
              required
            />
          </Form.Group> */}

<input
                type="password"
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            ></input>

<PasswordChecklist
                rules={[
                    "minLength",
                    "specialChar",
                    "number",
                    "capital",
                  
                ]}
                minLength={8}
                value={password}
                onChange={(isValid) => setIsFormValid(isValid)}
            />

          <Button
            className="btn btn-green w-100"
            type="submit"
            disabled={!userInfo.password}
          >
            Continue
          </Button>


        
        </div>
      )}
    </div>
  );
};

export default Signup;
