/* eslint-disable linebreak-style */
import * as React from 'react';
import {
  SpeedDial, SpeedDialIcon, SpeedDialAction,
} from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import styles from './SpeedDial.module.scss';

const actions = [
  { icon: <HomeOutlinedIcon />, name: 'home', toolTip: 'Inicio' },
  { icon: <ListAltOutlinedIcon />, name: 'reportedReports', toolTip: 'Reportes reportados' },
  { icon: <ExitToAppIcon />, name: 'logout', toolTip: 'Cerrar sesión' },
];

/* const Redirect = (name) => {
  switch (name) {
    case home:

      break;

    case reportedReports:

      break;

    case logout:

      break;

    default:
      break;
  }
}; */

export default function BasicSpeedDial() {
  return (
    <div className={styles.SpeedDial}>
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: 'absolute', bottom: 30, left: 30 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.toolTip}
            onClick={() => console.log('si')}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
