import React from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@material-ui/core';

const TextFieldWithIcon = (props) => {
  const {
    error, id, label, variant, value, onChange, onBlur, margin,
    helperText, autoFocus, fullWidth, icon: Icon, type,
  } = props;

  return (
    <TextField
      error={error}
      autoFocus={autoFocus}
      fullWidth={fullWidth}
      id={id}
      type={type}
      label={label}
      variant={variant}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      margin={margin}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Icon />
          </InputAdornment>
        ),
      }}
      helperText={helperText}
    />
  );
};

TextFieldWithIcon.propTypes = {
  error: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  variant: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  margin: PropTypes.string,
  helperText: PropTypes.string,
  autoFocus: PropTypes.bool,
  fullWidth: PropTypes.bool,
  icon: PropTypes.objectOf(PropTypes.any).isRequired,
};

TextFieldWithIcon.defaultProps = {
  error: false,
  id: undefined,
  variant: 'outlined',
  value: undefined,
  onChange: () => {},
  onBlur: () => {},
  margin: 'normal',
  helperText: '',
  autoFocus: false,
  fullWidth: false,
};

export default TextFieldWithIcon;
