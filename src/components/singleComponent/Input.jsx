/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  label, register, required, type, icon,
}) => (
  <>
    {icon ? <input type={type} {...register(label, { required })} /> : (
      <>
        {' '}
        <label>{label}</label>
        {' '}
        <input type={type} {...register(label, { required })} />
      </>
    )}

  </>
);

Input.defaultProps = {
  type: 'text',
  icon: false,
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  register: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  type: PropTypes.string,
  icon: PropTypes.bool,
};

export default Input;
