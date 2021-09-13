/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import Input from './singleComponent/Input';
import SessionController from '../networking/controllers/SessionController';

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
    <div>
      <p>
        Hello there!
      </p>
      <h1>Let’s get started</h1>
      <form onSubmit={handleSubmit(onSubmit)}>

        <Input label="name" register={register} required />
        {errors.name?.type === 'required' && 'name is required'}

        <Input label="surname" register={register} required />
        {errors.surname?.type === 'required' && 'surname is required'}

        <Input label="username" register={register} required />
        {errors.username?.type === 'required' && 'username is required'}

        <Input label="birthDate" type="date" register={register} required />
        {errors.birthDate?.type === 'required' && 'Birth date is required'}

        <Input label="email" type="email" register={register} required />
        {errors.email?.type === 'required' && 'email is required'}

        <Input label="password" type="password" register={register} required />
        {errors.password?.type === 'required' && 'password is required'}

        <button type="submit">
          Create an account
        </button>
      </form>
    </div>
  );
};

export default SignUp;
