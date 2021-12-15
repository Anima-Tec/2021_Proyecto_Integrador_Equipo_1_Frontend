/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Modal, Typography, Box, Avatar, TextareaAutosize, Rating,
  Radio, RadioGroup, FormLabel, FormControlLabel,
} from '@mui/material';
import { useMediaQuery } from 'react-responsive';
import moment from 'moment';
import PlacesAutocomplete from 'react-places-autocomplete';
import UploadImage from '../UploadImage';
import styles from './Modal.module.scss';

const ModalCreateReport = ({
  open, handleClose, createReport, handleOpenBackdrop,
}) => {
  const [assessmentValue, setAssessmentValue] = useState(2);
  const [selectedValue, setSelectedValue] = useState('');
  const [textValue, setTextValue] = useState('');
  const [statusEdit, setStatusEdit] = useState(false);
  const [addressValue, setAddressValue] = useState('Ubicación');
  const [nameValue, setNameValue] = useState('Ubicación');
  const [photoValue, setPhotoValue] = useState(null);
  const defaultValues = () => {
    setAssessmentValue(2);
    setSelectedValue('');
    setTextValue('');
    setStatusEdit(false);
    setAddressValue('Ubicación');
    setNameValue('Ubicación');
    setPhotoValue(null);
  };

  const handleChange = (address) => {
    setAddressValue(address);
    setNameValue(address.split(',')[0]);
  };

  const handleSelect = (address) => {
    setAddressValue(address);
    setNameValue(address.split(',')[0]);
  };

  const searchOptions = {
    // eslint-disable-next-line no-undef
    location: new google.maps.LatLng(-34, -56),
    radius: 100,
  };

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const textAreaChange = (event) => {
    setTextValue(event.target.value);
  };

  const photoReturn = (photo) => {
    setPhotoValue(photo);
  };

  const getData = async () => {
    handleClose();
    defaultValues();
    handleOpenBackdrop();
    const data = {
      date: moment().format('YYYY-MM-DD'),
      description: textValue,
      type_report: selectedValue,
      name_place: nameValue,
      address_place: addressValue,
      assessment: assessmentValue,
      photo: photoValue,
    };
    createReport(data);
  };

  const isTablet = useMediaQuery({
    query: '(max-width: 768px)',
  });

  const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: isTablet ? 350 : 400,
    width: isTablet ? 600 : 700,
    bgcolor: 'background.paper',
    borderRadius: '30px',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={boxStyle}>
        <Box className={styles.ContainerHeader}>
          <Avatar src="/defaultUserImage.png" />
          <Rating
            sx={{
              color: '#9A31E4', fontSize: '2.5rem', alignSelf: 'center',
            }}
            name="simple-controlled"
            value={assessmentValue}
            onChange={(event, newValue) => {
              setAssessmentValue(newValue);
            }}
          />
        </Box>
        <Box className={styles.ContainerBodyAndRadioBtns}>
          <Box className={styles.ContainerBody}>
            <Box className={styles.ContainerTextInputs}>
              { statusEdit
                ? (
                  <>
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
                              onKeyDown: (e) => { if (e.keyCode === 13) setStatusEdit(false); },
                              onBlur: () => { setStatusEdit(false); },
                            })}
                                // eslint-disable-next-line jsx-a11y/no-autofocus
                            autoFocus
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
                  </>
                )
                : (
                  <Typography
                    onClick={() => setStatusEdit(true)}
                    id="modal-modal-title"
                    sx={{ color: '#9A31E4' }}
                    variant="h6"
                    component="h2"
                  >
                    {addressValue}
                  </Typography>
                )}
              <TextareaAutosize
                color="secondary"
                maxRows={10}
                placeholder="Escriba su reporte aqui..."
                style={{ width: '100%', height: '70%', border: 'none' }}
                valu={textValue}
                onChange={textAreaChange}
              />
            </Box>
            <UploadImage photo={photoValue} photoReturn={photoReturn} />
          </Box>
          <RadioGroup
            aria-label="type_report"
            name="type_report"
            value={selectedValue}
            onChange={handleRadioChange}
            sx={{ display: 'inline' }}
          >
            <FormLabel component="legend">Tipo de reporte:</FormLabel>
            <FormControlLabel
              value="Opinion"
              control={(
                <Radio sx={{
                  color: '#C99CE9',
                  '&.Mui-checked': {
                    color: '#9A31E4',
                  },
                }}
                />
                )}
              label="Opinion."
            />
            <FormControlLabel
              value="Denuncia"
              control={(
                <Radio sx={{
                  color: '#C99CE9',
                  '&.Mui-checked': {
                    color: '#9A31E4',
                  },
                }}
                />
                )}
              label="Denuncia."
            />
          </RadioGroup>
        </Box>
        <Box className={styles.ContainerFooter}>
          <Button
            sx={{
              height: 35, borderRadius: '8px', width: '100px', background: 'linear-gradient(90deg, rgba(196,196,196,1) 0%, rgba(60,158,222,1) 100%)',
            }}
            variant="contained"
            onClick={handleClose}
          >
            Cerrar
          </Button>
          <Button
            sx={{
              height: 35, borderRadius: '8px', width: '100px', background: 'linear-gradient(90deg, rgba(154,49,228,1) 0%, rgba(60,158,222,1) 100%)',
            }}
            variant="contained"
            onClick={getData}
          >
            Publicar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
ModalCreateReport.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  createReport: PropTypes.func.isRequired,
  handleOpenBackdrop: PropTypes.func.isRequired,
};

export default ModalCreateReport;
