/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const Button = ({
  text, submit, path, color, backgroundColor,
  backgroundImage, width, height, border, borderRadius, margin,
}) => {
  const history = useHistory();
  /* () => history.push(path) */
  return (
    <>
      <button
        type={submit ? 'submit' : 'button'}
        onClick={path && (() => history.push(path))}
        style={{
          color, backgroundColor, backgroundImage, width, height, border, borderRadius, margin,
        }}
      >
        {text}
      </button>
    </>
  );
};

Button.defaultProps = {
  // atributos
  submit: false,
  path: null,

  // styles
  color: 'white',
  backgroundColor: '#C99CE9',
  backgroundImage: null,
  width: '150px',
  height: '40px',
  border: 'none',
  borderRadius: '20px',
  margin: '10px auto',
};

Button.propTypes = {

  // atributos
  text: PropTypes.string.isRequired,
  submit: PropTypes.bool,
  path: PropTypes.string,

  // styles
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  backgroundImage: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  margin: PropTypes.string,
};

export default Button;
