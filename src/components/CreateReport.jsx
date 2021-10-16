/* eslint-disable linebreak-style */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import {
  Button, Modal, Typography, Box, Avatar, TextareaAutosize, Rating,
  Radio, RadioGroup, FormLabel, FormControlLabel, /* TextField , */
  Tooltip,
} from '@mui/material';
import moment from 'moment';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import ReportsController from '../networking/controllers/ReportsController';
import Spinner from './singleComponent/Spinner';
import styles from '../App.module.scss';

export default function BasicModal() {
  const [assessmentValue, setAssessmentValue] = React.useState(2);
  const [selectedValue, setSelectedValue] = React.useState('');
  const [textValue, setTextValue] = React.useState('');
  const [statusEdit, setStatusEdit] = React.useState(false);
  const [addressValue, setAddressValue] = React.useState('Ubicación');
  const defaultValues = () => {
    setAssessmentValue(2);
    setSelectedValue('');
    setTextValue('');
    setStatusEdit(false);
    setAddressValue('Ubicación');
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => { setOpen(false); defaultValues(); };

  const { promiseInProgress } = usePromiseTracker();

  const createReport = async (data) => {
    await trackPromise(ReportsController.createReport(
      data.date,
      data.description,
      data.type_report,
      data.address,
      data.assessment,
    ));
    handleClose();
  };

  const getData = async () => {
    const data = {
      date: moment().format('YYYY-MM-DD'),
      description: textValue,
      type_report: selectedValue,
      address: addressValue,
      assessment: assessmentValue,
    };
    await createReport(data);
  };

  const handleChange = (address) => {
    setAddressValue(address);
  };

  const handleSelect = (address) => {
    setAddressValue(address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log('Success', latLng))
      .catch((error) => console.error('Error', error));
  };

  const searchOptions = {
    // eslint-disable-next-line no-undef
    location: new google.maps.LatLng(-34, -56),
    radius: 100,
  };

  const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: 400,
    width: 700,
    bgcolor: 'background.paper',
    borderRadius: '30px',
    boxShadow: 24,
    p: 4,
  };

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const textAreaChange = (event) => {
    setTextValue(event.target.value);
  };

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: '#9A31E4',
        width: 50,
        height: 50,
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  return (
    <>
      <Button sx={{ color: 'white', padding: 0 }} variant="text" onClick={handleOpen}> CREAR REPORTE</Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxStyle}>
          <Box sx={{
            borderBottom: '1px solid #D0D0D0',
            height: '15%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
          >
            <Avatar {...stringAvatar('Andrew Cabrera')} src="/imgUser.png" />
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
          <Box sx={{
            borderBottom: '1px solid #D0D0D0',
            height: '73%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
          >
            <Box sx={{ margin: '3px 0px', width: '70%', cursor: 'text' }}>
              <Tooltip title="Ejemplo: Adidas | Tres Cruces Shopping" placement="right" arrow>
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
                                    <span>{suggestion.description}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </PlacesAutocomplete>
                      {/*                       <TextField
                        variant="standard"
                        value={addressValue}
                        color="secondary"
                        autoFocus
                        onChange={(e) => { setAddressValue(e.target.value); }}
                        onKeyDown={(e) => { if (e.keyCode === 13) setStatusEdit(false); }}
                        onBlur={() => { setStatusEdit(false); }}
                      /> */}
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
              </Tooltip>
            </Box>
            <TextareaAutosize
              color="secondary"
              maxRows={10}
              placeholder="Escriba su reporte aqui..."
              style={{ width: '100%', height: '70%', border: 'none' }}
              valu={textValue}
              onChange={textAreaChange}
            />
            <FormLabel component="legend">Tipo de reporte:</FormLabel>
            <RadioGroup
              aria-label="type_report"
              name="type_report"
              value={selectedValue}
              onChange={handleRadioChange}
              sx={{ display: 'inline' }}
            >
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
          <Box sx={{
            borderTop: '1px solid #D0D0D0',
            height: '12%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
          >
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
              {promiseInProgress ? <Spinner spinnerType="ring" moveType="spin" /> : 'Publicar'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
