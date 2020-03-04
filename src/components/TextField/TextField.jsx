import React from 'react';
import PropTypes from 'prop-types';
import TextFieldStyle from './style';

const TextField = (props) => {
  const {
    value,
    disabled,
    error,
    onChange,
  } = props;

  return (
    <>
      <TextFieldStyle
        type="text"
        className={(error) ? 'error' : ''}
        value={value}
        disabled={(disabled)}
        onChange={onChange}
      />
      {
        error && (
          <p style={{ color: 'red' }}>{error}</p>
        )
      }
    </>
  );
};

TextField.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func,
};

TextField.defaultProps = {
  value: '',
  disabled: false,
  error: undefined,
  onChange: () => {},
};

export default TextField;
