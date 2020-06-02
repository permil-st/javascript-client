import React from 'react';
import { Typography, CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';

const withLoaderAndMessage = (WrapperedComponent) => {
  const HOC = ({ loader, dataLength, ...rest }) => {
    if (loader) {
      return (<CircularProgress />);
    }

    if (dataLength === 0) {
      return (<Typography>OOPS! No More Trainees</Typography>);
    }
    return (<WrapperedComponent {...rest}/>);  // eslint-disable-line
  };

  HOC.propTypes = {
    loader: PropTypes.bool,
    dataLength: PropTypes.number,
  };

  HOC.defaultProps = {
    loader: true,
    dataLength: 0,
  };

  return HOC;
};

export default withLoaderAndMessage;
