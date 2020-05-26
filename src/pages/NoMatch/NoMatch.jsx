import React from 'react';
import { Typography, Grid } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
  container: {
    margin: '100px 0px',
  },
});

const NoMatch = () => {
  const classes = useStyle();
  return (
    <Grid container direction="column" alignItems="center" className={classes.container}>
      <Typography variant="h3">
        Not Match
      </Typography>
      <Typography variant="body1">
        Seems like the page you are looking after does not exist
      </Typography>
    </Grid>
  );
};

export default NoMatch;
