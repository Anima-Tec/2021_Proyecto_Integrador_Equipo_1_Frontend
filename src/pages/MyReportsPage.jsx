/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import SideBar from '../components/UI/SideBar';
/* import TokenService from '../networking/TokenServie'; */
import styles from './MyReportsPage.module.scss';
import BottomNav from '../components/UI/BottomNav';
import MyReports from '../components/Login/MyReports';
import ReportsController from '../networking/controllers/ReportsController';
import PersonController from '../networking/controllers/PersonController';
import TokenService from '../networking/TokenService';

const MyReportsPage = () => {
  const [allReports, setAllReports] = useState([0]);
  const [person, setPerson] = useState([0]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(async () => {
    const data = await TokenService.getUser();
    const getReportes = async () => {
      try {
        const reports = await ReportsController.getMisReports(data.data.userId);
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

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 768px)',
  });
  return (
    <div className={styles.ContainerHome}>
      <div className={styles.ContainerMenu}>
        { isDesktopOrLaptop
          ? (
            <SideBar
              username={person.username}
              name={person.name}
              surname={person.surname}
            />
          )
          : <BottomNav /> }
      </div>
      <MyReports allReports={allReports} dataLoading={dataLoading} />
    </div>
  );
};
export default MyReportsPage;
