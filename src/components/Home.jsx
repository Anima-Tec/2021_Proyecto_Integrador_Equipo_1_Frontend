/* eslint-disable linebreak-style *//* eslint-disable max-len */
import React from 'react';
import styles from '../App.module.scss';
import Cards from './singleComponent/Card';
import ReportsController from '../networking/controllers/ReportsController';

const Home = () => {
  const [allReports, setAllReports] = React.useState([0]);
  const [dataLoading, setDataLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const getReportes = async () => {
      try {
        const reports = await ReportsController.getReports();
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
      <input />
      <Cards allReports={allReports} dataLoading={dataLoading} />
    </div>
  );
};

export default Home;
