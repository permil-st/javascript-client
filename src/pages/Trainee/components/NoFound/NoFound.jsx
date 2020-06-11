import React from 'react';
import { Typography, Grid } from '@material-ui/core/';

import useStyles from './styles';

const NoMatch = () => {
  const classes = useStyles();
  return (
    <Grid container direction="column" alignItems="center" className={classes.container}>
      <Typography variant="h3">
        Not Found
      </Typography>
      <Typography variant="body1">
        Seems like the page you are looking after does not exist
      </Typography>
    </Grid>
  );
};

export default NoMatch;
