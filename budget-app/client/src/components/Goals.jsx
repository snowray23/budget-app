import {useEffect, useState} from 'react'
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import Button from "react-bootstrap/Button";


import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'linear-gradient(180deg, #9055F0 0%, #565CF0 100%)'
  },
};



const Goals = () => {

  const [goals, setGoals] = useState([])
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState({})
  const [goalAmount, setGoalAmount] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [limitBudgetMsg, setLimitBudgetMsg] = useState("")

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const {user_id} = jwtDecode(token);
    
    const fetchGoals = async () => {
      const result = await axios.get(`http://localhost:5000/goals/${user_id}`)
      setGoals(result.data.goals);
    }

    fetchGoals();
  }, [submitted])


  function openModal(goal) {
    setSelectedGoal(goal)

    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleAddGoalAmount = () => {
    const token = sessionStorage.getItem("token");
    const {user_id} = jwtDecode(token);

    axios.put(`http://localhost:5000/${user_id}/${selectedGoal.goal_id}`, {'cumulative' :goalAmount})
    .then((res) => {
      setSubmitted(!submitted)
      setGoalAmount('')
      closeModal()
      setLimitBudgetMsg(res.data.Message)
    })
  }


  return (
    <div id="goals">
      <div>
          <h2>Goals</h2>
        {goals.map(item => (
          <div  className={`d-flex p-4 align-items-center my-4 ${item.isPrimary ? 'goal-item' : 'account-item'}`}  key={item.goal_id} onClick={() => openModal(item)}>
            <div className='me-3'><img src={`${item?.icon}`} alt={item.text} /></div>
            <div>{item?.text} {item.isPrimary && ' (Primary)'}</div>
            <div className="fs-2 ms-auto text-center"> ${item?.amount} <br/> <span className="fs-5">${item?.cumulative}</span> </div>
          </div>
        ))}
      </div>
      <p className="text-danger">{limitBudgetMsg}</p>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <h2 className='text-light mb-5'>How much do you want to add to this goal?</h2>
        <div>
           <div className="d-flex align-items-center">
              <div><img src={selectedGoal?.icon} alt="" /></div> 
              <div className="mx-2">{selectedGoal?.text}</div> 
             <input type="number" id="goal-input-modal" className="p-2" value={goalAmount} onChange={(e) => setGoalAmount(e.target.value) }/> 
           </div>

           <div className="mt-5"></div>  
           <Button className="btn btn-green w-100 text-dark" type="submit" onClick={handleAddGoalAmount}>Add Amount</Button>         
        </div>
      </Modal>
    </div>
  )
}

export default Goals
