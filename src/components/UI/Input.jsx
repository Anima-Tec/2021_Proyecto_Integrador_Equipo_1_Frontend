/* eslint-disable linebreak-style */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Logout/Logout.module.scss';

const Input = ({
  label, name, type, register, required, value, message, validate, errors,
}) => (
  <div className={styles.ContainerInput}>
    <label>{label}</label>
    <input
      type={type}
      {...register(name, {
        required,
        minLength: {
          value,
          message,
        },
        validate,
      })}
    />
    {errors && <span className={styles.error}>{errors.message}</span>}
  </div>
);

Input.defaultProps = {
  type: 'text',
  required: '',
  value: 0,
  message: '',
  validate: null,
  errors: null,
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  required: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.number,
  message: PropTypes.string,
  validate: PropTypes.func,
  errors: PropTypes.object,
};

export default Input;
