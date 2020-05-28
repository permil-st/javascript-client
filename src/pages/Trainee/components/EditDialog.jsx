import React from 'react';
import * as yup from 'yup';
import propTypes from 'prop-types';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@material-ui/core';
import {
  Person, Email,
} from '@material-ui/icons';

import { TextFieldWithIcon } from '../../components';

const NAME = 'name';
const EMAIL = 'email';
const NAME_REGEX = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const NAME_ERROR_MESSAGE = 'Name must be a string';

class EditDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: props.open,
      [NAME]: this.getInitialState,
      [EMAIL]: this.getInitialState,
    };
  }

  getInitialState = {
    isTouch: false,
    value: '',
    error: {},
  };


  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.open && (nextProps.open !== prevState.open)) {
      return {
        open: nextProps.open,
        name: {
          ...prevState.name,
          value: nextProps.row.name,
        },
        email: {
          ...prevState.name,
          value: nextProps.row.email,
        },
      };
    }

    return {
      open: nextProps.open,
    };
  }

  getSchema = yup.object().shape({
    [NAME]: yup.object().shape({
      value: yup.string().required().matches(NAME_REGEX, NAME_ERROR_MESSAGE).label('Name'),
    }),
    [EMAIL]: yup.object().shape({
      value: yup.string().required().email().label('Email'),
    }),
  });


  handleChange = (event, field) => {
    const { [field]: oldComponent } = this.state;
    const { value } = event.target;

    this.setState({
      [field]: {
        ...oldComponent,
        value,
      },
    }, () => {
      this.validate(field);
    });
  }

  handleBlur = (field) => {
    const { [field]: oldComponent } = this.state;

    this.setState({
      [field]: {
        ...oldComponent,
        isTouch: true,
      },
    }, () => {
      this.validate(field);
    });
  }

  hasErrors = () => {
    const {
      [NAME]: nameComponent,
      [EMAIL]: emailComponent,
    } = this.state;

    return (!!nameComponent.error.message)
    || (!!emailComponent.error.message);
  };

  isTouched = () => {
    const {
      [NAME]: nameComponent,
      [EMAIL]: emailComponent,
    } = this.state;

    return nameComponent.isTouch
    && emailComponent.isTouch;
  };

  getError = (field) => {
    const { [field]: component } = this.state;
    return (component.isTouch && component.error.message) || '';
  };

  validate = async (args) => {
    const { state } = this;
    try {
      await this.getSchema.validateAt(args, state);
      this.setState({
        [args]: {
          ...state[args],
          error: {},
        },
      });
    } catch (errors) {
      const { name, message } = errors;

      this.setState({
        [args]: {
          ...state[args],
          error: { name, message },
        },
      });
    }
  }

  render() {
    const {
      open, onClose, onSubmit, row,
    } = this.props;
    const { handleBlur, getError, handleChange } = this;
    const { [NAME]: name, [EMAIL]: email } = this.state;

    return (
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle id="form-dialog-title">Edit Trainee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your trainee details
          </DialogContentText>
          <form noValidate autoComplete="off">
            <TextFieldWithIcon
              error={!!getError(NAME)}
              autoFocus
              id="name"
              label="Name"
              type="text"
              value={name.value}
              onChange={(event) => handleChange(event, NAME)}
              onBlur={() => handleBlur(NAME)}
              fullWidth
              helperText={getError(NAME)}
              icon={Person}
            />

            <TextFieldWithIcon
              error={!!getError(EMAIL)}
              id="email"
              label="Email"
              type="email"
              value={email.value}
              onChange={(event) => handleChange(event, EMAIL)}
              onBlur={() => handleBlur(EMAIL)}
              fullWidth
              helperText={getError(EMAIL)}
              icon={Email}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSubmit({ name: name.value, email: email.value }, row);
              onClose();
            }}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

EditDialog.propTypes = {
  open: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  onSubmit: propTypes.func.isRequired,
  row: propTypes.objectOf(propTypes.object).isRequired,
};

export default EditDialog;
