import React from 'react';
import PropTypes from 'prop-types';
import TextFieldStyle from './style';

const TextField = ({ value = '', disabled = false, error }) => (
  <div>
    <TextFieldStyle type="text" className={(error) ? 'error' : ''} value={value} disabled={(disabled)} />
    <p style={{ color: 'red' }}>{error}</p>
  </div>
);

TextField.propTypes = {
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
};

export default TextField;
