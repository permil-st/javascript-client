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
            <Button color="inherit">TRAINEE</Button>
            <Button color="inherit">TEXTFIELD DEMO</Button>
            <Button color="inherit">INPUT DEMO</Button>
            <Button color="inherit">CHILDREN DEMO</Button>
          </div>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Navbar;
