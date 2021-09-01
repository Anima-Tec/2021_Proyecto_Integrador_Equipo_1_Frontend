import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavRouter = ({ path, children }) => (
  <Route path={path}>
    {children}
  </Route>
);

NavRouter.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default NavRouter;
