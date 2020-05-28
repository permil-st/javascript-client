import React from 'react';
import PropTypes from 'prop-types';
import { TableRow } from '@material-ui/core';

import Cell from './Cell';
import useStyles from './styles';

const BodyRow = (props) => {
  const {
    row, columns, onSelect, render,
  } = props;

  const classes = useStyles();

  return (
    <TableRow
      className={classes.row}
      hover
      onClick={(event) => {
        if (onSelect) {
          onSelect(event, row);
        }
      }}
    >
      {
        columns && columns.map((cell) => (
          <Cell
            key={cell.field}
            value={(cell.format) ? cell.format(row[cell.field]) : row[cell.field]}
            align={cell.align}
            column={cell.field}
            row={row}
            render={render}
          />
        ))
      }
    </TableRow>
  );
};

BodyRow.propTypes = {
  row: PropTypes.instanceOf(PropTypes.any).isRequired,
  columns: PropTypes.arrayOf(PropTypes.instanceOf(PropTypes.any)).isRequired,
  onSelect: PropTypes.func.isRequired,
  render: PropTypes.func,
};

BodyRow.defaultProps = {
  render: undefined,
};

export default BodyRow;
