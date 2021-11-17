/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React from 'react';
import { IconButton } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useHistory } from 'react-router-dom';
import styles from './InfoPlace.module.scss';
import AddressService from '../../networking/AddressService';
import PlaceController from '../../networking/controllers/PlaceController';
import Cards from '../UI/Card';
import CardLoading from '../UI/CardLoading';

const Place = () => {
  const history = useHistory();
  const [place, setPlace] = React.useState([0]);
  const [allReports, setAllReports] = React.useState([0]);
  const [dataLoading, setDataLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const getReportes = async () => {
      try {
        const placeInfo = await PlaceController.getPlace(AddressService.getAddress());
        setPlace(placeInfo);
        console.log(placeInfo);
        const reports = await PlaceController.getPlaceReports(AddressService.getAddress());
        setAllReports(reports);
        console.log(reports);
        setDataLoading(false);
      } catch (err) {
        setError('Hubo un error al traer los reportes');
        console.log(err);
        console.log(error);
      }
    };
    getReportes();
  }, []);

  const goBack = async () => {
    console.log('go to back');
    await AddressService.removeAddress();
    history.goBack();
  };

  return (
    <div className={styles.ContainerPlaceData}>
      <div className={styles.UserDataWrapper}>
        <img alt="place" src="https://www.hola.com/imagenes/estar-bien/20210217184541/gatos-gestos-lenguaje-significado/0-922-380/gatos-gestos-e.jpg" />
        <h1>{place.name}</h1>
        <h3>{place.address}</h3>
      </div>
      <div className={styles.PlaceSectionPlace}>
        <div className={styles.AmountRelatedReportsWrapper}>
          <p>
            Reportes
            <br />
            Relacionados:
          </p>
          {place.quantity}
        </div>
        <div className={styles.AssessmentWrapper}>
          <p>
            Valoracion
            <br />
            promedio:
          </p>
          {place.assessment}
        </div>
      </div>
      <div className={styles.PlaceSectionReports}>
        <div className={styles.RelatedReportsWrapper}>
          <p>Reportes Relacionados:</p>
          {dataLoading ? <CardLoading /> : <Cards filteredData={allReports} /> }
        </div>
      </div>
      <div className={styles.BackBtn}>
        <IconButton onClick={goBack} type="button" sx={{ p: '10px' }} aria-label="back">
          <KeyboardBackspaceIcon sx={{ fontSize: '2rem', color: 'white' }} />
        </IconButton>
      </div>
    </div>
  );
};

export default Place;
