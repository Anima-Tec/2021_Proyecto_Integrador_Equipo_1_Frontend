/* eslint-disable linebreak-style */
import React from 'react';
import { useForm } from 'react-hook-form';
import Input from './singleComponent/Input';
import Button from './singleComponent/Button';
import SessionController from '../networking/controllers/SessionController';
import styles from '../App.module.scss';

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
      <div className={styles.ContainerGlobal}>
        <div className={styles.ContainerSignUpTitle}>
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
            <Input label="password" type="password" register={register} required icon />
            {errors.password?.type === 'required' && 'password is required'}
          </div>
          <div className={styles.ContainerButtonSignUp}>
            <Button text="Continue >" submit />
          </div>
        </form>
        <p>
          or
        </p>
        <Button text="Create an account" path="/registro" />
      </div>
    </div>
  );
};

export default LogIn;
