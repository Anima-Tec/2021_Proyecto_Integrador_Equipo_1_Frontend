/* eslint-disable linebreak-style */
import * as React from 'react';
import PropTypes from 'prop-types';
import {
  SwipeableDrawer, Typography, Box, Button,
} from '@mui/material';
/* import { trackPromise, usePromiseTracker } from 'react-promise-tracker'; */
import moment from 'moment';
import ReportsController from '../../networking/controllers/ReportsController';

const drawerBleeding = 56;

export default function Drawer({ windows, open }) {
  const container = windows !== undefined ? () => window().document.body : undefined;

  const [assessmentValue, setAssessmentValue] = React.useState(2);
  const [selectedValue, setSelectedValue] = React.useState('');
  const [textValue, setTextValue] = React.useState('');
  /* const [statusEdit, setStatusEdit] = React.useState(false); */
  const [addressValue, setAddressValue] = React.useState('Ubicación');
  const [nameValue, setNameValue] = React.useState('Ubicación');
  const defaultValues = () => {
    setAssessmentValue(2);
    setSelectedValue('');
    setTextValue('');
    /* setStatusEdit(false); */
    setAddressValue('Ubicación');
    setNameValue('Ubicación');
  };

  /* const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const handleOpenBackdrop = () => setOpenBackdrop(true);
  const handleCloseBackdrop = () => { setOpenBackdrop(false); onGetNewReports(); }; */
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
    defaultValues();
  };

  React.useEffect(async () => {
    toggleDrawer(open);
  }, open);

  const createReport = async (data) => {
    await (ReportsController.createReport(
      data.date,
      data.description,
      data.type_report,
      data.name_place,
      data.address_place,
      data.assessment,
    ));
  };

  const getData = async () => {
    toggleDrawer(false);
    /* handleOpenBackdrop(); */
    const data = {
      date: moment().format('YYYY-MM-DD'),
      description: textValue,
      type_report: selectedValue,
      name_place: nameValue,
      address_place: addressValue,
      assessment: assessmentValue,
    };
    await createReport(data);
  };
  return (
    <>
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={openDrawer}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Typography sx={{ p: 2, color: 'text.secondary' }}>51 results</Typography>
        </Box>
        <Box
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
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
      </SwipeableDrawer>
    </>
  );
}
Drawer.defaultProps = {
  windows: undefined,
};

Drawer.propTypes = {
  /* onRefreshReports: PropTypes.func.isRequired, */
  open: PropTypes.bool.isRequired,
  windows: PropTypes.func,
};
