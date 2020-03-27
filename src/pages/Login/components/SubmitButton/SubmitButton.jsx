import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

import useStyles from './styles';

const SubmitButton = (props) => {
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
      Submit
    </Button>
  );
};

SubmitButton.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

SubmitButton.defaultProps = {
  onClick: () => {},
  disabled: false,
};

export default SubmitButton;
