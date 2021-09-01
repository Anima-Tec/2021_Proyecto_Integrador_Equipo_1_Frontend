import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from '../App';
import NavBar from '../components/NavBar.jsx';
import Inicio from '../pages/Inicio';
import NavRouter from './NavRouter';

const Routes = () => (
  <Switch>
    <NavRouter path="/inicio">
      <Inicio />
    </NavRouter>
    <Route path="/">
      <NavBar />
      <App />
    </Route>
  </Switch>
);

export default Routes;