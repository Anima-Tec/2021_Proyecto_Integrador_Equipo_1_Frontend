/* eslint-disable linebreak-style */
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import SideBar from '../components/UI/SideBar';
/* import TokenService from '../networking/TokenServie'; */
import styles from '../App.module.scss';
import BottomNav from '../components/UI/BottomNav';
import Perfil from '../components/Login/Perfil';

const PerfilPage = () => {
/*   const data = TokenService.getUser();
  console.log(data); */
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 768px)',
  });
  return (
    <div className={styles.ContainerHome}>
      <div className={styles.ContainerMenu}>
        { isDesktopOrLaptop
          ? <SideBar username="Andy12" name="Andrew" surname="Cabrera" />
          : <BottomNav /> }
      </div>
      <Perfil />
    </div>
  );
};
export default PerfilPage;
