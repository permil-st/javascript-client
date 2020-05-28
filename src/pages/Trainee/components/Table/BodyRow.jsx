import React from 'react';
import PropTypes from 'prop-types';
import { TableRow } from '@material-ui/core';

import Cell from './Cell';

const BodyRow = (props) => {
  const { row, columns } = props;
  return (
    <TableRow>
      {
        columns && columns.map((cell) => (
          <Cell value={row[cell.field]} align={cell.align} />
        ))
      }
    </TableRow>
  );
};

BodyRow.propTypes = {
  row: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.instanceOf(PropTypes.any)).isRequired,
};

export default BodyRow;
