/* eslint-disable linebreak-style *//* eslint-disable arrow-body-style */
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import SideBar from '../components/UI/SideBar';
import BasicSpeedDial from '../components/UI/SpeedDial';
/* import TokenService from '../networking/TokenServie'; */
import styles from './HomePage.module.scss';
import BottomNav from '../components/UI/BottomNav';
import Home from '../components/Login/Home';
import ReportsController from '../networking/controllers/ReportsController';
import PersonController from '../networking/controllers/PersonController';
import TokenService from '../networking/TokenService';

const HomePage = () => {
  const data = TokenService.getUser();
  const userType = data.data.typeUser;
  const [allReports, setAllReports] = React.useState([0]);
  const [person, setPerson] = React.useState([0]);
  const [dataLoading, setDataLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(async () => {
    const getReportes = async () => {
      try {
        const reports = await ReportsController.getReports();
        const persons = await PersonController.getPerson();
        setAllReports(reports);
        setPerson(persons[0]);
        setDataLoading(false);
      } catch (err) {
        setError('Hubo un error al traer los reportes');
        console.log(error);
      }
    };
    getReportes();
  }, []);

  const refreshReports = (newReports) => {
    setAllReports(newReports);
  };

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 768px)',
  });
  return (
    <div className={styles.ContainerHome}>
      { userType === 'normal' ? (
        <>
          <div className={styles.ContainerAdminMenu}>
            <BasicSpeedDial />
          </div>
          <Home allReports={allReports} dataLoading={dataLoading} />
        </>
      ) : (
        <>
          <div className={styles.ContainerMenu}>
            { isDesktopOrLaptop
              ? (
                <SideBar
                  username={person.username}
                  name={person.name}
                  surname={person.surname}
                  onRefreshReports={refreshReports}
                />
              )
              : <BottomNav onRefreshReports={refreshReports} /> }
          </div>
          <Home allReports={allReports} dataLoading={dataLoading} />
        </>
      ) }
    </div>
  );
};
export default HomePage;
