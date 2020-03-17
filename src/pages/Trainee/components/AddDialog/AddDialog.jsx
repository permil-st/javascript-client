import React from 'react';
import * as yup from 'yup';
import propTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

const NAME = 'name';
const PASSWORD = 'password';
const EMAIL = 'email';
const CONFIRM_PASSWORD = 'confirmPassword';

class AddDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      [NAME]: {
        isTouch: false,
        value: '',
        error: {},
      },
      [EMAIL]: {
        isTouch: false,
        value: '',
        error: {},
      },
      [PASSWORD]: {
        isTouch: false,
        showPassword: false,
        value: '',
        error: {},
      },
      [CONFIRM_PASSWORD]: {
        isTouch: false,
        showPassword: false,
        value: '',
        error: {},
      },
    };
  }

  getSchema = () => yup.object().shape({
    [NAME]: yup.object().shape({
      value: yup.string().required('Name is a required field').matches(
        /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
        'Name must be valid',
      ),
    }),
    [EMAIL]: yup.object().shape({
      value: yup.string().required('Email is a required field').email('Email must be valid'),
    }),
    [PASSWORD]: yup.object().shape({
      value: yup.string().required('Password is a required field').matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        'Must Contain 8 Characters, at least one uppercase letter, one lowercase letter, one number and one special character',
      ),
    }),
    [CONFIRM_PASSWORD]: yup.object().when([PASSWORD], (passwordValue, schema) => schema.shape({
      value: yup.string().required('Confirm Password is a required field').oneOf([passwordValue.value, ''], 'Must Match Password'),
    })),
  });


  handleNameChange = (event) => {
    const { [NAME]: nameComponent } = this.state;
    const { value } = event.target;
    nameComponent.value = value;
    this.setState({ [NAME]: nameComponent }, () => {
      this.validate(NAME);
    });
  }

  handleEmailChange = (event) => {
    const { [EMAIL]: emailComponent } = this.state;
    const { value } = event.target;
    emailComponent.value = value;
    this.setState({ [EMAIL]: emailComponent }, () => {
      this.validate(EMAIL);
    });
  }

  handlePasswordChange = (event) => {
    const { [PASSWORD]: passwordComponent } = this.state;
    const { value } = event.target;
    passwordComponent.value = value;
    this.setState({ [PASSWORD]: passwordComponent }, () => {
      this.validate(PASSWORD);
      this.validate(CONFIRM_PASSWORD);
    });
  }

  handleConfirmPasswordChange = (event) => {
    const { [CONFIRM_PASSWORD]: confirmPasswordComponent } = this.state;
    const { value } = event.target;
    confirmPasswordComponent.value = value;
    this.setState({ [CONFIRM_PASSWORD]: confirmPasswordComponent }, () => {
      this.validate(CONFIRM_PASSWORD);
    });
  }

  handleNameBlur = () => {
    const { [NAME]: nameComponent } = this.state;
    nameComponent.isTouch = true;
    this.setState({ [NAME]: nameComponent }, () => {
      this.validate(NAME);
    });
  }

  handleEmailBlur = () => {
    const { [EMAIL]: emailComponent } = this.state;
    emailComponent.isTouch = true;
    this.setState({ [EMAIL]: emailComponent }, () => {
      this.validate(EMAIL);
    });
  }

  handlePasswordBlur = () => {
    const { [PASSWORD]: passwordComponent } = this.state;
    passwordComponent.isTouch = true;
    this.setState({ [PASSWORD]: passwordComponent }, () => {
      this.validate(PASSWORD);
    });
  }

  handleConfirmPasswordBlur = () => {
    const { [CONFIRM_PASSWORD]: confirmPasswordComponent } = this.state;
    confirmPasswordComponent.isTouch = true;
    this.setState({ [CONFIRM_PASSWORD]: confirmPasswordComponent }, () => {
      this.validate(CONFIRM_PASSWORD);
    });
  }

  handlePasswordVisibilityToggle = () => {
    const { [PASSWORD]: password } = this.state;
    password.showPassword = !password.showPassword;
    this.setState({ password });
  }

  handleConfirmPasswordVisibilityToggle = () => {
    const { [CONFIRM_PASSWORD]: confirmPassword } = this.state;
    confirmPassword.showPassword = !confirmPassword.showPassword;
    this.setState({ confirmPassword });
  }

  getVisibilityType = (showPassword) => (showPassword ? 'text' : 'password')

  getVisibilityIcon = (showPassword) => (showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />)

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
    return (component.isTouch && component.error.message);
  };

  validate = async (args) => {
    const { state } = this;
    try {
      await this.getSchema().validateAt(args, state);
      state[args].error = {};
      this.setState({ state });
    } catch (errors) {
      const { name, message } = errors;
      state[args].error = { name, message };
      this.setState({ state });
    }
  }

  render() {
    const { open, onClose, onSubmit } = this.props;

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
            <TextField
              error={!!this.getError(NAME)}
              autoFocus
              id="name"
              label="Name"
              type="text"
              variant="outlined"
              value={name.value}
              onChange={this.handleNameChange}
              onBlur={this.handleNameBlur}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
              helperText={this.getError(NAME)}
            />

            <TextField
              error={!!this.getError(EMAIL)}
              id="email"
              label="Email"
              type="email"
              value={email.value}
              onChange={this.handleEmailChange}
              onBlur={this.handleEmailBlur}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
              helperText={this.getError(EMAIL)}
              variant="outlined"
            />

            <Grid container spacing={3}>
              <Grid item lg={6}>
                <TextField
                  error={!!this.getError(PASSWORD)}
                  id="password"
                  label="Password"
                  variant="outlined"
                  value={password.value}
                  onChange={this.handlePasswordChange}
                  onBlur={this.handlePasswordBlur}
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={this.handlePasswordVisibilityToggle}
                        >
                          { this.getVisibilityIcon(password.showPassword)}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  type={this.getVisibilityType(password.showPassword)}
                  helperText={this.getError(PASSWORD)}
                />
              </Grid>

              <Grid item lg={6}>
                <TextField
                  error={!!this.getError(CONFIRM_PASSWORD)}
                  id="confirmPassword"
                  label="Confirm Password"
                  variant="outlined"
                  value={confirmPassword.value}
                  onBlur={this.handleConfirmPasswordBlur}
                  onChange={this.handleConfirmPasswordChange}
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={this.handleConfirmPasswordVisibilityToggle}
                        >
                          { this.getVisibilityIcon(confirmPassword.showPassword)}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  type={this.getVisibilityType(confirmPassword.showPassword)}
                  helperText={this.getError(CONFIRM_PASSWORD)}
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
