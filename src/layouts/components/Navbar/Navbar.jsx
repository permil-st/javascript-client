import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core';

import useStyles from './styles';
import { deleteUser } from '../../../lib';

const navigateTo = (route, history) => {
  history.push(route);
};

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = (e) => {
    switch (e.target.innerText) {
    case 'TRAINEE':
      return navigateTo('/trainee', history);
    case 'TEXTFIELD DEMO':
      return navigateTo('/text-field-demo', history);
    case 'INPUT DEMO':
      return navigateTo('/input-demo', history);
    case 'CHILDREN DEMO':
      return navigateTo('/children', history);
    case 'LOGOUT':
      deleteUser();
      return navigateTo('/login', history);
    default:
      return navigateTo('/', history);
    }
  };

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
            <Button color="inherit" onClick={handleClick}>Logout</Button>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Navbar;
