import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Login = ({setUser}) => {
  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    setUser({
        name: "Monica"
    })
    console.log('Form Submitted!');
    //redirecting to products page after login!
    navigate('/profile');
  }
  
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
            <input type="text" id="username" />
            <br></br>
            <br></br>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
            <Button />
      </form>
    </div>
  )
}

export default Login;