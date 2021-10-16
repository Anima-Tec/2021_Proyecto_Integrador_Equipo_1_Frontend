/* eslint-disable linebreak-style *//* eslint-disable arrow-body-style */
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import SideBar from '../components/SideBar';
/* import TokenService from '../networking/TokenServie'; */
import styles from '../App.module.scss';
import BottomNav from '../components/singleComponent/BottomNav';
import Home from '../components/Home';

const HomePage = () => {
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
      <Home />
    </div>
  );
};
export default HomePage;
