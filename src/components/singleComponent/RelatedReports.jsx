/* eslint-disable linebreak-style */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import {
  Card, CardContent, CardMedia, CardActionArea, Typography, Box, Avatar, Skeleton,
  Modal, Rating,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
// eslint-disable-next-line import/no-named-as-default
import AddressService from '../../networking/AddressService';
import ReportsController from '../../networking/controllers/ReportsController';
import PlaceController from '../../networking/controllers/PlaceController';
/* import styles from '../../App.module.scss'; */

export default function RelatedReports() {
  const history = useHistory();
  const [allReports, setAllReports] = React.useState([0]);
  const [oneReport, setOneReport] = React.useState([0]);
  const [modalLoading, setModalLoading] = React.useState(true);
  const [dataLoading, setDataLoading] = React.useState(true);
  const [reportsError, setReportsError] = React.useState('');

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => { setOpen(false); setModalLoading(true); };

  React.useEffect(() => {
    const getReportes = async () => {
      try {
        const placeReports = await PlaceController.getPlaceReports(AddressService.getAddress());
        setAllReports(placeReports);
        setDataLoading(false);
      } catch (err) {
        setReportsError('Hubo un error al traer los reportes');
        console.log(reportsError);
      }
    };
    getReportes();
  }, []);

  const getReport = async (id) => {
    handleOpen();
    const report = await ReportsController.getReport(id);
    setOneReport(report[0]);
    setModalLoading(false);
  };

  const saveAddress = async (address) => {
    await AddressService.setAddress(address);
    history.push(`places/${address}`);
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
      { allReports.map((report) => (
        <Card sx={{
          width: 660, height: 400, margin: 8, borderRadius: 7,
        }}
        >
          <CardActionArea
            onClick={() => getReport(report.id)}
            sx={{
              width: 660, height: 400, borderRadius: 7,
            }}
          >
            {dataLoading
              ? <Skeleton sx={{ height: '70%' }} animation="wave" variant="rectangular" />
              : (
                <CardMedia
                  sx={{ height: '70%' }}
                  component="img"
                  height="140"
                  image="https://www.hola.com/imagenes/estar-bien/20210217184541/gatos-gestos-lenguaje-significado/0-922-380/gatos-gestos-m.jpg"
                  alt={`${report.address} ${report.type_report}`}
                />
              )}

            <CardContent sx={{
              height: '30%', display: 'flex', width: '100%', alignItems: 'center', padding: '0px 10%',
            }}
            >
              {dataLoading
                ? <Skeleton animation="wave" variant="circular" width={50} height={50} />
                : <Avatar {...stringAvatar('Andrew Cabrera')} src="/imgUser.png" />}
              <Box sx={{
                display: 'flex', flexDirection: 'column', paddingLeft: 3, width: '50%',
              }}
              >
                {dataLoading ? (
                  <>
                    <Skeleton animation="wave" height={10} />
                    <Skeleton animation="wave" height={10} width="40%" />
                  </>
                ) : (
                  <>
                    {' '}
                    <Typography sx={{ color: '#3C9EDE', fontSize: '1.2rem' }} variant="h5" component="div">
                      {capitalizarPrimeraLetra(`${report.address}`)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {report.type_report}
                    </Typography>
                  </>
                )}
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
      <Modal
        open={open}
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
                image="https://www.hola.com/imagenes/estar-bien/20210217184541/gatos-gestos-lenguaje-significado/0-922-380/gatos-gestos-m.jpg"
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
                    <Typography id="modal-modal-title" sx={{ color: '#9A31E4', marginRight: '10px' }} variant="h6" component="h2" onClick={() => saveAddress(oneReport.address)}>
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
                    <Avatar {...stringAvatar('Andrew Cabrera')} src="/imgUser.png" />
                    <Typography variant="body2" sx={{ marginLeft: '20px' }}>
                      Escrito por
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{capitalizarPrimeraLetra(`${oneReport.username}`)}</Typography>
                    </Typography>
                  </Box>
                </>
              )}
          </CardContent>
        </Card>
      </Modal>
    </>
  );
}
