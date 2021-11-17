/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import {
  Card, CardContent, CardMedia, CardActionArea, Typography, Box, Avatar, Skeleton,
  Modal, Rating, Popover, IconButton, Button,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddressService from '../../networking/AddressService';
import ReportsController from '../../networking/controllers/ReportsController';

const Cards = ({ filteredData }) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [oneReport, setOneReport] = React.useState([0]);
  const [modalLoading, setModalLoading] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => { setOpenModal(false); setModalLoading(true); };

  const getReport = async (id) => {
    handleOpen();
    filteredData.map((report) => console.log(report));
    const report = await ReportsController.getReport(id);
    setOneReport(report[0]);
    console.log(report[0]);
    setModalLoading(false);
  };

  const saveAddress = async (address) => {
    await AddressService.setAddress(address);
    history.push(`places/${address}`);
  };

  const dateAgo = (date) => {
    try {
      const times = date.split(' ');
      if (Number(times[4]) === 0) {
        return (`Hace ${times[6]} ${times[7]} ${times[8]} ${times[9]} ${times[10]} ${times[11]}`);
      } if (Number(times[0]) > 0) {
        return (`Hace ${times[0]} ${times[1]} ${times[2]} ${times[3]}`);
      } if (Number(times[2]) > 0) {
        return (`Hace ${times[2]} ${times[3]} ${times[4]} ${times[5]}`);
      } if (Number(times[4]) > 0) {
        return (`Hace ${times[4]} ${times[5]}`);
      }
    } catch (error) {
      return console.log('no hay reportes aún');
    }

    return null;
  };

  const HandleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const HandleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const idPopover = open ? 'simple-popover' : undefined;

  const reportReport = async (id) => {
    await ReportsController.reportReport(id);
  };

  const boxStyle = {
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

  const capitalizarPrimeraLetra = (world) => world.charAt(0).toUpperCase() + world.slice(1);

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: '#9A31E4',
        width: 50,
        height: 50,
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  return (
    <>
      { filteredData.length > 0 ? filteredData.map((report) => (
        <Card
          key={report.id}
          sx={{
            width: 660, height: 400, margin: 8, borderRadius: 7,
          }}
        >
          <CardActionArea
            onClick={() => { console.log(report.id); getReport(report.id); }}
            sx={{
              width: 660, height: 400, borderRadius: 7,
            }}
          >
            <CardMedia
              sx={{ height: '70%' }}
              component="img"
              height="140"
              image={report.photo || '/default.jpg'}
              alt={`${report.address} ${report.type_report}`}
            />
            <CardContent sx={{
              height: '30%', display: 'flex', width: '100%', alignItems: 'center', padding: '0px 10%',
            }}
            >
              <Avatar {...stringAvatar('Andrew Cabrera')} src="/defaultUserImage.png" />
              <Box sx={{
                display: 'flex', flexDirection: 'column', paddingLeft: 3, width: '50%',
              }}
              >
                <Typography sx={{ color: '#3C9EDE', fontSize: '1.2rem' }} variant="h5" component="div">
                  {capitalizarPrimeraLetra(`${report.address}`)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {dateAgo(report.date_ago)}
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      )) : <h1>No hay reportes aún</h1>}
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={boxStyle}>
          {modalLoading
            ? <Skeleton sx={{ height: '40%' }} animation="wave" variant="rectangular" />
            : (
              <CardMedia
                sx={{ height: '40%' }}
                component="img"
                image={
                  oneReport.photo_place
                  || '/default.jpg'
                }
                alt={`${oneReport.address} ${oneReport.type_report}`}
              />
            )}

          <CardContent sx={{
            height: '60%',
            display: 'flex',
            width: 'auto',
            padding: '10px 5%',
            flexDirection: 'column',
          }}
          >
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
                      sx={{
                        color: '#9A31E4', alignItems: 'center',
                      }}
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
                  <Box sx={{
                    marginTop: '5px',
                    display: 'flex',
                    justifyContent: 'center',
                    width: '90%',
                    alignItems: 'center',
                  }}
                  >
                    <Avatar {...stringAvatar('Andrew Cabrera')} src="/defaultUserImage.png" />
                    <Typography variant="body2" sx={{ marginLeft: '20px' }}>
                      Escrito por
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{capitalizarPrimeraLetra(`${oneReport.username}`)}</Typography>
                    </Typography>
                    <IconButton aria-describedby={idPopover} onClick={HandleClick}>
                      <MoreVertIcon />
                    </IconButton>
                    <Popover
                      id={idPopover}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={HandleClose}
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
                  </Box>
                </>
              )}
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

Cards.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  filteredData: PropTypes.array.isRequired,
};

export default Cards;
