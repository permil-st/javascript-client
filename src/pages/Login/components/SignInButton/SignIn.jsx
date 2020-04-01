import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

import useStyles from './styles';

const SignInButton = (props) => {
  const classes = useStyles();
  const { onClick, disabled } = props;

  return (
    <Button
      className={classes.submitButton}
      variant="contained"
      fullWidth
      onClick={onClick}
      disabled={disabled}
    >
      Sign In
    </Button>
  );
};

SignInButton.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

SignInButton.defaultProps = {
  onClick: () => {},
  disabled: false,
};

export default SignInButton;
