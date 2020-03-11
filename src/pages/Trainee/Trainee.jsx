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
    let { dialog } = this.state;
    dialog = data;

    this.setState({ dialog }, (updatedData) => {
      console.log(updatedData.dialog);
    });
  };

  render() {
    const { isOpen } = this.state;

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
