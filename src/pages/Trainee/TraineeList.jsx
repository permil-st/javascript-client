import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import { graphql } from '@apollo/react-hoc';
import { FETCH_TRAINEE } from './query';

import {
  AddDialog, DeleteDialog, EditDialog, Table,
} from './components';
import TraineeListField from './TraineeListField';
import { getDateFormatted, callApi, getUserToken } from '../../lib';
import { SharedSnackBarContextConsumer } from '../../contexts';

class TraineeList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      records: [],
      loading: true,
      dialogLoading: false,
      isOpenAddDialog: false,
      isOpenEditDialog: false,
      isOpenDeleteDialog: false,
      deleteRow: {},
      editRow: {},
      orderBy: '',
      order: '',
      count: 100,
      page: 0,
      rowsPerPage: 20,
    };
  }

  loadTrainees = async (skip) => {
    const { openSnackBar } = this.context;
    const { rowsPerPage, loading } = this.state;

    if (!loading) {
      this.setState({ loading: true });
    }

    try {
      const response = await callApi(
        `trainee?skip=${skip}&limit=${rowsPerPage}`,
        'GET', { 'Content-Type': 'application/json', Authorization: getUserToken() },
      );
      this.setState({
        loading: false,
        count: response.data.count,
        records: [...response.data.records],
      });
    } catch (err) {
      this.setState({
        loading: false,
        count: 0,
        records: [],
      });
      openSnackBar(err?.data?.message || err.message, 'error');
    }
  }

  handleButtonClick = () => {
    this.setState({ isOpenAddDialog: true });
  };

  handleDialogClose = () => {
    this.setState({ isOpenAddDialog: false });
  };

  handleDialogSubmit = async (data) => {
    const { openSnackBar } = this.context;

    try {
      this.setState({ loading: true });
      const response = await callApi(
        'trainee', 'POST', { Authorization: getUserToken() }, data,
      );

      openSnackBar(response.message, 'success');
      this.setState({ loading: false });
      this.handleDialogClose();
    } catch (err) {
      openSnackBar(err?.response?.data?.message || err.message, 'error');
      this.setState({ loading: false });
      this.handleDialogClose();
    }
  };

  handleSelect = () => {
    // console.log(event);
    // console.log(row);
  }

  handleSort = (column, order) => {
    this.setState({ orderBy: column, order });
  }

  handlePageChange = (event, page) => {
    const { rowsPerPage } = this.state;
    const { data: { refetch } } = this.props;
    this.setState({ page });

    refetch({ skip: (page) * rowsPerPage, limit: rowsPerPage });
    // this.loadTrainees((page) * rowsPerPage);
  }

  handleEditDialogOpen = (event, row) => {
    this.setState({ isOpenEditDialog: true, editRow: row });
  }

  handleEditDialogClose = () => {
    this.setState({ isOpenEditDialog: false });
  }

  handleEditDialogSubmit = async (data, row) => {
    const { openSnackBar } = this.context;
    const { page, rowsPerPage } = this.state;

    try {
      this.setState({ dialogLoading: true });
      const response = await callApi(
        'trainee', 'PUT', { Authorization: getUserToken() }, { ...data, id: row.originalId },
      );

      openSnackBar(response.message, 'success');
      this.loadTrainees(page * rowsPerPage);
      this.setState({ dialogLoading: false });
      this.handleEditDialogClose();
    } catch (err) {
      openSnackBar(err?.data?.message || err.message, 'error');
      this.setState({ dialogLoading: false });
    }
  }

  handleRemoveDialogOpen = (event, row) => {
    this.setState({ isOpenDeleteDialog: true, deleteRow: row });
  }

  handleRemoveDialogClose = () => {
    this.setState({ isOpenDeleteDialog: false });
  }

  handleRemoveDialogSubmit = async (row) => {
    const { openSnackBar } = this.context;
    const { page, rowsPerPage, records } = this.state;
    let skip = 0;

    try {
      this.setState({ dialogLoading: true });
      const response = await callApi(
        `trainee/${row.originalId}`, 'DELETE', { Authorization: getUserToken() },
      );

      openSnackBar(response.message, 'success');
      if (records.length > 1) {
        skip = (page * rowsPerPage);
      } else {
        skip = ((page - 1) * rowsPerPage);
        this.setState({ page: (page - 1) });
      }

      this.setState({ dialogLoading: false });
      this.handleRemoveDialogClose();
      this.loadTrainees(skip);
    } catch (err) {
      openSnackBar(err?.data?.message || err.message, 'error');
      this.setState({ dialogLoading: false });
    }
  }

  render() {
    const {
      isOpenAddDialog, isOpenEditDialog, isOpenDeleteDialog, dialogLoading,
      orderBy, order, page, rowsPerPage, deleteRow, editRow,
    } = this.state;
    const { openSnackBar } = this.context;
    const { traineeList: staticTraineeList, data: { error = {}, loading, getAllTrainees = {} } } = this.props;
    const { records = [], count = 0 } = getAllTrainees;
    const {
      handleSelect, handleSort, handlePageChange,
      handleEditDialogOpen, handleEditDialogClose, handleEditDialogSubmit,
      handleButtonClick, handleDialogSubmit, handleDialogClose,
      handleRemoveDialogOpen, handleRemoveDialogClose, handleRemoveDialogSubmit,
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

    const actions = [
      {
        icon: <Edit />,
        key: 'Edit',
        handler: handleEditDialogOpen,
      },
      {
        icon: <Delete />,
        key: 'Delete',
        handler: handleRemoveDialogOpen,
      },
    ];

    if (error.message) {
      openSnackBar(error.message, 'error');
    }

    return (
      <>
        <Grid container justify="flex-end">
          <Button variant="outlined" color="primary" onClick={handleButtonClick}>
            ADD TRAINEELIST
          </Button>
        </Grid>
        <Table
          id="trainee"
          loader={loading}
          dataLength={records.length}
          columns={columns}
          data={records}
          orderBy={orderBy}
          order={order}
          actions={actions}
          onSelect={handleSelect}
          onSort={handleSort}
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={handlePageChange}
        />
        <AddDialog
          open={isOpenAddDialog}
          loading={dialogLoading}
          onClose={handleDialogClose}
          onSubmit={(data) => { handleDialogSubmit(data); }}
        />
        <DeleteDialog
          open={isOpenDeleteDialog}
          row={deleteRow}
          loading={dialogLoading}
          onClose={handleRemoveDialogClose}
          onSubmit={(row) => { handleRemoveDialogSubmit(row); }}
        />
        <EditDialog
          open={isOpenEditDialog}
          row={editRow}
          loading={dialogLoading}
          onClose={handleEditDialogClose}
          onSubmit={(data, row) => { handleEditDialogSubmit(data, row); }}
        />
        <TraineeListField traineeList={staticTraineeList} />
      </>
    );
  }
}

TraineeList.propTypes = {
  traineeList: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

TraineeList.contextType = SharedSnackBarContextConsumer;

export default graphql(
  FETCH_TRAINEE, {
    options: {
      variables: {
        skip: 0, limit: 5,
      },
    },
  },
)(TraineeList);
