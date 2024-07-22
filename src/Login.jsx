// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAppRegistration } from "react-icons/md";
import './Login.css'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const isValid = email === 'john.doe@example.com' && password === 'password123';

    if (isValid) {
      
      setError('');

    
      navigate('/home'); 
    } else {
      
      setError('Invalid email or password');
    }
  };

  return (

    <div className="login-container">
      <h1><MdAppRegistration style={{fontSize:'30px'}} />RegiPro</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
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
    </div>
  );
}

export default Login;
