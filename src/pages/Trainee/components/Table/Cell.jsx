import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from '@material-ui/core';

const Cell = (props) => {
  const { value, align } = props;
  return (<TableCell align={align || 'left'}>{value}</TableCell>);
};

Cell.propTypes = {
  value: PropTypes.string.isRequired,
  align: PropTypes.string.isRequired,
};

export default Cell;
