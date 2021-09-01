import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from '../App';
import NavBar from '../components/NavBar';
import {
  Inicio, LogIn, SignUp, Home,
} from '../pages/Pages';
import NavRouter from './NavRouter';

const Routes = () => (
  <Switch>
    <NavRouter path="/inicio">
      <Inicio />
    </NavRouter>
    <NavRouter path="/login">
      <LogIn />
    </NavRouter>
    <NavRouter path="/signup">
      <SignUp />
    </NavRouter>
    <NavRouter path="/home">
      <Home />
    </NavRouter>
    <Route path="/">
      <NavBar />
      <App />
    </Route>
  </Switch>
);

export default Routes;
