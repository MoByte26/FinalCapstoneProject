import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const Profile = ({ user }) => {
  const navigate = useNavigate();
console.log(user)
  if (!user) {
    navigate('/login');
  }
    const { username } = user;
    return (
      <div className="profileDiv">
        <h1>Welcome { username }!</h1>
        <div className="profilePictureSquare"></div>
        <div className="news"> <h2>Atelier News</h2> 
        <p> <h3>Psssst...Its THE HOTTEST bag drop in Atelier history!
          <br></br>
          <br></br>
        Checkout our products page for the newest trends and be the envy of your friends
        <br></br>
        <br></br>
          *Free shipping with qualifying purchase of $4000 or more*
          <br></br>
          <br></br>
          ~Fall in love with our 2024 Spring Collection~</h3> </p>
        </div>
        
      </div>
    )
  }
  
  export default Profile;