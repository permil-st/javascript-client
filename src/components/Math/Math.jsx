import React from 'react';
import PropTypes from 'prop-types';

const dafaultTemplate = (args) => {
  const {
    first,
    second,
    operator,
    result,
  } = args;

  return (
    <p>
      {`${first} ${operator} ${second} = `}
      <b>{result}</b>
    </p>
  );
};

const calculate = (first, second, operator) => {
  const validOperations = {
    '+': first + second,
    '-': first - second,
    '*': first * second,
    '/': first / second,
  };

  if (validOperations[operator] === undefined) {
    throw new Error('Invalid Operator');
  }

  return validOperations[operator];
};

const Math = (props) => {
  const {
    first,
    second,
    operator,
    children,
  } = props;

  let result;
  try {
    result = calculate(first, second, operator);
  } catch (error) {
    console.error(error);
    return (<p>{error.message}</p>);
  }

  const args = {
    first,
    second,
    operator,
    result,
  };

  return (
    <div>
      {
        (children) ? children(args) : dafaultTemplate(args)
      }
    </div>
  );
};

Math.propTypes = {
  first: PropTypes.number.isRequired,
  second: PropTypes.number.isRequired,
  operator: PropTypes.string.isRequired,
  children: PropTypes.func,
};

Math.defaultProps = {
  children: undefined,
};

export default Math;
