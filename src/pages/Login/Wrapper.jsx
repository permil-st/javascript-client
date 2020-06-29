import React from 'react';
import { Mutation } from '@apollo/react-components';

import Login from './Login';
import { LOGIN_USER } from './mutation';

export default (props) => (
  <Mutation
    mutation={LOGIN_USER}
  >
    {
      ((LoginUser) => (
        <Login loginUser={LoginUser} {...props} />
      ))
    }
  </Mutation>
);
