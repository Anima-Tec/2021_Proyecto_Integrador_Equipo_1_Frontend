/* eslint-disable linebreak-style */
import * as React from 'react';
/* import PropTypes from 'prop-types'; */
import { styled } from '@mui/material/styles';
import {
  AppBar, Box, Toolbar, IconButton, Fab,
} from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddIcon from '@mui/icons-material/Add';
import SessionController from '../../networking/controllers/SessionController';
/* import ReportsController from '../../networking/controllers/ReportsController'; */
import Drawer from './Drawer';

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});
export default function BottomAppBar() {
  const logOut = async () => {
    await (SessionController.logout());
    window.location.reload();
  };

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  /* const getNewsReports = async () => {
    try {
      const reports = await ReportsController.getReports();
      onRefreshReports(reports);
    } catch (err) {
      setError('Hubo un error al traer los reportes');
      console.log(error);
    }
  }; */

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: 'auto', bottom: 0, color: 'violet', bgcolor: 'white',
        }}
      >
        <Toolbar>
          <IconButton color="inherit" aria-label="Home">
            <HomeOutlinedIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="my reports">
            <ListAltOutlinedIcon />
          </IconButton>
          <StyledFab onClick={toggleDrawer(true)} color="secondary" aria-label="add report">
            <AddIcon />
            <Drawer open={open} />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick color="inherit" aria-label="profile">
            <AccountCircleOutlinedIcon />
          </IconButton>
          <IconButton onClick={logOut} color="inherit" aria-label="config">
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}
/* BottomAppBar.propTypes = {
  onRefreshReports: PropTypes.func.isRequired,
}; */
