/* eslint-disable linebreak-style */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../App.module.scss';

const Input = ({
  // atributes
  label, name, type, register, required, value, message, validate, errors,
  // styles
  width, height, border, borderRadius, outline, padding,
}) => (
  <div className={styles.ContainerInput}>
    <label>{label}</label>
    <input
      type={type}
      style={{
        width, height, border, borderRadius, outline, padding,
      }}
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

  // atributes
  type: 'text',
  required: '',
  value: 0,
  message: '',
  validate: null,
  errors: null,

  // styles
  width: '450px',
  height: '35px',
  border: 'none',
  borderRadius: '10px',
  outline: 'none',
  padding: '3px 10px',
};

Input.propTypes = {

  // atributes
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  required: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.number,
  message: PropTypes.string,
  validate: PropTypes.func,
  errors: PropTypes.object,

  // styles
  width: PropTypes.string,
  height: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  outline: PropTypes.string,
  padding: PropTypes.string,
};

export default Input;
