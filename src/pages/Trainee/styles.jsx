import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  root: {
    padding: '8px',
  },
};

function divWithPadding(props) {
  const { classes, children } = props;

  return <div className={classes.root}>{children}</div>;
}

divWithPadding.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withStyles(styles)(divWithPadding);
