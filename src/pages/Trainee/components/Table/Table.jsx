import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from '@material-ui/core';

const useStyle = makeStyles({
  root: {
    margin: '8px 0px',
  },
});

const Cell = (props) => {
  const { value, align } = props;
  return (<TableCell align={align || 'left'}>{value}</TableCell>);
};

Cell.propTypes = {
  value: PropTypes.string.isRequired,
  align: PropTypes.string.isRequired,
};

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

const GenericTable = (props) => {
  const { id, columns, data } = props;
  const classes = useStyle();
  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table id={id}>
        <TableHead>
          <HeaderRow columns={columns} />
        </TableHead>
        <TableBody>
          {
            data && data.map((row) => (
              <BodyRow columns={columns} row={row} />
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
};

export default GenericTable;
