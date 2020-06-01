import React from 'react';
import PropTypes from 'prop-types';
import { Button, LinearProgress } from '@material-ui/core';

import useStyles from './styles';

const SignInButton = (props) => {
  const classes = useStyles();
  const { onClick, disabled, isLoading } = props;

  return (
    <>
      <Button
        className={classes.submitButton}
        variant="contained"
        fullWidth
        onClick={onClick}
        disabled={disabled}
      >
        Sign In
      </Button>
      {isLoading && (<LinearProgress />)}
    </>
  );
};

SignInButton.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};

SignInButton.defaultProps = {
  onClick: () => {},
  disabled: false,
  isLoading: false,
};

export default SignInButton;
