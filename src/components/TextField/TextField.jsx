import React from 'react';
import PropTypes from 'prop-types';
import TextFieldStyle from './style';
import { Error } from '../Error';

const TextField = (props) => {
  const {
    value,
    disabled,
    error,
    onChange,
    onBlur,
  } = props;

  return (
    <>
      <TextFieldStyle
        type="text"
        className={(error) ? 'error' : ''}
        value={value}
        disabled={(disabled)}
        onChange={onChange}
        onBlur={onBlur}
      />
      <Error error={error} />
    </>
  );
};

TextField.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

TextField.defaultProps = {
  value: '',
  disabled: false,
  error: undefined,
  onChange: () => {},
  onBlur: () => {},
};

export default TextField;
