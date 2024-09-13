import {useState, useEffect} from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";


const Settings = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const fetchUser = async () => {
      const response = await axios.get(`http://localhost:5000/users/${decodedToken.user_id}`)
      setSettings(response.data)
    }

    fetchUser()
  }, [])

  return (
    <div id="settings">
       <h2>Settings</h2>
    <ListGroup>
      <ListGroup.Item><strong>First name:</strong> {settings?.firstname}</ListGroup.Item>
      <ListGroup.Item><strong>Last name:</strong> {settings?.lastname}</ListGroup.Item>
      <ListGroup.Item><strong>Username:</strong> {settings?.username}</ListGroup.Item>
    </ListGroup>
    </div>
  )
}

export default Settings
