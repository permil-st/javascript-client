import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  footer: {
    'margin-top': '20px',
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Typography variant="subtitle1" className={classes.footer}>
      ©  Successive Technologies
    </Typography>
  );
};

export default Footer;
