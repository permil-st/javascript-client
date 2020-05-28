import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableBody, TableContainer, TableHead, Paper,
} from '@material-ui/core';

import HeaderRow from './HeaderRow';
import BodyRow from './BodyRow';
import useStyles from './styles';

const GenericTable = (props) => {
  const {
    id, columns, data, order, orderBy, onSort, onSelect, render,
  } = props;
  const classes = useStyles();
  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table id={id}>
        <TableHead>
          <HeaderRow columns={columns} order={order} orderBy={orderBy} onSort={onSort} />
        </TableHead>
        <TableBody>
          {
            data && data.map((row) => (
              <BodyRow key={row} columns={columns} row={row} onSelect={onSelect} render={render} />
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

GenericTable.propTypes = {
  id: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.instanceOf(PropTypes.any)).isRequired,
  data: PropTypes.arrayOf(PropTypes.instanceOf(PropTypes.any)).isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.string,
  onSort: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  render: PropTypes.func,
};

GenericTable.defaultProps = {
  orderBy: '',
  order: 'asc',
  render: undefined,
};

export default GenericTable;
