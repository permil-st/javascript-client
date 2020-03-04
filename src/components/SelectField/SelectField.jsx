import React from 'react';
import PropTypes from 'prop-types';
import SelectFieldStyle from './style';

const SelectField = (props) => {
  const {
    value,
    disabled,
    error,
    onChange,
    defaultText,
    options,
  } = props;

  return (
    <>
      <SelectFieldStyle
        type="text"
        className={(error) ? 'error' : ''}
        value={value}
        disabled={(disabled)}
        onChange={onChange}
      >
        <option value="">{defaultText}</option>
        {
          options && options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))
        }
      </SelectFieldStyle>
      {
        error && (
          <p style={{ color: 'red' }}>{error}</p>
        )
      }
    </>
  );
};

SelectField.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func,
  defaultText: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })),
};

SelectField.defaultProps = {
  value: '',
  disabled: false,
  error: undefined,
  defaultText: 'Select',
  onChange: () => {},
  options: [],
};

export default SelectField;
