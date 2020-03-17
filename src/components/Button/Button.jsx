import React from 'react';
import PropTypes from 'prop-types';
import ButtonStyle from './style';

const Button = (props) => {
  const {
    value,
    color,
    style,
    disabled,
    onClick,
  } = props;

  return (
    <ButtonStyle
      value={value}
      color={color}
      style={style}
      disabled={disabled}
      onClick={onClick}
    >
      {value}
    </ButtonStyle>
  );
};

Button.propTypes = {
  color: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.string),
  value: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  color: 'primary',
  style: {},
  value: '',
  disabled: false,
  onClick: () => {},
};

export default Button;
