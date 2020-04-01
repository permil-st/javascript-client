import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core';

import useStyles from './styles';

const navigateTo = (route) => {
  window.location.href = route;
};

const handleClick = (e) => {
  switch (e.target.innerText) {
  case 'TRAINEE':
    navigateTo('/trainee');
    break;
  case 'TEXTFIELD DEMO':
    navigateTo('/text-field-demo');
    break;
  case 'INPUT DEMO':
    navigateTo('/input-demo');
    break;
  case 'CHILDREN DEMO':
    navigateTo('/children');
    break;
  case 'LOGIN':
    navigateTo('/login');
    break;
  default:
    navigateTo('/');
    break;
  }
};

const Navbar = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            TRAINEE PORTAL
          </Typography>
          <div className={classes.div}>
            <Button color="inherit" onClick={handleClick}>TRAINEE</Button>
            <Button color="inherit" onClick={handleClick}>TEXTFIELD DEMO</Button>
            <Button color="inherit" onClick={handleClick}>INPUT DEMO</Button>
            <Button color="inherit" onClick={handleClick}>CHILDREN DEMO</Button>
            <Button color="inherit" onClick={handleClick}>Login</Button>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Navbar;
