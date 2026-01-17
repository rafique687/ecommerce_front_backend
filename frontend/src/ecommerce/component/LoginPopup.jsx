import React, { useState } from "react";
import '../LoginPouup.css';
//import { CartItem } from "../context/CartContext";

export default function LoginPopup({ isOpen, onClose }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  if (!isOpen) return null;
  const LoginUser = async(e) =>{ 
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/user/login',
      {
     
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({useName: username,password:password})
      });

      const data = await response.json();
      console.log("response:-",data);
    }
  
  return (
    <form onSubmit={LoginUser}>
    <div className="popup-overlay">
      <div className="popup-box">
        <h2>Login</h2>
       
        <input type="email" placeholder="Email" className="popup-input"  value={username} 
        onChange={(e)=>{setUsername(e.target.value)}}/>
        <input type="password" placeholder="Password" className="popup-input" value={password} onChange={(e)=>{setPassword(e.target.value)}} />

        <button className="popup-btn">Login</button>

        <span className="popup-close" onClick={onClose}>
          &times;
        </span>
      </div>
    </div>
    </form>
  );
}
