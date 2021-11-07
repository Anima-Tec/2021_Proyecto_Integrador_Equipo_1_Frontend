/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Input from './singleComponent/Input';
import Button from './singleComponent/Button';
import SessionController from '../networking/controllers/SessionController';
import styles from '../App.module.scss';

const SignUp = () => {
  const {
    register, handleSubmit, formState: { errors }, watch,
  } = useForm();
  const history = useHistory();

  const onSubmit = async (data) => {
    await SessionController.Signup(
      data.name,
      data.surname,
      data.username,
      data.birth_date,
      data.email,
      data.password,
      data.password_confirmation,
    );
    history.push('/inicio');
  };

  return (
    <div className={styles.ContainerAllRegister}>
      <div className={styles.ContainerGlobal}>
        <div className={styles.ContainerSignUpTitle}>
          <h1>Hola! Comenzemos.</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className={styles.InputGroup}>
            <Input
              label="nombre"
              name="name"
              width="212px"
              register={register}
              required="Debe ingresar un nombre"
              errors={errors.name || null}
            />

            <Input
              label="apellido"
              name="surname"
              width="212px"
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
            label="correo electronico"
            name="email"
            type="email"
            register={register}
            required="Debe ingresar un correo electronico"
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

          <div className={styles.ContainerButtonSignUp}>
            <Button text="Create an account" submit />
          </div>

        </form>
      </div>
    </div>
  );
};

export default SignUp;
