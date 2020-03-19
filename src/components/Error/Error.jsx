import React from 'react';
import PropTypes from 'prop-types';
import ErrorStyle from './style';

const Error = (props) => {
  const { error } = props;

  return (
    <ErrorStyle>{error}</ErrorStyle>
  );
};

Error.propTypes = {
  error: PropTypes.string,
};

Error.defaultProps = {
  error: undefined,
};

export default Error;
