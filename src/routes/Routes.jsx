/* eslint-disable linebreak-style */
import React from 'react';
import { Switch } from 'react-router-dom';
/* import App from '../App'; */
import IndexPage from '../pages/IndexPage';
import SignUpPage from '../pages/SignUpPage';
import LogInPage from '../pages/LogInPage';
import HomePage from '../pages/HomePage';
import PerfilPage from '../pages/PerfilPage';
import MyReportsPage from '../pages/MyReportsPage';
import ReporteredReportsPage from '../pages/ReporteredReportsPage';
import ConfigPage from '../pages/ConfigPage';
import PlacePage from '../pages/PlacePage';
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
    <RoutesType.PrivateRouter path="/perfil" redirect="/login">
      <PerfilPage />
    </RoutesType.PrivateRouter>
    <RoutesType.PrivateRouter path="/misReportes" redirect="/login">
      <MyReportsPage />
    </RoutesType.PrivateRouter>
    <RoutesType.PrivateRouter path="/reportes-reportados" redirect="/login">
      <ReporteredReportsPage />
    </RoutesType.PrivateRouter>
    <RoutesType.PrivateRouter path="/configuracion" redirect="/login">
      <ConfigPage />
    </RoutesType.PrivateRouter>
    <RoutesType.PrivateRouter path="/places" redirect="/login">
      <PlacePage />
    </RoutesType.PrivateRouter>
    <RoutesType.NavRouter path="/" redirect="/login">
      <IndexPage />
    </RoutesType.NavRouter>
  </Switch>
);

export default Routes;
