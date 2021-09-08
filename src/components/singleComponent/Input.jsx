/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';

function Input({
  name, type, value, funcion,
}) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={funcion}
    />
  );
}

Input.defaultProps = {
  type: 'text',
  value: '',
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  funcion: PropTypes.func.isRequired,
};

export default Input;
