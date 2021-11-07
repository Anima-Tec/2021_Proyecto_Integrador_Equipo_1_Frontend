/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import Avatar from '@mui/material/Avatar';
import SessionController from '../../networking/controllers/SessionController';
import Button from './Button';
import CreateReport from './CreateReport/CreateReport';
import Spinner from './Spinner';
import styles from '../../App.module.scss';
import ReportsController from '../../networking/controllers/ReportsController';

const SideBar = ({
  username, imgUser, name, surname, onRefreshReports,
}) => {
  const { promiseInProgress } = usePromiseTracker();
  const [error, setError] = React.useState([0]);

  const logOut = async () => {
    await trackPromise(SessionController.logout());
    window.location.reload();
  };

  function stringAvatar(fullName) {
    return {
      sx: {
        bgcolor: '#9A31E4',
        width: 56,
        height: 56,
      },
      children: `${fullName.split(' ')[0][0]}${fullName.split(' ')[1][0]}`,
    };
  }

  const getNewsReports = async () => {
    try {
      const reports = await ReportsController.getReports();
      onRefreshReports(reports);
    } catch (err) {
      setError('Hubo un error al traer los reportes');
      console.log(error);
    }
  };

  return (
    <div className={styles.SideBar}>
      <div className={styles.SideBarHeader}>
        <h1>
          {username}
        </h1>
        <Avatar {...stringAvatar(`${name} ${surname}`)} src="" />
      </div>
      <div className={styles.SideBarMenu}>
        <div className={styles.Curve} />
        <ul>
          <li>
            <Button text="INICIO" path="/inicio" />
          </li>
          <li><CreateReport onGetNewReports={getNewsReports} /></li>
          <li>
            <Button text="MIS REPORTES" path="/misReportes" />
          </li>
          <li>
            <Button text="PERFIL" path="/perfil" />
          </li>
        </ul>
        <Button
          styles={styles.SideBarFooter}
          text={promiseInProgress ? <Spinner spinnerType="ring" moveType="spin" /> : 'Log out'}
          Function={logOut}
        />
      </div>
    </div>
  );
};

SideBar.defaultProps = {
  imgUser: '',
};

SideBar.propTypes = {
  username: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  imgUser: PropTypes.string,
  onRefreshReports: PropTypes.func.isRequired,
};

export default SideBar;
