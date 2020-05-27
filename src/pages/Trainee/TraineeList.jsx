import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

import { AddDialog } from './components';
import TraineeListField from './TraineeListField';

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

    return (
      <>
        <Button variant="outlined" color="primary" onClick={this.handleButtonClick}>
          ADD TRAINEE
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
