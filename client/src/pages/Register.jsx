import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const Register = () => {
    function handleSubmit(e) {
        e.preventDefault()
        console.log('Form submitted!')
    }
    return (
      <div>
        <h1>Join the club</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
            <br></br>
            <br></br>
            <label htmlFor="password">Create Password</label>
            <input type="password" id="password" />
            <Button />
        </form>
        

      </div>
    )
  }
  
  export default Register;