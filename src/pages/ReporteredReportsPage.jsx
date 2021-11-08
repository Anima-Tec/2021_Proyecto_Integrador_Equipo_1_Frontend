/* eslint-disable linebreak-style */
import React from 'react';
/* import { useMediaQuery } from 'react-responsive'; */
import BasicSpeedDial from '../components/UI/SpeedDial';
/* import TokenService from '../networking/TokenServie'; */
import styles from './HomePage.module.scss';
import ReporteredReports from '../components/Login/ReporteredReports';
import ReportsController from '../networking/controllers/ReportsController';

const ReporteredReportsPage = () => {
/*   const data = TokenService.getUser();
  console.log(data); */
  const [allReports, setAllReports] = React.useState([0]);
  const [dataLoading, setDataLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(async () => {
    const getReportes = async () => {
      try {
        const reports = await ReportsController.getReporteredReports();
        console.log(reports);
        setAllReports(reports);
        setDataLoading(false);
      } catch (err) {
        setError('Hubo un error al traer los reportes');
        console.log(error);
      }
    };
    getReportes();
  }, []);

  /* const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 768px)',
  }); */
  return (
    <div className={styles.ContainerHome}>
      <div className={styles.ContainerAdminMenu}>
        <BasicSpeedDial />
      </div>
      <ReporteredReports allReports={allReports} dataLoading={dataLoading} />
    </div>
  );
};
export default ReporteredReportsPage;
