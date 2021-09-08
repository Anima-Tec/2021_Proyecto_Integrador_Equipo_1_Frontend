import React, { useState } from 'react';
import SessionController from '../networking/controllers/SessionController';
import Input from './singleComponent/Input';

const SignUp = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    SessionController.Signup(name, surname, username, birthDate, email, password);
  };

  return (
    <div>
      <p>
        Hello there!
      </p>
      <h1>Let’s get started</h1>
      <form onSubmit={handleSubmit}>
        <Input type="text" name="name" />
        <Input type="text" name="surname" />
        <Input type="text" name="username" />
        <Input type="date" name="birthDate" />
        <Input type="email" name="email" />
        <Input type="password" name="password" />
        <button type="button">
          Create an account
        </button>
      </form>
    </div>
  );
};

export default SignUp;
