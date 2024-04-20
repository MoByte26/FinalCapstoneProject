import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import { Home, About, Products, Product, Login, } from './pages/index.js';
import './App.css'
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import Cart from './pages/Cart.jsx';


function App() {
const [user, setUser] = useState(null);
const [token, setToken] = useState(null);

  return (
    <div>
      <NavBar user={user}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products user={user} />} />
        <Route path="/cart" element={<Cart user={user} />} />
        <Route path="/:productId" element={<Product user={user} />} />
        <Route path="/login" element={<Login user={user} token={token} setUser={setUser} setToken={setToken}/>} />
        <Route path="/register" element={<Register setUser={setUser}/>} />
        <Route path="/profile" element={<Profile user={user} />} />
      </Routes>
    </div>
  )
}

export default App