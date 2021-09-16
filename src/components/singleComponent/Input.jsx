/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../App.module.scss';

const Input = ({
  label, register, required, type, width, height, border, borderRadius,
}) => (
  <div className={styles.ContainerInput}>
    <label>{label}</label>
    <input
      type={type}
      style={{
        width, height, border, borderRadius,
      }}
      {...register(label, { required })}
    />
  </div>
);

Input.defaultProps = {

  // atributes
  type: 'text',
  required: false,

  // styles
  width: '350px',
  height: '35px',
  border: 'solid',
  borderRadius: '10px',
};

Input.propTypes = {

  // atributes
  label: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string,

  // styles
  width: PropTypes.string,
  height: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
};

export default Input;
