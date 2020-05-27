import React from 'react';
import PropTypes from 'prop-types';
import { TableRow } from '@material-ui/core';

import Cell from './Cell';

const HeaderRow = (props) => {
  const { columns } = props;
  return (
    <TableRow>
      {
        columns && columns.map((cell) => {
          const { field, label, align } = cell;
          return (<Cell value={label || field} align={align} />);
        })
      }
    </TableRow>
  );
};

HeaderRow.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.instanceOf(PropTypes.any)).isRequired,
};

export default HeaderRow;
