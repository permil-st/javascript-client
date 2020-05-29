import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Snackbar, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';

const SharedSnackBarContext = React.createContext();

const SnackBarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('success');

  const openSnackBar = (Message, Status) => {
    setOpen(true);
    setMessage(Message);
    setStatus(Status);
  };

  const closeSnackBar = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SharedSnackBarContext.Provider
      value={{
        openSnackBar, closeSnackBar,
      }}
    >
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        action={(
          <>
            <IconButton size="small" color="inherit" onClick={handleClose}>
              <Close fontSize="small" />
            </IconButton>
          </>
        )}
      >
        <Alert
          onClose={handleClose}
          variant="filled"
          severity={status}
        >
          {message}
        </Alert>
      </Snackbar>
      {children}
    </SharedSnackBarContext.Provider>
  );
};

SnackBarProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default SnackBarProvider;
export const SharedSnackBarContextConsumer = SharedSnackBarContext.Consumer;
