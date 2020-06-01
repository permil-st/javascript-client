import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, IconButton } from '@material-ui/core';

import Cell from './Cell';
import useStyles from './styles';

const BodyRow = (props) => {
  const {
    row, columns, onSelect, render, actions,
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
      {

        actions && (
          <Cell
            column="Actions"
            row={row}
            render={() => (
              <>
                {
                  actions.map((action) => (
                    <IconButton
                      key={action.key}
                      onClick={(event) => { action.handler(event, row); }}
                    >
                      {action.icon}
                    </IconButton>
                  ))
                }
              </>
            )}
          />
        )
      }
    </TableRow>
  );
};

BodyRow.propTypes = {
  row: PropTypes.objectOf(PropTypes.any).isRequired,
  columns: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  onSelect: PropTypes.func.isRequired,
  render: PropTypes.func,
  actions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
};

BodyRow.defaultProps = {
  render: undefined,
  actions: undefined,
};

export default BodyRow;
