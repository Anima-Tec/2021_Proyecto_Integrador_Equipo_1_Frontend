/* eslint-disable linebreak-style *//* eslint-disable max-len */
import React from 'react';
import styles from '../App.module.scss';
import AddressService from '../networking/AddressService';
import PlaceController from '../networking/controllers/PlaceController';
import RelatedReports from './singleComponent/RelatedReports';

const Place = () => {
  const [place, setPlace] = React.useState([0]);
  /* const [dataLoading, setDataLoading] = React.useState(true); */
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const getReportes = async () => {
      try {
        const placeInfo = await PlaceController.getPlace(AddressService.getAddress());
        setPlace(placeInfo);
        console.log(place);
      } catch (err) {
        setError('Hubo un error al traer los reportes');
        console.log(error);
      }
    };
    getReportes();
  }, []);

  return (
    <div className={styles.ContainerHomeData}>
      <p>Place must be apear here!</p>
      <p>{place.address}</p>
      <RelatedReports />
    </div>
  );
};

export default Place;
