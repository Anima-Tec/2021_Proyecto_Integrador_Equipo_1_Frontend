/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect to="/login" />
    ))}
  />
);

PrivateRoute.defaultProps = {
  isAuthenticated: false,
};

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  isAuthenticated: PropTypes.bool,
};

export default PrivateRoute;
