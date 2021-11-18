/* eslint-disable linebreak-style */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Backdrop, IconButton,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import styles from './BackDrop.module.scss';

const BackDrop = ({ success, handleCloseBackdrop, openBackdrop }) => {
  useEffect(() => {
    setTimeout(() => {
      handleCloseBackdrop();
    }, 5000);
  }, success);

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={openBackdrop}
    >
      {success
        ? (
          <>
            <div className={styles.MsgReportCreated}>
              <CheckCircleIcon sx={{ fontSize: '6.5rem' }} />
              <h1>¡PUBLICADO CON ÉXITO!</h1>
            </div>
            <div className={styles.CloseBtn}>
              <IconButton onClick={handleCloseBackdrop} type="button" sx={{ p: '10px' }} aria-label="close">
                <HighlightOffIcon sx={{ fontSize: '2rem' }} />
              </IconButton>
            </div>
          </>
        )
        : (
          <>
            <div className={styles.MsgReportCreated}>
              <ErrorIcon sx={{ fontSize: '6.5rem' }} />
              <h1>¡HA OCURRIDO UN ERROR!</h1>
            </div>
            <div className={styles.CloseBtn}>
              <IconButton onClick={handleCloseBackdrop} type="button" sx={{ p: '10px' }} aria-label="close">
                <HighlightOffIcon sx={{ fontSize: '2rem' }} />
              </IconButton>
            </div>
          </>
        ) }
    </Backdrop>
  );
};
BackDrop.propTypes = {
  success: PropTypes.bool.isRequired,
  handleCloseBackdrop: PropTypes.func.isRequired,
  openBackdrop: PropTypes.bool.isRequired,
};

export default BackDrop;
