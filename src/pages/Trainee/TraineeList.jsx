import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button, List, ListItem, ListItemText, Grid,
} from '@material-ui/core';

import { AddDialog, Table } from './components';

const TraineeListField = (props) => {
  const { traineeList } = props;
  const { path } = useRouteMatch();

  return (
    <List>
      { (traineeList && traineeList.map((key) => (
        <ListItem button component="a" href={`${path}/${key.id}`}>
          <ListItemText primary={key.name} />
        </ListItem>
      ))) || '' }
    </List>
  );
};

TraineeListField.propTypes = {
  traineeList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

class TraineeList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      dialog: {},
    };
  }

  handleButtonClick = () => {
    this.setState({ isOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ isOpen: false });
  };

  handleDialogSubmit = (data) => {
    this.setState({ dialog: data }, () => {
      console.log(this.state.dialog);
    });
  };

  render() {
    const { isOpen } = this.state;
    const { traineeList } = this.props;
    const columns = [
      {
        field: 'name',
        align: 'center',
        label: 'Name',
      }, {
        field: 'email',
        label: 'E-mail',
      },
    ];

    return (
      <>
        <Grid container justify="flex-end">
          <Button variant="outlined" color="primary" onClick={this.handleButtonClick}>
            ADD TRAINEELIST
          </Button>
        </Grid>
        <Table id="trainee" columns={columns} data={traineeList} />
        <AddDialog
          open={isOpen}
          onClose={this.handleDialogClose}
          onSubmit={this.handleDialogSubmit}
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
