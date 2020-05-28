import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@material-ui/core';

import useStyles from './styles';

const FixedWidthCard = (props) => {
  const classes = useStyles();
  const { children } = props;

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        {children}
      </CardContent>
    </Card>
  );
};

FixedWidthCard.propTypes = {
  children: PropTypes.objectOf(PropTypes.any),
};

FixedWidthCard.defaultProps = {
  children: (<></>),
};

export default FixedWidthCard;
