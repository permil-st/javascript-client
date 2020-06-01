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
    <TableCell className={classes.cell} align={align}>
      { (render && render(value, column, row)) || value }
    </TableCell>
  );
};

Cell.propTypes = {
  value: PropTypes.string,
  align: PropTypes.string,
  column: PropTypes.string.isRequired,
  row: PropTypes.objectOf(PropTypes.any).isRequired,
  render: PropTypes.func,
};

Cell.defaultProps = {
  render: undefined,
  align: 'left',
  value: '',
};

export default Cell;
