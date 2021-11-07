/* eslint-disable linebreak-style */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Button, Backdrop } from '@mui/material';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import ModalCreateReport from './Modal';
import BackDrop from './BackDrop';
import ReportsController from '../../../networking/controllers/ReportsController';

export default function CreateReport({ onGetNewReports }) {
  const { promiseInProgress } = usePromiseTracker();
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const handleOpenBackdrop = () => setOpenBackdrop(true);
  const handleCloseBackdrop = () => { setOpenBackdrop(false); onGetNewReports(); };
  const [success, setSuccess] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => { setOpen(false); };

  const createReport = async (data) => {
    const response = await trackPromise(ReportsController.createReport(
      data.date,
      data.description,
      data.type_report,
      data.name_place,
      data.address_place,
      data.assessment,
    ));
    setSuccess(response.data.success);
  };

  return (
    <>
      <Button sx={{ color: 'white', padding: 0 }} variant="text" onClick={handleOpen}> CREAR REPORTE</Button>
      <ModalCreateReport
        open={open}
        handleClose={handleClose}
        createReport={createReport}
        handleOpenBackdrop={handleOpenBackdrop}
      />
      {promiseInProgress
        ? (
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openBackdrop}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )
        : (
          <BackDrop
            success={success}
            openBackdrop={openBackdrop}
            handleCloseBackdrop={handleCloseBackdrop}
          />
        )}
    </>
  );
}
CreateReport.propTypes = {
  onGetNewReports: PropTypes.func.isRequired,
};
