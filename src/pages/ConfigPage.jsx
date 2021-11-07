/* eslint-disable linebreak-style *//* eslint-disable arrow-body-style */
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import SideBar from '../components/UI/SideBar';
/* import TokenService from '../networking/TokenServie'; */
import styles from '../App.module.scss';
import BottomNav from '../components/UI/BottomNav';
import Configuracion from '../components/Login/Configuracion';

const ConfigPage = () => {
/*   const data = TokenService.getUser();
  console.log(data); */
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 768px)',
  });
  return (
    <div className={styles.ContainerHome}>
      { isDesktopOrLaptop
        ? <SideBar username="Andy12" name="Andrew" surname="Cabrera" />
        : <BottomNav /> }
      <Configuracion />
    </div>
  );
};
export default ConfigPage;
