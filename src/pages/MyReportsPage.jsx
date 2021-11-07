/* eslint-disable linebreak-style *//* eslint-disable arrow-body-style */
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import SideBar from '../components/UI/SideBar';
/* import TokenService from '../networking/TokenServie'; */
import styles from '../App.module.scss';
import BottomNav from '../components/UI/BottomNav';
import MisReportes from '../components/Login/MisReportes';
import ReportsController from '../networking/controllers/ReportsController';
import TokenService from '../networking/TokenService';

const MisReportesPage = () => {
/*   const data = TokenService.getUser();
  console.log(data); */
  const [allReports, setAllReports] = React.useState([0]);
  const [dataLoading, setDataLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(async () => {
    const data = await TokenService.getUser();
    const getReportes = async () => {
      try {
        const reports = await ReportsController.getMisReports(data.data.userId);
        setAllReports(reports);
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
          ? <SideBar username="Andy12" name="Andrew" surname="Cabrera" />
          : <BottomNav /> }
      </div>
      <MisReportes allReports={allReports} dataLoading={dataLoading} />
    </div>
  );
};
export default MisReportesPage;
