// src/LoginForm.js
import React, { useEffect, useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from './ecommerce/context/AuthContext';
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, cktoken, ckemail, ckadmin, loginuser } = useContext(AuthContext);
  
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    // If already authenticated, navigate to the dashboard
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/api/loginRoutes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      //   body: JSON.stringify({
      //   email: formData.email,
      //   password: formData.password,
      // }),
      });

      const data = await response.json();
      if (response.ok) { 
        setMessage(data.user); // Login successful

        const { token, user } = data;
        loginuser(token, user);  // Store token and user info in context

        // Set cookies for the user token and email
        Cookies.set('ckusertoken', token);
        Cookies.set('ckuseremail', user.email); // Assuming the user has an email

        const usercktoken = Cookies.get("ckusertoken");
        const userckemail = Cookies.get("ckuseremail");
        console.log("Logged in cookies --:", usercktoken, userckemail);

        if (usercktoken && userckemail) {
          navigate("/dashboard");
        }
      } else {
        setMessage(data.message || 'Login failed'); // Invalid credentials
      }
    } catch (error) {  
      console.error('Error during login:', error);
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
      {message && <p className="mt-3 text-center text-danger">{message}</p>}
    </div>
  );
};

export default Login;
