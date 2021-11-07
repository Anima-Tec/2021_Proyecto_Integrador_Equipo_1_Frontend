import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import TokenService from '../networking/TokenServie';

const PrivateRouter = ({ path, children, redirect }) => {
  const isAuthenticated = TokenService.getLocalAccessToken();
  return (

    <Route path={path}>
      {isAuthenticated ? children : <Redirect to={redirect} /> }
    </Route>
  );
};
PrivateRouter.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  redirect: PropTypes.string.isRequired,
};

const NavRouter = ({ path, children }) => (
  <Route path={path}>
    {children}
  </Route>
);

NavRouter.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const BlockRouter = ({ path, children, redirect }) => {
  const isAuthenticated = TokenService.getLocalAccessToken();
  return (

    <Route path={path}>
      {!isAuthenticated ? children : <Redirect to={redirect} /> }
    </Route>
  );
};
BlockRouter.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  redirect: PropTypes.string.isRequired,
};

const RoutesType = {
  NavRouter,
  PrivateRouter,
  BlockRouter,
};

export default RoutesType;
