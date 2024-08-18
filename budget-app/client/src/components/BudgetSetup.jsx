import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState } from "react";
import Vector from "../assets/Vector.png";
import { useLocation } from'react-router-dom';

import housing from "../assets/housing.png";
import insurance from "../assets/insurance.png";
import loans from "../assets/loans.png";
import membership from "../assets/membership.png";
import mental from "../assets/mental.png";
import other from "../assets/other.png";
import phone from "../assets/housing.png";
import subscribe from "../assets/sub.png";
import utilities from "../assets/utilities.png";

const BudgetSetup = () => {
    const location = useLocation();
    const { userInfo } = location.state;
   
    const [step, setStep] = useState('one')
    const [financialInfo, setFinancialInfo] = useState({ income: '', checkingBalance: '', savingsBalance: ''  })

    const handleChange = (e) => {
        setFinancialInfo({ ...financialInfo, [e.target.name]: e.target.value });
      };

  return (
    <div id="budget-setup">
        {step === 'one' && <div>
        {/* <Link to="/">
        <img className="back" src={Vector} alt="backbutton" />
        </Link> */}
        <h2>Let's set up your budget</h2>

        <Form.Group className="mb-3">
              <Form.Label>What's your monthly income</Form.Label>
              <Form.Control
                type="number"
                value={financialInfo.income}
                onChange={handleChange}
                name="income"
                required
                placeholder="$0.00"
              />
        </Form.Group>

        <Form.Group className="mb-3">
              <Form.Label>How much have you got in your checking account?</Form.Label>
              <Form.Control
                type="number"
                value={financialInfo.checkingBalance}
                onChange={handleChange}
                name="checkingBalance"
                required
                placeholder="$0.00"
              />
        </Form.Group>

        <Form.Group className="mb-3">
              <Form.Label>How much have you got in your savings account?</Form.Label>
              <Form.Control
                type="number"
                value={financialInfo.savingsBalance}
                onChange={handleChange}
                name="savingsBalance"
                required
                 placeholder="$0.00"
              />
        </Form.Group>

        <Button 
              className="btn btn-green w-100"
              disabled={!financialInfo.income || !financialInfo.checkingBalance || !financialInfo.savingsBalance}
              onClick={() => setStep('two')}
            >
              Continue
        </Button>
        </div>}

        {step === 'two' && <div>
            <img
              className="back"
              src={Vector}
              alt="backbutton"
              onClick={() => setStep("one")}
            />

            <h2>Let's set up your budget</h2>
            <p className="my-0">What recurring expenses do you have?</p>

            <div className="goals d-flex flex-wrap gap-3 justify-content-center">
                <div className="goal"><img src={housing} alt="housing" /></div>
                <div className="goal"><img src={housing} alt="housing" /></div>
                <div className="goal"><img src={housing} alt="housing" /></div>
                <div className="goal"><img src={housing} alt="housing" /></div>
                <div className="goal"><img src={housing} alt="housing" /></div>
                <div className="goal"><img src={housing} alt="housing" /></div>
                <div className="goal"><img src={housing} alt="housing" /></div>
                <div className="goal"><img src={housing} alt="housing" /></div>
                <div className="goal"><img src={housing} alt="housing" /></div>
              
            </div>


            <Button 
              className="btn btn-green w-100"
              onClick={() => setStep('three')}
            >
              Continue
        </Button>





        </div>}





        {/* {step === 'three' && <div></div>}
        {step === 'four' && <div></div>}
        {step === 'five' && <div></div>}
        {step === 'six' && <div></div>}
        {step === 'seven' && <div></div>}
        {step === 'eigth' && <div></div>}
        {step === 'nine' && <div></div>} */}
    </div>
  )
}

export default BudgetSetup
