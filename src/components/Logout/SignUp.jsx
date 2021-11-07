/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import Input from '../UI/Input';
import Button from '../UI/Button';
import SessionController from '../../networking/controllers/SessionController';
import Spinner from '../UI/Spinner';
import styles from './Logout.module.scss';

const SignUp = () => {
  const {
    register, handleSubmit, formState: { errors }, watch,
  } = useForm();
  const [error, setError] = React.useState(false);
  const history = useHistory();
  const { promiseInProgress } = usePromiseTracker();

  const showError = (mayError) => {
    setError(mayError);
  };

  const onSubmit = async (data) => {
    try {
      trackPromise(SessionController.Signup(
        data.name,
        data.surname,
        data.username,
        data.birth_date,
        data.email,
        data.password,
        data.password_confirmation,
      ));
      history.push('/inicio');
    } catch (requestError) {
      showError(true);
    }
  };

  return (
    <div className={styles.ContainerAllRegister}>
      <div className={styles.ContainerGlobal}>
        <div className={styles.ContainerTitleForm}>
          <p> ¡Hola! </p>
          <h1>¡Empecemos!</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className={styles.InputGroup}>
            <Input
              label="nombre"
              name="name"
              register={register}
              required="Debe ingresar un nombre"
              errors={errors.name || null}
            />

            <Input
              label="apellido"
              name="surname"
              register={register}
              required="Debe ingresar un apellido"
              errors={errors.surname || null}
            />
          </div>

          <Input
            label="nombre de usuario"
            name="username"
            register={register}
            required="Debe ingresar un nombre de usuario"
            errors={errors.username || null}
          />

          <Input
            label="fecha de nacimiento"
            name="birth_date"
            type="date"
            register={register}
            required="Debe ingresar su fecha de nacimiento"
            errors={errors.birth_date || null}
          />

          <Input
            label="correo electrónico"
            name="email"
            type="email"
            register={register}
            required="Debe ingresar un correo electrónico"
            errors={errors.email || null}
          />

          <Input
            label="contraseña"
            name="password"
            type="password"
            register={register}
            required="Debe ingresar una contraseña"
            value={8}
            message="Debe tener minimo 8 caracteres"
            errors={errors.password || null}
          />

          <Input
            label="confirmar contraseña"
            name="password_confirmation"
            type="password"
            register={register}
            validate={(value) => value === watch('password') || 'Las contraseñas no coinciden'}
            errors={errors.password_confirmation || null}
          />
          {error && <span className={styles.error}>Las credenciales no coinciden</span>}

          <div className={styles.ContainerButtonForm}>
            <Button
              styles={styles.BtnForm}
              text={promiseInProgress ? <Spinner spinnerType="ring" moveType="spin" /> : 'Crea tu cuenta'}
              submit
              spinner
            />
          </div>

        </form>
      </div>
    </div>
  );
};

export default SignUp;
