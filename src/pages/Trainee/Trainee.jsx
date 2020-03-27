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
    const { isOpen } = this.state;
    const { dialog } = this.state; // used state to remove unused state error
    console.log(dialog);

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
      </>
    );
  }
}

export default Trainee;
