/* eslint-disable linebreak-style */
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Input from './singleComponent/Input';
import Button from './singleComponent/Button';
import SessionController from '../networking/controllers/SessionController';
import styles from '../App.module.scss';

const LogIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const history = useHistory();

  const onSubmit = async (data) => {
    await SessionController.login(
      data.username,
      data.password,
    );
    history.push('/inicio');
  };

  return (
    <div className={styles.ContainerAllLogin}>
      <div className={styles.ContainerGlobal}>
        <div className={styles.ContainerSignUpTitle}>
          <p>
            Bienvenido otra vez!
          </p>
          <h1>Inicie sesión.</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-container">
            <Input
              label="nombre de usuario"
              name="username"
              register={register}
              required="Debe ingresar su nombre de usuario"
              errors={errors.username || null}
            />
          </div>
          <div className="input-container">
            <Input
              label="contraseña"
              name="password"
              type="password"
              register={register}
              required="Debe ingresar su contraseña"
              errors={errors.password || null}
            />
          </div>
          <div className={styles.ContainerButtonSignUp}>
            <Button text="Continue >" submit />
          </div>
        </form>
        <p>
          o
        </p>
        <Button text="Create an account" path="/registro" />
      </div>
    </div>
  );
};

export default LogIn;
