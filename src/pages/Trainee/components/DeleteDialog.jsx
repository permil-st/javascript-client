import React from 'react';
import propTypes from 'prop-types';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, CircularProgress,
} from '@material-ui/core';

const DeleteDialog = (props) => {
  const {
    open, onClose, onSubmit, row, loading,
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
          disabled={loading}
          onClick={() => {
            onSubmit(row);
          }}
          color="primary"
        >
          Submit
        </Button>
        { loading && (<CircularProgress />)}
      </DialogActions>
    </Dialog>
  );
};

DeleteDialog.propTypes = {
  open: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  loading: propTypes.bool,
  onSubmit: propTypes.func.isRequired,
  row: propTypes.objectOf(propTypes.object).isRequired,
};

DeleteDialog.defaultProps = {
  loading: false,
};

export default DeleteDialog;
