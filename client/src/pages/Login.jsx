import { useState, useEffect } from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { login } from "../api"

const Login = ({ user, setUser, token, setToken })=> {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
 
  const submit = async(ev) => {
    ev.preventDefault();
    const response = await login({ username, password })
    if(response.id){
      setUser(response);
    }
    else {
      window.localStorage.removeItem('token');
    }
    navigate('/profile');
  }


  return (
    <form onSubmit={ submit } className="loginDiv">
      <h1 className="loginDivTop">Login</h1>

      <div className="loginDivBottom">
      <label htmlFor="username" className="labels">Username</label>
      <input value={ username } onChange={ ev=> setUsername(ev.target.value)}/>
      <label htmlFor="password" className="labels">Password</label>
      <input value={ password} onChange={ ev=> setPassword(ev.target.value)}/>
      <button disabled={ !username || !password }>Login</button>
      </div>
    </form>
  );
  }


function App() {
  const [auth, setAuth] = useState({});

  useEffect(()=> {
    attemptLoginWithToken();
  }, []);

  

  return (
    <>
      {
        !auth.id ? <>
          <Login login={ login }/>
          </>
        : <button onClick={ logout }>Logout { auth.username }</button>
      }
      {
        !!auth.id && (
          <nav>
            <Link to='/'>Home</Link>
          </nav>
        )
      }
      {
        !!auth.id && (
          <Routes>
            <Route path='/' element={<h1>Home</h1>} />
          </Routes>
        )
      }
    </>
  )
}
export default Login;






// const Login = ({setUser}) => {
//   const navigate = useNavigate();
//   function handleSubmit(event) {
//     event.preventDefault();
//     setUser({
//         name: "Monica"
//     })
//     console.log('Form Submitted!');
//     //redirecting to products page after login!
//     navigate('/profile');
//   }
  
//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//       <label htmlFor="username">Username</label>
//             <input type="text" id="username" />
//             <br></br>
//             <br></br>
//             <label htmlFor="password">Password</label>
//             <input type="password" id="password" />
//             <Button />
//       </form>
//     </div>
//   )
// }
