import React from 'react';
import PropTypes from 'prop-types';

import { Navbar } from '../components';
import useStyles from './styles';

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
