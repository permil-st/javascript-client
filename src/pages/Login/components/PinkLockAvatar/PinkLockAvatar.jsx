import React from 'react';
import { Avatar } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';

import useStyles from './styles';

const PinkLockAvatar = () => {
  const classes = useStyles();

  return (
    <Avatar className={classes.pink}>
      <LockIcon />
    </Avatar>
  );
};

export default PinkLockAvatar;
