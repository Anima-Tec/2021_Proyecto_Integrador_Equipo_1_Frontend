/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  Card, CardContent, CardMedia, CardActionArea, Typography, Box, Avatar,
} from '@mui/material';
import PropTypes from 'prop-types';
import ReportsController from '../../../networking/controllers/ReportsController';
import CardModal from './CardModal';
import styles from './Card.module.scss';

const Cards = ({ filteredData }) => {
  const [oneReport, setOneReport] = useState([0]);
  const [modalLoading, setModalLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
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

  const capitalizarPrimeraLetra = (world) => world.charAt(0).toUpperCase() + world.slice(1);

  return (
    <>
      { filteredData.length > 0 ? filteredData.map((report) => (
        <Card
          key={report.id}
          className={styles.Card}
        >
          <CardActionArea
            onClick={() => { console.log(report.id); getReport(report.id); }}
            className={styles.CardActionArea}
          >
            <CardMedia
              className={styles.CardMedia}
              component="img"
              height="140"
              image={report.photo || '/default.jpg'}
              alt={`${report.address} ${report.type_report}`}
            />
            <CardContent className={styles.CardContent}>
              <Avatar src="/defaultUserImage.png" />
              <Box className={styles.ContainerInfo}>
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
      <CardModal
        openModal={openModal}
        oneReport={oneReport}
        modalLoading={modalLoading}
        handleClose={handleClose}
      />
    </>
  );
};

Cards.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  filteredData: PropTypes.array.isRequired,
};

export default Cards;
