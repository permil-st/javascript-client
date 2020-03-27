import React from 'react';
import * as yup from 'yup';
import propTypes from 'prop-types';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid,
} from '@material-ui/core';
import {
  Person, Email,
} from '@material-ui/icons';

import { PasswordField } from '../PasswordField';
import { TextFieldWithIcon } from '../TextFieldWithIcon';

const NAME = 'name';
const PASSWORD = 'password';
const EMAIL = 'email';
const CONFIRM_PASSWORD = 'confirmPassword';

class AddDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      [NAME]: this.getInitialState,
      [EMAIL]: this.getInitialState,
      [PASSWORD]: this.getInitialState,
      [CONFIRM_PASSWORD]: this.getInitialState,
    };
  }

  getInitialState = {
    isTouch: false,
    value: '',
    error: {},
  };

  getSchema = yup.object().shape({
    [NAME]: yup.object().shape({
      value: yup.string().required().matches(
        /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, 'Name must be a string',
      ).label('Name'),
    }),
    [EMAIL]: yup.object().shape({
      value: yup.string().required().email().label('Email'),
    }),
    [PASSWORD]: yup.object().shape({
      value: yup.string().required('Password is a required field').matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        'Must Contain 8 Characters, at least one uppercase letter, one lowercase letter, one number and one special character',
      ).label('Password'),
    }),
    [CONFIRM_PASSWORD]: yup.object().when([PASSWORD], (passwordValue, schema) => schema.shape({
      value: yup.string().required().oneOf([passwordValue.value, ''],
        'Confirm Password is must match').label('Confirm Password'),
    })),
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

  handlePasswordChange = (event) => {
    const { [PASSWORD]: passwordComponent } = this.state;
    const { value } = event.target;

    this.setState({
      [PASSWORD]: {
        ...passwordComponent,
        value,
      },
    }, () => {
      this.validate(PASSWORD);
      this.validate(CONFIRM_PASSWORD);
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
      [PASSWORD]: passwordComponent,
      [CONFIRM_PASSWORD]: confirmPasswordComponent,
    } = this.state;

    return (!!nameComponent.error.message)
    || (!!emailComponent.error.message)
    || (!!passwordComponent.error.message)
    || (!!confirmPasswordComponent.error.message);
  };

  isTouched = () => {
    const {
      [NAME]: nameComponent,
      [EMAIL]: emailComponent,
      [PASSWORD]: passwordComponent,
      [CONFIRM_PASSWORD]: confirmPasswordComponent,
    } = this.state;

    return nameComponent.isTouch
    && emailComponent.isTouch
    && passwordComponent.isTouch
    && confirmPasswordComponent.isTouch;
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
    const { open, onClose, onSubmit } = this.props;
    const { handleBlur, getError, handleChange } = this;

    const {
      [NAME]: name,
      [EMAIL]: email,
      [PASSWORD]: password,
      [CONFIRM_PASSWORD]: confirmPassword,
    } = this.state;

    return (
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle id="form-dialog-title">Add Trainee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your trainee details.
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

            <Grid container spacing={3}>
              <Grid item lg={6}>
                <PasswordField
                  error={!!getError(PASSWORD)}
                  id="password"
                  label="Password"
                  value={password.value}
                  onChange={this.handlePasswordChange}
                  onBlur={() => handleBlur(PASSWORD)}
                  helperText={getError(PASSWORD)}
                />
              </Grid>

              <Grid item lg={6}>
                <PasswordField
                  error={!!getError(CONFIRM_PASSWORD)}
                  id="confirmPassword"
                  label="Confirm Password"
                  value={confirmPassword.value}
                  onBlur={() => handleBlur(CONFIRM_PASSWORD)}
                  onChange={(event) => handleChange(event, CONFIRM_PASSWORD)}
                  helperText={getError(CONFIRM_PASSWORD)}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={(!this.isTouched()) || this.hasErrors()}
            onClick={() => {
              onSubmit({ name: name.value, email: email.value, password: password.value });
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

AddDialog.propTypes = {
  open: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  onSubmit: propTypes.func.isRequired,
};

export default AddDialog;
