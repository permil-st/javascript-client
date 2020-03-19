import React from 'react';
import PropTypes from 'prop-types';
import { RadioGroup } from '../RadioGroup';
import { Field } from '../Field';

const RadioGroupField = (props) => {
  const { label, radioOptions, ...otherProps } = props;

  return (radioOptions.length && (
    <>
      <Field label={label}>
        <RadioGroup
          options={radioOptions}
          {...otherProps}
        />
      </Field>
    </>
  )) || '';
};

RadioGroupField.propTypes = {
  label: PropTypes.string.isRequired,
  radioOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  error: PropTypes.string,
};

RadioGroupField.defaultProps = {
  error: undefined,
};


export default RadioGroupField;
