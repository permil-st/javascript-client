import React from 'react';
import PropTypes from 'prop-types';
import RadioGroupStyle from './style';

const RadioGroup = (props) => {
  const {
    value,
    groupName,
    disabled,
    error,
    onChange,
    options,
  } = props;

  return (
    <>
      {
        options && options.map((option) => (
          <div key={option.value}>
            <RadioGroupStyle
              id={option.value}
              type="radio"
              value={option.value}
              checked={value === option.value}
              name={groupName}
              className={(error) ? 'error' : ''}
              disabled={(disabled)}
              onChange={onChange}
            />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        ))
      }
      {
        error && (
          <p style={{ color: 'red' }}>{error}</p>
        )
      }
    </>
  );
};

RadioGroup.propTypes = {
  value: PropTypes.string,
  groupName: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })),
};

RadioGroup.defaultProps = {
  value: '',
  groupName: '',
  disabled: false,
  error: undefined,
  onChange: () => {},
  options: [],
};

export default RadioGroup;
