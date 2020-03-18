import React from 'react';
import PropTypes from 'prop-types';
import { CardContent, Card, CardMedia, Typography } from '@material-ui/core';
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { getDateFormatted } from '../../lib';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  cover: {
    width: '150px',
  },
});

const TraineeDetail = (props) => {
  const { traineeId } = useParams();
  const { traineeList } = props;
  const classes = useStyles();

  const trainee = traineeList.filter((element) => {
    return element.id === traineeId;
  })[0];

  const { image, name, email, createdAt } = trainee;

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={image ? image : '/images/defaultThumbnail.png'}
        title="Thumbnail"
      />
      <CardContent>
        <div>
          <Typography variant="h5">{name}</Typography>
          <Typography variant="body2">{getDateFormatted(createdAt)}</Typography>
          <Typography variant="body2">{email}</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

TraineeDetail.propTypes = {
  traineeList: PropTypes.arrayOf(PropTypes.object),
};

export default TraineeDetail;
