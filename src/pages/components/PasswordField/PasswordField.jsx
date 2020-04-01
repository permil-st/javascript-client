import React from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

class PasswordField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
    };
  }

  handlePasswordVisibilityToggle = () => {
    const { showPassword } = this.state;

    this.setState({ showPassword: !showPassword });
  };

  getVisibilityType = (showPassword) => (showPassword ? 'text' : 'password');

  getVisibilityIcon = (showPassword) => (showPassword ? <Visibility /> : <VisibilityOff />);


  render() {
    const {
      error, id, label, variant, value, onChange, onBlur, margin,
      helperText, fullWidth, adornment, adornmentPosition,
    } = this.props;
    const { getVisibilityType, getVisibilityIcon, handlePasswordVisibilityToggle } = this;
    const { showPassword } = this.state;

    return (
      <TextField
        error={error}
        id={id}
        label={label}
        variant={variant}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        margin={margin}
        InputProps={{
          [adornment]: (
            <InputAdornment position={adornmentPosition}>
              <IconButton
                aria-label="toggle password visibility"
                onClick={handlePasswordVisibilityToggle}
              >
                { getVisibilityIcon(showPassword)}
              </IconButton>
            </InputAdornment>
          ),
        }}
        type={getVisibilityType(showPassword)}
        helperText={helperText}
        fullWidth={fullWidth}
      />
    );
  }
}

PasswordField.propTypes = {
  error: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  variant: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  margin: PropTypes.string,
  helperText: PropTypes.string,
  fullWidth: PropTypes.bool,
  adornment: PropTypes.string,
  adornmentPosition: PropTypes.string,
};

PasswordField.defaultProps = {
  error: false,
  id: undefined,
  variant: 'outlined',
  value: undefined,
  onChange: () => {},
  onBlur: () => {},
  margin: 'normal',
  helperText: '',
  fullWidth: false,
  adornment: 'endAdornment',
  adornmentPosition: 'end',
};

export default PasswordField;
