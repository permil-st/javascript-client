import { gql } from 'apollo-boost';

const UPDATE_TRAINEE_SUB = gql`
  subscription {
    updateTrainee {
      originalId
      name
      email
      password
    }
  }
`;

const DELETE_TRAINEE_SUB = gql`
  subscription {
    deleteTrainee
  }
`;

export { UPDATE_TRAINEE_SUB, DELETE_TRAINEE_SUB };
