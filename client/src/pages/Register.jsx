import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { register } from "../api"
import { useState } from 'react'


const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

   async function handleSubmit(e) {
        e.preventDefault()
        console.log('Form submitted!')
      const response = await register ({ username , password})
      console.log(response)
      // navigate to profile
      navigate('/profile');
    }
    return (
      <div className="registerDiv">
        <h1>Join the club</h1>
        <form onSubmit={handleSubmit} className="registerDivBottom">
            <label className="labels" htmlFor="username">Username</label>
            <input type="text" id="username" value={ username } onChange={ ev=> setUsername(ev.target.value)}/>
            <br></br>
            <br></br>
            <label className="labels" htmlFor="password">Create Password</label>
           <input type="password" id="password" value={ password} onChange={ ev=> setPassword(ev.target.value)}/>
            <Button />
        </form>
        

      </div>
    )
  }
  
  export default Register;