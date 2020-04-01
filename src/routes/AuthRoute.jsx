import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { AuthLayout } from '../layouts';


const AuthLayoutRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}  // eslint-disable-line
    render={(matchProps) => (
      <AuthLayout>
        <Component
          {...matchProps}    // eslint-disable-line
        />
      </AuthLayout>
    )}
  />
);

AuthLayoutRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export { AuthLayoutRoute as default };
