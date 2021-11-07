/* eslint-disable linebreak-style */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const Button = ({

  // atributos
  text, submit, path, Function,

  // styles
  styles,
}) => {
  const history = useHistory();
  return (
    <>
      <button
        className={styles}
        type={submit ? 'submit' : 'button'}
        onClick={path ? () => history.push(path) : Function}
      >
        { text }
      </button>
    </>
  );
};

Button.defaultProps = {
  submit: false,
  path: null,
  Function: null,
};

Button.propTypes = {

  // atributos
  text: PropTypes.string.isRequired,
  submit: PropTypes.bool,
  path: PropTypes.string,
  Function: PropTypes.func,

  // styles
  styles: PropTypes.string.isRequired,
};

export default Button;
