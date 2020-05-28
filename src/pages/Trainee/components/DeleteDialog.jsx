import React from 'react';
import propTypes from 'prop-types';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@material-ui/core';

const DeleteDialog = (props) => {
  const {
    open, onClose, onSubmit, row,
  } = props;
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle id="form-dialog-title">Remove Trainee</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you really want to remove the trainee?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onSubmit(row);
            onClose();
          }}
          color="primary"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteDialog.propTypes = {
  open: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  onSubmit: propTypes.func.isRequired,
  row: propTypes.instanceOf(propTypes.object).isRequired,
};

export default DeleteDialog;
