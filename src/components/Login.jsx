import React, { useState } from 'react';
import SessionController from '../networking/controllers/SessionController';

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    SessionController.login(username, password);
  };

  return (
    <div>
      <p>
        Welcome back!
      </p>
      <h1>Please. Log In</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">
          Continue
          {'>'}
        </button>
      </form>
      <p>
        or
      </p>
      <button type="button">
        Create an account
      </button>
    </div>
  );
};

export default LogIn;
