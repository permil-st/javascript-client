import React from 'react';
import Button from '@material-ui/core/Button';

import { AddDialog } from './components';
import { Navbar } from '../components';
import DivWithPadding from './styles';


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
        <Navbar />
        <DivWithPadding>
          <>
            <Button variant="outlined" color="primary" onClick={this.handleButtonClick}>
              ADD TRAINEE
            </Button>
            <AddDialog
              open={isOpen}
              onClose={this.handleDialogClose}
              onSubmit={this.handleDialogSubmit}
            />
          </>
        </DivWithPadding>
      </>
    );
  }
}

export default Trainee;
