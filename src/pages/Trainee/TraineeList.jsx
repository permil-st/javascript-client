import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

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
      dialog: {},
      orderBy: '',
      order: '',
      count: 100,
      page: 0,
      rowsPerPage: 20,
    };
  }

  componentDidMount() {
    this.loadTrainees(0);
  }

  loadTrainees = async (skip) => {
    const { openSnackBar } = this.context;
    const { rowsPerPage, loading } = this.state;

    if (!loading) {
      this.setState({ loading: true });
    }

    try {
      const response = await callApi(`trainee?skip=${skip}&limit=${rowsPerPage}`, 'GET', { 'Content-Type': 'application/json', Authorization: getUserToken() });
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
      openSnackBar(err.data.message, 'error');
    }
  }

  handleButtonClick = () => {
    this.setState({ isOpenAddDialog: true });
  };

  handleDialogClose = () => {
    this.setState({ isOpenAddDialog: false });
  };

  handleDialogSubmit = (data) => {
    const { dialog, page, rowsPerPage } = this.state;
    const { openSnackBar } = this.context;

    this.setState({ dialogLoading: true });

    this.setState({ dialog: data });
    callApi('trainee', 'POST', { Authorization: getUserToken() }, data)
      .then((response) => {
        openSnackBar(response.message, 'success');
        this.setState({ dialogLoading: false });
        this.handleDialogClose();
        this.loadTrainees(page * rowsPerPage);
      })
      .catch((err) => {
        openSnackBar(err.data.message, 'error');
        this.setState({ dialogLoading: false });
      });
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
    this.setState({ page });
    this.loadTrainees((page) * rowsPerPage);
  }

  handleEditDialogOpen = (event, row) => {
    this.setState({ isOpenEditDialog: true, editRow: row });
  }

  handleEditDialogClose = () => {
    this.setState({ isOpenEditDialog: false });
  }

  handleEditDialogSubmit = (data, row) => {
    const { openSnackBar } = this.context;
    const { page, rowsPerPage } = this.state;

    console.log('Data Modified');
    this.setState({ dialogLoading: true });

    callApi(`trainee`, 'PUT', { Authorization: getUserToken() }, {...data, id: row.originalId})
      .then((response) => {
        openSnackBar(response.message, 'success');
        this.loadTrainees(page * rowsPerPage);
        this.setState({ dialogLoading: false });
        this.handleEditDialogClose();
      })
      .catch((err) => {
        openSnackBar(err.data.message, 'error');
        this.setState({ dialogLoading: false });
      });
  }

  handleRemoveDialogOpen = (event, row) => {
    this.setState({ isOpenDeleteDialog: true, deleteRow: row });
  }

  handleRemoveDialogClose = () => {
    this.setState({ isOpenDeleteDialog: false });
  }

  handleRemoveDialogSubmit = (row) => {
    const { openSnackBar } = this.context;
    const { page, rowsPerPage, records } = this.state;
    let skip = 0;
    console.log('Data Removed');
    this.setState({ dialogLoading: true });

    callApi(`trainee/${row.originalId}`, 'DELETE', { Authorization: getUserToken() })
      .then((response) => {
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
      })
      .catch((err) => {
        openSnackBar(err.data.message, 'error');
        this.setState({ dialogLoading: false });
      });
  }

  render() {
    const {
      isOpenAddDialog, isOpenEditDialog, isOpenDeleteDialog, loading, dialogLoading,
      orderBy, order, count, page, rowsPerPage, deleteRow, editRow, records,
    } = this.state;
    const { traineeList: staticTraineeList } = this.props;
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
          onSubmit={handleDialogSubmit}
        />
        <DeleteDialog
          open={isOpenDeleteDialog}
          row={deleteRow}
          loading={dialogLoading}
          onClose={handleRemoveDialogClose}
          onSubmit={handleRemoveDialogSubmit}
        />
        <EditDialog
          open={isOpenEditDialog}
          row={editRow}
          loading={dialogLoading}
          onClose={handleEditDialogClose}
          onSubmit={handleEditDialogSubmit}
        />
        <TraineeListField traineeList={staticTraineeList} />
      </>
    );
  }
}

TraineeList.propTypes = {
  traineeList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

TraineeList.contextType = SharedSnackBarContextConsumer;

export default TraineeList;
