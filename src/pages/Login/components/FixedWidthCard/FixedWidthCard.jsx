import React from 'react';
import PropTypes, { object } from 'prop-types';
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
  children: PropTypes.instanceOf(object),
};

FixedWidthCard.defaultProps = {
  children: (<></>),
};

export default FixedWidthCard;
