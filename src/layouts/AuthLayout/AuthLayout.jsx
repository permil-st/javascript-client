import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Footer } from '../components';

const AuthLayout = ({ children }) => (
  <Grid
    container
    direction="column"
    justify="center"
    alignItems="center"
    style={{ height: '100vh' }}
  >
    <div>{children}</div>
    <Footer />
  </Grid>
);

AuthLayout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default AuthLayout;
