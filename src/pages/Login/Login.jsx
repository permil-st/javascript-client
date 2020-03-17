import React from 'react';
import * as yup from 'yup';
import propTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/Lock';
import { makeStyles } from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import EmailIcon from '@material-ui/icons/Email';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Grid from '@material-ui/core/Grid';

const PASSWORD = 'password';
const EMAIL = 'email';

const useStyles = makeStyles((theme) => ({
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
  iconButton: {
    padding: '0px',
  },
  submitButton: {
    'margin-top': '24px',
  },
  cardContent: {
    padding: '24px',
  },
  card: {
    width: '400px',
  },
}));

const MyTogglePasswordButton = (props) => {
  const classes = useStyles();
  const { children, onClick } = props;

  return (
    <IconButton
      className={classes.iconButton}
      onClick={onClick}
      aria-label="toggle password visibility"
    >
      {
        children()
      }
    </IconButton>
  );
};

MyTogglePasswordButton.propTypes = {
  children: propTypes.func,
  onClick: propTypes.func,
};

MyTogglePasswordButton.defaultProps = {
  children: () => {},
  onClick: () => {},
};

const PinkLockAvatar = () => {
  const classes = useStyles();

  return (
    <Avatar className={classes.pink}>
      <LockIcon />
    </Avatar>
  );
};

const FixedWidthCard = (props) => {
  const classes = useStyles();
  const { children } = props;

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        {
          children()
        }
      </CardContent>
    </Card>
  );
};

FixedWidthCard.propTypes = {
  children: propTypes.func,
};

FixedWidthCard.defaultProps = {
  children: () => {},
};

const SubmitButton = (props) => {
  const classes = useStyles();
  const { onClick, disabled } = props;

  return (
    <Button
      className={classes.submitButton}
      variant="contained"
      fullWidth
      onClick={onClick}
      disabled={disabled}
    >
      Submit
    </Button>
  );
};

SubmitButton.propTypes = {
  onClick: propTypes.func,
  disabled: propTypes.bool,
};

SubmitButton.defaultProps = {
  onClick: () => {},
  disabled: false,
};

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
    };
  }

  getSchema = () => yup.object().shape({
    [EMAIL]: yup.object().shape({
      value: yup.string().required().email().label('Email'),
    }),
    [PASSWORD]: yup.object().shape({
      value: yup.string().required().label('Password'),
    }),
  });

  getVisibilityType = (showPassword) => (showPassword ? 'text' : 'password')

  getVisibilityIcon = (showPassword) => (showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />)

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

  handlePasswordVisibilityToggle = () => {
    const { [PASSWORD]: password } = this.state;
    password.showPassword = !password.showPassword;
    this.setState({ password });
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

  handleSubmitClick = () => {
    //
  };

  render() {
    const {
      [EMAIL]: email,
      [PASSWORD]: password,
    } = this.state;

    return (
      <FixedWidthCard>
        {
          () => (
            <>
              <Grid container direction="column" alignItems="center">
                <PinkLockAvatar />
                <Typography variant="h4">Login</Typography>
              </Grid>
              <form noValidate autoComplete="off">
                <TextField
                  error={!!this.getError(EMAIL)}
                  autoFocus
                  id="email"
                  label="EMAIL"
                  type="text"
                  variant="outlined"
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
                />

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
                    startAdornment: (
                      <InputAdornment position="start">
                        <MyTogglePasswordButton
                          onClick={this.handlePasswordVisibilityToggle}
                        >
                          { () => (
                            this.getVisibilityIcon(password.showPassword)
                          )}
                        </MyTogglePasswordButton>
                      </InputAdornment>
                    ),
                  }}
                  type={this.getVisibilityType(password.showPassword)}
                  helperText={this.getError(PASSWORD)}
                  fullWidth
                />
              </form>
              <SubmitButton
                onClick={this.handleButtonClick}
                disabled={(!this.isTouched()) || this.hasErrors()}
              />
            </>
          )
        }
      </FixedWidthCard>
    );
  }
}

export default Login;
