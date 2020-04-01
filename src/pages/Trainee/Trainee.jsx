import React from 'react';
import Button from '@material-ui/core/Button';

import { AddDialog } from './components';


class Trainee extends React.Component {
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
    const dialog = data;

    this.setState({ dialog }, (updatedData) => {
      console.log(updatedData.dialog);
    });
  };

  render() {
    const { isOpen, dialog } = this.state;

    console.log(dialog); // used state to remove unused state error

    return (
      <>
        <Button variant="outlined" color="primary" onClick={this.handleButtonClick}>
          Primary
        </Button>
        <AddDialog
          open={isOpen}
          onClose={this.handleDialogClose}
          onSubmit={this.handleDialogSubmit}
        />
      </>
    );
  }
}

export default Trainee;
