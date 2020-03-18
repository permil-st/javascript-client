import React from 'react';
import { Button, List, ListItem, ListItemText } from '@material-ui/core';
import PropTypes from 'prop-types';
import { AddDialog } from './components';

const BASE_PATH = `${window.location.href}/`;

const TraineeListField = (props) => {
  const { traineeList } = props;
  return (
    <List>
      { (traineeList && traineeList.map((key) => (
        <ListItem button component="a" href={`${BASE_PATH}${key.id}`}>
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

    console.log(this.props);

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

export default TraineeList;
