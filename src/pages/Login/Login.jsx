import React from 'react';
import * as yup from 'yup';
import { Typography, Grid } from '@material-ui/core';
import { Email } from '@material-ui/icons';

import { FixedWidthCard, PinkLockAvatar, SignInButton } from './components';
import { PasswordField, TextFieldWithIcon } from '../components';
import { callApi, saveUser } from '../../lib';
import { SharedSnackBarContextConsumer } from '../../contexts';

const PASSWORD = 'password';
const EMAIL = 'email';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      [EMAIL]: this.getIntialState,
      [PASSWORD]: this.getIntialState,
      isLoading: false,
    };
  }

  getIntialState = {
    isTouch: false,
    value: '',
    error: {},
  }

  getSchema = yup.object().shape({
    [EMAIL]: yup.object().shape({
      value: yup.string().required().email().label('Email'),
    }),
    [PASSWORD]: yup.object().shape({
      value: yup.string().required().label('Password'),
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
  };

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
    const { [EMAIL]: emailComponent, [PASSWORD]: passwordComponent } = this.state;

    return (!!emailComponent.error.message) || (!!passwordComponent.error.message);
  };

  isTouched = () => {
    const { [EMAIL]: emailComponent, [PASSWORD]: passwordComponent } = this.state;

    return emailComponent.isTouch && passwordComponent.isTouch;
  };

  getError = (field) => {
    const { [field]: component } = this.state;
    return (component.isTouch && component.error.message) || '';
  };

  validate = async (args) => {
    const { state, getSchema } = this;
    try {
      await getSchema.validateAt(args, state);
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

  setLoginSuccess = (token) => {
    saveUser(token);
    this.props.history.push('/trainee');
  }

  handleSubmitClick = () => {
    const { [EMAIL]: { value: email }, [PASSWORD]: { value: password } } = this.state;
    this.setState({ isLoading: true });
    const data = callApi('user/login', 'POST', undefined, { email, password });
    data.then((token) => this.setLoginSuccess(token.data))
      .catch((err) => {
        const { openSnackBar } = this.context;
        openSnackBar(err?.response?.data?.message || err.message, 'error');
        this.setState({ isLoading: false });
      });
  };

  render() {
    const {
      [EMAIL]: email,
      [PASSWORD]: password,
      isLoading,
    } = this.state;
    const { getError, handleBlur, handleChange } = this;

    return (
      <FixedWidthCard>
        <>
          <Grid container direction="column" alignItems="center">
            <PinkLockAvatar />
            <Typography variant="h4">Login</Typography>
          </Grid>
          <form noValidate autoComplete="off">
            <TextFieldWithIcon
              error={!!getError(EMAIL)}
              autoFocus
              id="email"
              label="EMAIL"
              type="email"
              value={email.value}
              onChange={(event) => handleChange(event, EMAIL)}
              onBlur={() => handleBlur(EMAIL)}
              fullWidth
              helperText={getError(EMAIL)}
              icon={Email}
            />
            <PasswordField
              error={!!getError(PASSWORD)}
              id="Password"
              label="PASSWORD"
              value={password.value}
              onBlur={() => handleBlur(PASSWORD)}
              onChange={(event) => handleChange(event, PASSWORD)}
              helperText={getError(PASSWORD)}
              fullWidth
              adornment="startAdornment"
              adornmentPosition="start"
            />
          </form>
          <SignInButton
            isLoading={isLoading}
            onClick={this.handleSubmitClick}
            disabled={(isLoading) || (!this.isTouched()) || this.hasErrors()}
          />
        </>
      </FixedWidthCard>
    );
  }
}

Login.contextType = SharedSnackBarContextConsumer;

export default Login;
