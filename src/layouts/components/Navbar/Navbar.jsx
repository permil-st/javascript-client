import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  title: {
    'margin-right': 'auto',
  },
  div: {
    'margin-right': '24px',
  },
}));

const handleClick = (e) => {
  console.log(e.target.innerText);
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
  }
};

const navigateTo = (route) => {
  window.location.href = route;
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
          </div>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Navbar;
