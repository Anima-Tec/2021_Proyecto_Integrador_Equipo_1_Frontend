/* eslint-disable linebreak-style */
import * as React from 'react';
import {
  SpeedDial, SpeedDialAction,
} from '@mui/material';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import { useHistory } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Spinner from './Spinner';
import styles from './SpeedDial.module.scss';
import SessionController from '../../networking/controllers/SessionController';

const actions = [
  { icon: <HomeOutlinedIcon />, name: 'home', toolTip: 'Inicio' },
  { icon: <ListAltOutlinedIcon />, name: 'reportedReports', toolTip: 'Reportes reportados' },
  { icon: <ExitToAppIcon />, name: 'logout', toolTip: 'Cerrar sesión' },
];

export default function BasicSpeedDial() {
  const { promiseInProgress } = usePromiseTracker();
  const history = useHistory();

  const logOut = async () => {
    await trackPromise(SessionController.logout());
    window.location.reload();
  };

  const Redirect = (name) => {
    switch (name) {
      case 'home':
        history.push('/inicio');
        break;

      case 'reportedReports':
        history.push('/reportes-reportados');
        break;

      case 'logout':
        logOut();
        break;

      default:
        break;
    }
  };
  return (
    <div className={styles.SpeedDial}>
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: 'absolute', bottom: '10%', left: '25%' }}
        icon={<MenuIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={promiseInProgress ? <Spinner spinnerType="ring" moveType="spin" /> : action.icon}
            tooltipTitle={action.toolTip}
            onClick={() => Redirect(action.name)}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
