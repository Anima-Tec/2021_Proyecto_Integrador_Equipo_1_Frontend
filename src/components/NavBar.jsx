/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import SessionController from '../networking/controllers/SessionController';

const NavBar = ({ username, imgUser }) => {
  const onClick = async () => {
    await SessionController.logout();
    /* window.location.reload(); */
  };
  return (
    <div>
      <div>
        <h1>
          {' '}
          Hello,
          <br />
          {' '}
          {username}
          {' '}
        </h1>
        <img alt="usser" />
      </div>
      <div>
        <ul>
          <li>PERFIL</li>
          <li>CREAR REPORTE</li>
          <li>MIS REPORTES</li>
          <li>CONFIGURACIONES</li>
        </ul>
      </div>
      <button onClick={onClick} type="button"> Log Out</button>
    </div>
  );
};

NavBar.defaultProps = {
  imgUser: '',
};

NavBar.propTypes = {
  username: PropTypes.string.isRequired,
  imgUser: PropTypes.string,
};

export default NavBar;
