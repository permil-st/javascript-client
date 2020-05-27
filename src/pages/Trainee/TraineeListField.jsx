import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@material-ui/core';
import PropTypes from 'prop-types';

const TraineeListField = (props) => {
  const { traineeList } = props;
  const { path } = useRouteMatch();
  const history = useHistory();

  return (
    <List>
      { (traineeList && traineeList.map((key) => (
        <ListItem
          button
          component="button"
          onClick={() => {
            history.push(`${path}/${key.id}`);
          }}
        >
          <ListItemText primary={key.name} />
        </ListItem>
      ))) || '' }
    </List>
  );
};

TraineeListField.propTypes = {
  traineeList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TraineeListField;
