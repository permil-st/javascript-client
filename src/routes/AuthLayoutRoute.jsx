import React from 'react';
import PropTypes from 'prop-types';
import { Route, useHistory } from 'react-router-dom';

import { AuthLayout } from '../layouts';
import { isAuthUser } from '../lib';

const AuthLayoutRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();

  if (isAuthUser()) {
    history.push('/trainee');
  }

  return (
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
};

AuthLayoutRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export { AuthLayoutRoute as default };
