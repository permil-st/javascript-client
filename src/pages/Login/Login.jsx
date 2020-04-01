import React from 'react';
import * as yup from 'yup';
import {
  Typography, Grid,
} from '@material-ui/core';
import { Email } from '@material-ui/icons';

import { FixedWidthCard, PinkLockAvatar, SignInButton } from './components';
import { PasswordField, TextFieldWithIcon } from '../components';

const PASSWORD = 'password';
const EMAIL = 'email';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      [EMAIL]: this.getIntialState,
      [PASSWORD]: this.getIntialState,
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

  handleSubmitClick = () => {
    //
  };

  render() {
    const {
      [EMAIL]: email,
      [PASSWORD]: password,
    } = this.state;
    const { getError, handleBlur, handleChange } = this;

    return (
      <Grid container direction="row" justify="center" alignItems="center" style={{ height: '100vh' }}>
        <FixedWidthCard>
          {
            () => (
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
                  onClick={this.handleButtonClick}
                  disabled={(!this.isTouched()) || this.hasErrors()}
                />
              </>
            )
          }
        </FixedWidthCard>
      </Grid>
    );
  }
}

export default Login;
