/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import Input from './singleComponent/Input';
import Button from './singleComponent/Button';
import SessionController from '../networking/controllers/SessionController';
import styles from '../App.module.scss';

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    SessionController.Signup(
      data.name,
      data.surname,
      data.username,
      data.birthDate,
      data.email,
      data.password,
    );
  };

  return (
    <div className={styles.ContainerSignUpForm}>
      <div className={styles.ContainerSignUpTitle}>
        <p>
          Hello there!
        </p>
        <h1>Let’s get started</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className={styles.InputGroup}>
          <Input label="name" width="165px" register={register} required />
          {errors.name?.type === 'required' && <span className={styles.error}>name is required</span>}

          <Input label="surname" width="165px" register={register} required />
          {errors.surname?.type === 'required' && <span className={styles.error}>surname is required</span>}
        </div>

        <Input label="username" register={register} required />
        {errors.username?.type === 'required' && <span className={styles.error}>username is required</span>}

        <Input label="birthDate" type="date" register={register} required />
        {errors.birthDate?.type === 'required' && <span className={styles.error}>Birth date is required</span>}

        <Input label="email" type="email" register={register} required />
        {errors.email?.type === 'required' && <span className={styles.error}>email is required</span>}

        <Input label="password" type="password" register={register} required />
        {errors.password?.type === 'required' && <span className={styles.error}>password is required</span>}

        <div className={styles.ContainerButtonSignUp}>
          <Button text="Create an account" submit />
        </div>

      </form>
    </div>
  );
};

export default SignUp;
