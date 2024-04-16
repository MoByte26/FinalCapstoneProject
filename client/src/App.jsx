import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import { Home, About, Products, Product, Login, } from './pages/index.js';
import './App.css'
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';


function App() {
const [user, setUser] = useState(null);

  return (
    <div>
      <NavBar user={user}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<Product />} />
        <Route path="/login" element={<Login setUser={setUser}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App