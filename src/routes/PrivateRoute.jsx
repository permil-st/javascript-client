import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { PrivateLayout } from '../layouts';

const PrivateLayoutRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest} // eslint-disable-line
    render={(matchProps) => (
      <PrivateLayout>
        <Component
          {...matchProps} // eslint-disable-line
        />
      </PrivateLayout>
    )}
  />
);

PrivateLayoutRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export { PrivateLayoutRoute as default };
