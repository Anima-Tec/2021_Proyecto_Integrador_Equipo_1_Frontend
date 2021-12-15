/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import {
  Card, CardContent, CardMedia, Typography, Box, Avatar, Skeleton,
  Modal, Rating, Popover, IconButton, Button,
} from '@mui/material';
import { useMediaQuery } from 'react-responsive';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbDown from '@mui/icons-material/ThumbDown';
import ThumbUp from '@mui/icons-material/ThumbUp';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import TokenService from '../../../networking/TokenService';
import ReportsController from '../../../networking/controllers/ReportsController';
import AddressService from '../../../networking/AddressService';
import styles from './CardModal.module.scss';

const CardModal = ({
  openModal, oneReport, modalLoading, handleClose,
}) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const data = TokenService.getUser();
  const userType = data.data.typeUser;

  const RefuseReport = (id) => {
    ReportsController.refuseReport(id);
  };

  const ApproveReport = (id) => {
    ReportsController.approveReport(id);
  };

  const HandleClickPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const HandleClosePopover = () => {
    setAnchorEl(null);
  };

  const saveAddress = async (address) => {
    await AddressService.setAddress(address);
    history.push(`places/${address}`);
  };

  const reportReport = async (id) => {
    await ReportsController.reportReport(id);
  };

  const open = Boolean(anchorEl);
  const idPopover = open ? 'simple-popover' : undefined;

  const capitalizarPrimeraLetra = (world) => world.charAt(0).toUpperCase() + world.slice(1);

  const ismobile = useMediaQuery({
    query: '(max-width: 425px)',
  });

  const isTablet = useMediaQuery({
    query: '(max-width: 768px)',
  });

  const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: 500,
    width: ismobile ? 300 : 600,
    bgcolor: 'background.paper',
    borderRadius: '65px',
    boxShadow: 24,
    padding: '0px',
  };

  const boxStylePC = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: 500,
    width: 800,
    bgcolor: 'background.paper',
    borderRadius: '65px',
    boxShadow: 24,
    padding: '0px',
  };

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={isTablet ? boxStyle : boxStylePC}>
        {modalLoading
          ? <Skeleton sx={{ height: '40%' }} animation="wave" variant="rectangular" />
          : (
            <CardMedia
              className={styles.CardMedia}
              component="img"
              image={
                        oneReport.photo_place
                        || '/default.jpg'
                      }
              alt={`${oneReport.address} ${oneReport.type_report}`}
            />
          )}

        <CardContent className={styles.CardContent}>
          <Box sx={{ display: 'flex' }}>
            {modalLoading
              ? (
                <>
                  <Skeleton animation="wave" height={15} width="10%" sx={{ marginRight: '10px', marginTop: '15px' }} />
                  <Skeleton animation="wave" height={15} width="15%" sx={{ marginTop: '15px' }} />
                </>
              ) : (
                <>
                  <Typography id="modal-modal-title" sx={{ color: '#9A31E4', marginRight: '10px', cursor: 'pointer' }} variant="h6" component="h2" onClick={() => saveAddress(oneReport.address)}>
                    {capitalizarPrimeraLetra(`${oneReport.address}`)}
                  </Typography>
                  <Rating
                    className={styles.Rating}
                    name="read-only"
                    value={oneReport.assessment}
                    readOnly
                  />
                </>
              )}
          </Box>
          {modalLoading
            ? (
              <Skeleton animation="wave" height={10} width="8%" sx={{ marginTop: '10px' }} />
            ) : (
              <Typography variant="body2" sx={{ color: '#9A31E4', marginTop: '-5px' }}>
                {oneReport.type_report}
              </Typography>
            )}
          {modalLoading
            ? (
              <>
                <Skeleton animation="wave" height={12} width="90%" sx={{ marginTop: '10px' }} />
                <Skeleton animation="wave" height={12} width="90%" sx={{ marginTop: '6px' }} />
                <Skeleton animation="wave" height={12} width="90%" sx={{ marginTop: '6px' }} />
                <Skeleton animation="wave" height={12} width="90%" sx={{ marginTop: '6px' }} />
                <Skeleton animation="wave" height={12} width="50%" sx={{ marginTop: '6px' }} />
              </>
            ) : (
              <Typography
                variant="body2"
                sx={{
                  width: '100%', height: '60%', maxHeight: '60%', overflow: 'auto',
                }}
              >
                {capitalizarPrimeraLetra(`${oneReport.description}`)}
              </Typography>
            )}
          {modalLoading
            ? (
              <>
                <Box sx={{
                  margin: '85px auto 0px auto',
                  display: 'flex',
                  justifyContent: 'center',
                  width: '40%',
                  alignItems: 'center',
                }}
                >
                  <Skeleton animation="wave" variant="circular" width={50} height={50} />
                  <Skeleton animation="wave" height={10} width="10%" sx={{ marginLeft: '20px' }} />
                </Box>
              </>
            )
            : (
              <>
                <Box className={styles.Footer}>
                  <Box sx={{ display: 'flex' }}>
                    <Avatar src="/defaultUserImage.png" />
                    <Typography variant="body2" sx={{ marginLeft: '20px' }}>
                      Escrito por
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{capitalizarPrimeraLetra(`${oneReport.username}`)}</Typography>
                    </Typography>
                  </Box>
                  {userType === 'normal' ? (
                    <>
                      <Box sx={{
                        marginLeft: '10%', display: 'flex', width: '20%', justifyContent: 'space-between',
                      }}
                      >
                        <IconButton
                          aria-describedby={idPopover}
                          onClick={() => RefuseReport(oneReport.id)}
                        >
                          <ThumbDown sx={{ color: 'red' }} />
                        </IconButton>
                        <IconButton
                          aria-describedby={idPopover}
                          onClick={() => ApproveReport(oneReport.id)}
                        >
                          <ThumbUp sx={{ color: 'green' }} />
                        </IconButton>
                      </Box>
                    </>
                  ) : (
                    <>
                      <IconButton aria-describedby={idPopover} onClick={HandleClickPopover}>
                        <MoreVertIcon />
                      </IconButton>
                      <Popover
                        id={idPopover}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={HandleClosePopover}
                        anchorOrigin={{
                          vertical: 'center',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                      >
                        <Button
                          variant="contained"
                          sx={{ p: 2, backgroundColor: '#6F12E7' }}
                          onClick={() => reportReport(oneReport.id)}
                        >
                          Reportar
                        </Button>
                      </Popover>
                    </>
                  )}
                </Box>
              </>
            )}
        </CardContent>
      </Card>
    </Modal>
  );
};

CardModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  oneReport: PropTypes.object.isRequired,
  modalLoading: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default CardModal;
