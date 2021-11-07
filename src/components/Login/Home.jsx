/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import PlaceAutocomplete from '../UI/PlaceAutocomplete';
import styles from './Login.module.scss';
import Cards from '../UI/Card';
import CardLoading from '../UI/CardLoading';

const Home = ({ allReports, dataLoading }) => {
  const [filteredReports, setFilteredReports] = React.useState([0]);

  React.useEffect(() => {
    setFilteredReports(allReports);
  }, allReports);

  const filteredData = (ReportsFilter) => {
    setFilteredReports(ReportsFilter);
  };

  return (
    <div className={styles.ContainerHomeData}>
      {dataLoading
        ? <CardLoading />
        : (
          <>
            <PlaceAutocomplete allReports={allReports} onFilteredData={filteredData} />
            <Cards filteredData={filteredReports} />
          </>
        )}
    </div>
  );
};

Home.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  allReports: PropTypes.array.isRequired,
  dataLoading: PropTypes.bool.isRequired,
};

export default Home;
