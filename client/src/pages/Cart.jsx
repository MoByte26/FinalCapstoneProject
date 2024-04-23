// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => { 
const navigate = useNavigate();

    return (
      <div className="cartDiv">
        <h1>Your Cart</h1>
        <h2>Payment Information</h2>
        <form>
          <div className="cartCard">
            <h3>Address</h3>
            <input type="text" className="boxDiv"/>
            <h3>Cardholder Name</h3>
            <input type="text" className="boxDiv"/>
            <h3>Card Number</h3>
            <input type="text" className="boxDiv"/>
            <h3>Expiry Date</h3>
            <input type="text" className="boxDiv"/>
            <h3>CVV</h3>
            <input type="text" className="boxDiv"/>
            <br></br>
            <button onClick={() => {navigate(`/profile`); }}>Checkout</button>
          </div>
        </form>
      </div>

    )
};




// const navigate = useNavigate();
//   if (!user) {
//     navigate('/login');
//     return null
//   }

    export default Cart;