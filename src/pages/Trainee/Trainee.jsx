import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import TraineeList from './TraineeList';
import { TraineeDetail } from './TraineeDetail';
import traineeListData from './data/trainee';

const Trainee = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route
        exact
        path={path}
        render={(props) => <TraineeList {...props} traineeList={traineeListData} />} // eslint-disable-line
      />
      <Route
        path={`${path}/:traineeId`}
        render={(props) => <TraineeDetail {...props} traineeList={traineeListData} />} // eslint-disable-line
      />
    </Switch>
  );
};

export default Trainee;
