// Signup.js
import axios  from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './signup.css'
function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Username:', username);
  
      const response = await axios.post('http://localhost:4000/api/register', {
        username,
        email,
        password
      });
  
      console.log('User created successfully:', response.data);
      sessionStorage.setItem('token', response?.data?.token);
      navigate('/')
          } catch (error) {
      console.error('Error creating user:', error.response.data);
      
    }
  };
  

  return (
    <div className="signup-container">
      <div className="signup-content">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <Link to="/">Log In</Link></p>
      </div>
    </div>
  );
}

export default Signup;
