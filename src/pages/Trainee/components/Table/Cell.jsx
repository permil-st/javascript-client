import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from '@material-ui/core';
import useStyles from './styles';

const Cell = (props) => {
  const {
    value, align, row, column, render,
  } = props;

  const classes = useStyles();

  return (
    <TableCell className={classes.cell} align={align || 'left'}>
      { (render && render(value, column, row)) || value }
    </TableCell>
  );
};

Cell.propTypes = {
  value: PropTypes.string.isRequired,
  align: PropTypes.string.isRequired,
  column: PropTypes.string.isRequired,
  row: PropTypes.instanceOf(PropTypes.any).isRequired,
  render: PropTypes.func,
};

Cell.defaultProps = {
  render: undefined,
};

export default Cell;
