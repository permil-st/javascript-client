import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableSortLabel } from '@material-ui/core';

import Cell from './Cell';

const toggleOrder = (order) => {
  return order === 'asc' ? 'desc' : 'asc';
};

const HeaderRow = (props) => {
  const {
    columns, order, orderBy, onSort,
  } = props;

  return (
    <TableRow>
      {
        columns && columns.map((cell) => {
          const { field, label, align } = cell;
          return (
            <Cell
              key={field}
              value={label || field}
              align={align}
              column={label || field}
              row={columns}
              render={(value) => (
                <TableSortLabel
                  active={orderBy === field}
                  direction={(field === orderBy) ? order : 'asc'}
                  onClick={() => {
                    const newOrder = (field === orderBy) ? toggleOrder(order) : 'asc';
                    if (onSort) { onSort(field, newOrder); }
                  }}
                >
                  {value}
                </TableSortLabel>
              )}
            />
          );
        })
      }
    </TableRow>
  );
};

HeaderRow.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.instanceOf(PropTypes.any)).isRequired,
  orderBy: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default HeaderRow;
