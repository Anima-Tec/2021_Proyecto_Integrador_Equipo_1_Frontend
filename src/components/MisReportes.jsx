/* eslint-disable linebreak-style *//* eslint-disable max-len */
import React from 'react';
import styles from '../App.module.scss';
import Cards from './singleComponent/Card';
import ReportsController from '../networking/controllers/ReportsController';
import TokenService from '../networking/TokenService';

const MisReportes = () => {
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

  return (
    <div className={styles.ContainerHomeData}>
      <Cards allReports={allReports} dataLoading={dataLoading} />
    </div>
  );
};

export default MisReportes;
