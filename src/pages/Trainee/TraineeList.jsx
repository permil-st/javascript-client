import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from '@material-ui/core';

import { AddDialog, Table } from './components';
import TraineeListField from './TraineeListField';
import { getDateFormatted } from '../../lib';

class TraineeList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      dialog: {},
      orderBy: '',
      order: '',
    };
  }

  handleButtonClick = () => {
    this.setState({ isOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ isOpen: false });
  };

  handleDialogSubmit = (data) => {
    const { dialog } = this.state;

    this.setState({ dialog: data }, () => {
      console.log(dialog);
    });
  };

  handleSelect = (event, row) => {
    console.log(event);
    console.log(row);
  }

  handleSort = (column, order) => {
    this.setState({ orderBy: column, order });
  }

  render() {
    const { isOpen, orderBy, order } = this.state;
    const { traineeList } = this.props;
    const {
      handleSelect, handleSort, handleButtonClick, handleDialogSubmit, handleDialogClose,
    } = this;
    const columns = [
      {
        field: 'name',
        align: 'center',
        label: 'Name',
      }, {
        field: 'email',
        label: 'E-mail',
        format: (value) => value && value.toUpperCase(),
      }, {
        field: 'createdAt',
        label: 'Date',
        align: 'right',
        format: getDateFormatted,
      },
    ];

    return (
      <>
        <Grid container justify="flex-end">
          <Button variant="outlined" color="primary" onClick={handleButtonClick}>
            ADD TRAINEELIST
          </Button>
        </Grid>
        <Table
          id="trainee"
          columns={columns}
          data={traineeList}
          orderBy={orderBy}
          order={order}
          onSelect={handleSelect}
          onSort={handleSort}
        />
        <AddDialog
          open={isOpen}
          onClose={handleDialogClose}
          onSubmit={handleDialogSubmit}
        />
        <TraineeListField traineeList={traineeList} />
      </>
    );
  }
}

TraineeList.propTypes = {
  traineeList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TraineeList;
