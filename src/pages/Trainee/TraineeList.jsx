import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import { graphql } from '@apollo/react-hoc';
import { Mutation } from '@apollo/react-components';

import { FETCH_TRAINEE } from './query';
import { ADD_TRAINEE, DELETE_TRAINEE, UPDATE_TRAINEE } from './mutation';
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
      dialogLoading: false,
      isOpenAddDialog: false,
      isOpenEditDialog: false,
      isOpenDeleteDialog: false,
      deleteRow: {},
      editRow: {},
      orderBy: '',
      order: '',
      page: 0,
      rowsPerPage: 20,
    };
  }

  handleButtonClick = () => {
    this.setState({ isOpenAddDialog: true });
  };

  handleDialogClose = () => {
    this.setState({ isOpenAddDialog: false });
  };

  handleDialogSubmit = async (addTrainee, data) => {
    const { openSnackBar } = this.context;

    try {
      this.setState({ dialogLoading: true });

      await addTrainee({ variables: { ...data } });

      openSnackBar('operation successful', 'success');
      this.setState({ dialogLoading: false });
      this.handleDialogClose();
    } catch (err) {
      openSnackBar(err?.response?.data?.message || err.message, 'error');
      this.setState({ dialogLoading: false });
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
  }

  handleEditDialogOpen = (event, row) => {
    this.setState({ isOpenEditDialog: true, editRow: row });
  }

  handleEditDialogClose = () => {
    this.setState({ isOpenEditDialog: false });
  }

  handleEditDialogSubmit = async (updateTrainee, data, row) => {
    const { openSnackBar } = this.context;

    try {
      this.setState({ dialogLoading: true });

      await updateTrainee({
        variables: {
          ...data,
          id: row.originalId,
          password: 'Training@123',
        },
      });

      openSnackBar('operation successful', 'success');
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

  handleRemoveDialogSubmit = async (deleteTrainee, row) => {
    const { openSnackBar } = this.context;
    const { page, rowsPerPage } = this.state;
    const { data: { getAllTrainees: { records } } } = this.props;

    try {
      this.setState({ dialogLoading: true });

      await deleteTrainee({ variables: { id: row.originalId } });
      openSnackBar('operation successful', 'success');

      this.setState({ dialogLoading: false });

      if (records.length === 1) {
        this.handlePageChange(null, page - 1);
      }

      this.handleRemoveDialogClose();
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
    const {
      traineeList: staticTraineeList,
      data: { error = {}, loading, getAllTrainees = {} },
    } = this.props;
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

    const variables = { skip: rowsPerPage * page, limit: rowsPerPage };

    // if (count > 0 && (!((page + 1) * rowsPerPage) < count && (page * rowsPerPage) >= count)) {
    //   this.setState({ page: page - 1 });
    // }

    console.log(page);

    return (
      <>
        <Grid container justify="flex-end">
          <Button variant="outlined" color="primary" onClick={handleButtonClick}>
            ADD TRAINEELIST
          </Button>
        </Grid>
        <Mutation
          mutation={ADD_TRAINEE}
          refetchQueries={[{ query: FETCH_TRAINEE, variables }]}
        >
          { (addTrainee) => (
            <Mutation
              mutation={UPDATE_TRAINEE}
              refetchQueries={[{ query: FETCH_TRAINEE, variables }]}
            >
              {
                (updateTrainee) => (
                  <Mutation
                    mutation={DELETE_TRAINEE}
                    refetchQueries={[{ query: FETCH_TRAINEE, variables }]}
                  >
                    {
                      (deleteTrainee) => {
                        return (
                          <>
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
                              onSubmit={(data) => { handleDialogSubmit(addTrainee, data); }}
                            />
                            <DeleteDialog
                              open={isOpenDeleteDialog}
                              row={deleteRow}
                              loading={dialogLoading}
                              onClose={handleRemoveDialogClose}
                              onSubmit={(row) => { handleRemoveDialogSubmit(deleteTrainee, row); }}
                            />
                            <EditDialog
                              open={isOpenEditDialog}
                              row={editRow}
                              loading={dialogLoading}
                              onClose={handleEditDialogClose}
                              onSubmit={(data, row) => { handleEditDialogSubmit(updateTrainee, data, row); }}
                            />
                          </>
                        );
                      }
                    }
                  </Mutation>
                )
              }
            </Mutation>
          )}
        </Mutation>
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
      fetchPolicy: 'cache-and-network',
      variables: {
        skip: 0, limit: 20,
      },
    },
  },
)(TraineeList);
