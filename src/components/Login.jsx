/* eslint-disable linebreak-style */
import React from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import Input from './singleComponent/Input';
import Button from './singleComponent/Button';
import SessionController from '../networking/controllers/SessionController';

const LogIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    SessionController.login(
      data.username,
      data.password,
    );
  };

  return (
    <div>
      <div>
        <p>
          Welcome back!
        </p>
        <h1>Please. Log In</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <Input label="username" register={register} required icon />
          {errors.username?.type === 'required' && 'username is required'}
        </div>
        <div className="input-container">
          <FontAwesomeIcon icon={faCoffee} />
          <Input label="password" type="password" register={register} required icon />
          {errors.password?.type === 'required' && 'password is required'}
        </div>
        <Button text="Continue" submit />
      </form>
      <p>
        or
      </p>
      <Button text="Create an account" path="/registro" height="30px" />
    </div>
  );
};

export default LogIn;
