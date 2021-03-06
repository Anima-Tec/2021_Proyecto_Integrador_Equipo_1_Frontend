/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Login.module.scss';
import Cards from '../UI/Cards/Card';
import CardLoading from '../UI/Cards/CardLoading';
import PlaceAutocomplete from '../UI/PlaceAutocomplete';

const ReporteredReports = ({ allReports, dataLoading }) => {
  const [filteredReports, setFilteredReports] = useState([0]);

  useEffect(() => {
    setFilteredReports(allReports);
  }, [allReports]);

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

ReporteredReports.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  allReports: PropTypes.array.isRequired,
  dataLoading: PropTypes.bool.isRequired,
};

export default ReporteredReports;
