/* eslint-disable linebreak-style */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
/* import App from '../App'; */
import NavBar from '../components/NavBar';
import NavRouter from './NavRouter';
import IndexPage from '../pages/IndexPage';
import SignUpPage from '../pages/SignUpPage';
import LogInPage from '../pages/LogInPage';
import HomePage from '../pages/HomePage';

const Routes = () => (
  <Switch>
    <NavRouter path="/login">
      <LogInPage />
    </NavRouter>
    <NavRouter path="/registro">
      <SignUpPage />
    </NavRouter>
    <NavRouter path="/inicio">
      <div>
        <NavBar />
        <HomePage />
      </div>
    </NavRouter>
    <Route path="/">
      <IndexPage />
    </Route>
  </Switch>
);

export default Routes;
