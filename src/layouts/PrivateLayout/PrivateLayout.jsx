import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Navbar } from '../components';

const useStyles = makeStyles(() => ({
  container: {
    padding: '12px',
  },
}));

const PrivateLayout = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <div className={classes.container}>{children}</div>
    </>
  );
};

PrivateLayout.propTypes = {
  children: PropTypes.object.isRequired,
};

export { PrivateLayout as default };
