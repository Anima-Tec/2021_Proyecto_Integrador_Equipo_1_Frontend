/* eslint-disable linebreak-style */
import React from 'react';

const NavBar = () => (
  <div>
    <div>
      <h1>
        {' '}
        Hello,
        <br />
        {' '}
        user
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
    <button type="button"> Log Out</button>
  </div>
);

export default NavBar;
