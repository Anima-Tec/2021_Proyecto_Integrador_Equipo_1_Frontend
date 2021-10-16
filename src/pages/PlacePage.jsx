/* eslint-disable linebreak-style *//* eslint-disable arrow-body-style */
import React from 'react';
/* import TokenService from '../networking/TokenServie'; */
import Place from '../components/Place';
import styles from '../App.module.scss';

const PlacePage = () => {
/*   const data = TokenService.getUser();
  console.log(data); */

  return (
    <div className={styles.ContainerHome}>
      <Place />
    </div>
  );
};
export default PlacePage;
