import React from 'react';
import PropTypes from 'prop-types';
import { Route, useHistory } from 'react-router-dom';

import { PrivateLayout } from '../layouts';
import { isAuthUser } from '../lib';

const PrivateLayoutRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();
  if (!isAuthUser()) {
    history.push('/login');
  }

  return (
    <Route
      {...rest}  // eslint-disable-line
      render={(matchProps) => (
        <PrivateLayout>
          <Component
            {...matchProps}  // eslint-disable-line
          />
        </PrivateLayout>
      )}
    />
  );
};

PrivateLayoutRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export { PrivateLayoutRoute as default };
