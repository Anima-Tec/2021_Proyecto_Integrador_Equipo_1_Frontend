/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import Input from '../UI/Input';
import Button from '../UI/Button';
import SessionController from '../../networking/controllers/SessionController';
import Spinner from '../UI/Spinner';
import styles from './Logout.module.scss';

const LogIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState(false);
  const history = useHistory();
  const { promiseInProgress } = usePromiseTracker();

  const showError = (mayError) => {
    setError(mayError);
  };

  const onSubmit = async (data) => {
    try {
      await trackPromise(SessionController.login(data.username, data.password));
      history.push('/inicio');
    } catch (requestError) {
      showError(true);
    }
  };

  return (
    <div className={styles.ContainerAllLogin}>
      <div className={styles.ContainerGlobal}>
        <div className={styles.ContainerTitleForm}>
          <p>
            Bienvenido otra vez!
          </p>
          <h1>Inicie sesión.</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="nombre de usuario"
            name="username"
            register={register}
            required="Debe ingresar su nombre de usuario"
            errors={errors.username || null}
          />
          <Input
            label="contraseña"
            name="password"
            type="password"
            register={register}
            required="Debe ingresar su contraseña"
            errors={errors.password || null}
            width=""
          />
          <div className={styles.ContainerButtonForm}>
            <Button
              styles={styles.BtnForm}
              text={promiseInProgress ? (<Spinner spinnerType="ring" moveType="spin" />) : 'Continuar>'}
              submit
            />
          </div>
          {error && <span className={styles.error}>Las credenciales no coinciden</span>}
        </form>
        <p>
          o
        </p>
        <Button styles={styles.BtnForm} text="Crear cuenta" path="/registro" />
      </div>
    </div>
  );
};

export default LogIn;
