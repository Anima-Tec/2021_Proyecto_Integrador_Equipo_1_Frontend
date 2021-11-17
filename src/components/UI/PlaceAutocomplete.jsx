/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { IconButton, Paper } from '@mui/material';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { useHistory } from 'react-router-dom';
import styles from '../../App.module.scss';
import AddressService from '../../networking/AddressService';

const PlaceAutocomplete = ({ allReports, onFilteredData }) => {
  const history = useHistory();
  const [addressValue, setAddressValue] = React.useState('');

  React.useEffect(async () => {
    onFilteredData(allReports);
  }, []);

  const searchOptions = {
    // eslint-disable-next-line no-undef
    location: new google.maps.LatLng(-34, -56),
    radius: 100,
  };

  const handleChange = async (address) => {
    const capitaliceAddress = address.charAt(0).toUpperCase() + address.slice(1);
    setAddressValue(capitaliceAddress);
    const result = await allReports.filter((data) => data.address.search(capitaliceAddress) !== -1);
    onFilteredData(result);
  };

  const handleSelect = (address) => {
    setAddressValue(address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log('Success', latLng))
      .catch((errorGeoCode) => console.error('Error', errorGeoCode));
  };

  const clearAddress = async () => {
    setAddressValue('');
    const result = await allReports.filter((data) => data.address.search('') !== -1);
    onFilteredData(result);
  };

  const searchAddress = async () => {
    await AddressService.setAddress(addressValue);
    history.push(`places/${addressValue}`);
  };

  return (
    <>
      <Paper sx={{
        p: '2px 4px', display: 'flex', alignItems: 'center', width: '65%',
      }}
      >
        <div className={styles.ContainerPlacesAutocomplete}>
          <PlacesAutocomplete
            value={addressValue}
            onChange={handleChange}
            onSelect={handleSelect}
            searchOptions={searchOptions}
          >
            {({
              getInputProps, suggestions, getSuggestionItemProps, loading,
            }) => (
              <div className={styles.ContainerLocationSearchInput}>
                <input
                  className={styles.LocationSearchInput}
                  {...getInputProps({
                    placeholder: 'Search Places ...',
                    onKeyDown: (e) => { if (e.keyCode === 13) searchAddress(); },
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                      // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>
                          { suggestion.terms.length > 1
                            ? `${suggestion.terms[0].value}, ${suggestion.terms[1].value}`
                            : suggestion.terms[0].value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>
        { addressValue !== ''
          && (
            <div className={styles.ContainerIconsSearchInput}>
              <IconButton onClick={clearAddress} type="submit" sx={{ p: '10px' }} aria-label="search">
                <ClearRoundedIcon />
              </IconButton>
              <IconButton onClick={searchAddress} type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </div>
          )}
      </Paper>
    </>
  );
};

PlaceAutocomplete.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  allReports: PropTypes.array.isRequired,
  onFilteredData: PropTypes.func.isRequired,
};

export default PlaceAutocomplete;
