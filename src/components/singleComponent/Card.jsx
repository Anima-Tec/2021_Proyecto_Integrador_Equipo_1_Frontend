/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import {
  Card, CardContent, CardMedia, CardActionArea, Typography, Box, Avatar, Skeleton,
  Modal, Rating, Link,
} from '@mui/material';
import PropTypes from 'prop-types';
import ReportsController from '../../networking/controllers/ReportsController';

export default function Cards({ allReports, dataLoading }) {
  const [oneReport, setOneReport] = React.useState([0]);
  const [modalLoading, setModalLoading] = React.useState(true);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => { setOpen(false); setModalLoading(true); };

  const getReport = async (id) => {
    handleOpen();
    const report = await ReportsController.getReport(id);
    setOneReport(report[0]);
    setModalLoading(false);
  };

  const style = {
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
                    <Typography sx={{ color: '#3C9EDE' }} variant="h5" component="div">
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
        <Card sx={style}>
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
            width: '100%',
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
                    <Link href={`/places/${oneReport.address}`} underline="none">
                      <Typography id="modal-modal-title" sx={{ color: '#9A31E4' }} variant="h6" component="h2">
                        {capitalizarPrimeraLetra(`${oneReport.address}`)}
                      </Typography>
                    </Link>
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
                    width: '90%', height: '60%', maxHeight: '60%', overflow: 'auto',
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

Cards.defaultProps = {

};

Cards.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  allReports: PropTypes.array.isRequired,
  dataLoading: PropTypes.bool.isRequired,
};