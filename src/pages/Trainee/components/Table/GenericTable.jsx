import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableBody, TableContainer, TableHead, Paper, TablePagination,
} from '@material-ui/core';

import HeaderRow from './HeaderRow';
import BodyRow from './BodyRow';
import useStyles from './styles';

const GenericTable = (props) => {
  const {
    id, columns, data, order, orderBy, onSort, onSelect,
    render, count, rowsPerPage, onChangePage, page, actions,
  } = props;

  const classes = useStyles();

  return (
    <>
      <TableContainer className={classes.root} component={Paper}>
        <Table id={id}>
          <TableHead>
            <HeaderRow
              columns={columns}
              order={order}
              orderBy={orderBy}
              onSort={onSort}
              actions={!!actions}
            />
          </TableHead>
          <TableBody>
            {
              data && data.map((row) => (
                <BodyRow
                  key={row}
                  columns={columns}
                  row={row}
                  onSelect={onSelect}
                  render={render}
                  actions={actions}
                />
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      {
        (count !== 0) && (
          <TablePagination
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={onChangePage}
          />
        )
      }

    </>
  );
};

GenericTable.propTypes = {
  id: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.instanceOf(PropTypes.object)).isRequired,
  data: PropTypes.arrayOf(PropTypes.instanceOf(PropTypes.object)).isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.string,
  onSort: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  render: PropTypes.func,
  actions: PropTypes.arrayOf(PropTypes.instanceOf(PropTypes.object)),
  count: PropTypes.number,
  page: PropTypes.number,
  onChangePage: PropTypes.func,
  rowsPerPage: PropTypes.number,
};

GenericTable.defaultProps = {
  orderBy: '',
  order: 'asc',
  render: undefined,
  actions: undefined,
  count: 0,
  page: 0,
  rowsPerPage: 100,
  onChangePage: () => {},
};

export default GenericTable;
