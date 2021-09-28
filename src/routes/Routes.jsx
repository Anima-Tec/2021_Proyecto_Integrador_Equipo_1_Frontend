/* eslint-disable linebreak-style */
import React from 'react';
import { Switch } from 'react-router-dom';
/* import App from '../App'; */
import IndexPage from '../pages/IndexPage';
import SignUpPage from '../pages/SignUpPage';
import LogInPage from '../pages/LogInPage';
import HomePage from '../pages/HomePage';
import RoutesType from './RoutesType';

const Routes = () => (
  <Switch>
    <RoutesType.BlockRouter path="/login" redirect="/inicio">
      <LogInPage />
    </RoutesType.BlockRouter>
    <RoutesType.BlockRouter path="/registro" redirect="/inicio">
      <SignUpPage />
    </RoutesType.BlockRouter>
    <RoutesType.PrivateRouter path="/inicio" redirect="/login">
      <HomePage />
    </RoutesType.PrivateRouter>
    <RoutesType.NavRouter path="/">
      <IndexPage />
    </RoutesType.NavRouter>
  </Switch>
);

export default Routes;
