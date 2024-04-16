import { Link } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav>
      <ul>
        <li>
            <Link to="/">Home</Link>
        </li>

        <li>
            <Link to="/about">About</Link> 
        </li>

        
        {user && <li> <Link to="/products">Products</Link>  </li> }
       

        
        {!user && <li> <Link to="/login">Login</Link> </li> }
        

        
        {!user && <li> <Link to="/register">Register</Link> </li> }
        

        
        {user && <li> <Link to="/profile">Profile</Link> </li> }
        

      </ul>
    </nav>
  );
}

export default NavBar;