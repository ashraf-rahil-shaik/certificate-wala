import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'admin' && password === 'password') {
      setError('logged in');
      navigate('/Certificate');
    } else {
      setError('Incorrect username or password');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (error && event.target.className !== 'error-message') {
        setError('');
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [error]);

  return (
    <div className="login-page">
      <h1 className="login-page-title">Login</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="input-field"
        />
        <button type="submit" className="submit-button-1">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
