import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button, List, ListItem, ListItemText,
} from '@material-ui/core';

import { AddDialog } from './components';

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
    const { isOpen } = this.state;

    this.setState({ isOpen: !isOpen });
  };

  handleDialogClose = () => {
    const { isOpen } = this.state;

    this.setState({ isOpen: !isOpen });
  };

  handleDialogSubmit = (data) => {
    let { dialog } = this.state;
    dialog = data;

    this.setState({ dialog }, (updatedData) => {
      console.log(updatedData.dialog);
    });
  };

  render() {
    const { isOpen } = this.state;
    const { traineeList } = this.props;

    return (
      <>
        <Button variant="contained" onClick={this.handleButtonClick}>
          Primary
        </Button>
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
