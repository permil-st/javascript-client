import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { PrivateLayout } from '../layouts';

const PrivateLayoutRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => (
      <PrivateLayout>
        <Component
          {...matchProps}
        />
      </PrivateLayout>
    )}
  />
);

PrivateLayoutRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export { PrivateLayoutRoute as default };
