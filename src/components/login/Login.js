import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    try {
      const response = await axios.post("http://localhost:4000/api/userLogin", {
        email: email,
        password: password
      });
      sessionStorage.setItem('token', response?.data?.token);
      console.log('Response:', response.data);   
      navigate('/dashboard')
    } catch (error) {
      console.error('Error:', error.response.data);
     
    }
  };

  return (
    <div className="Login">
      <div className="login-container">
        <div className="login-content">
          <h1>Welcome to HackerRank</h1>
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
            <button type="submit">Login</button>
          </form>
          <p className="forgot-password">Forgot Password?</p>
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
