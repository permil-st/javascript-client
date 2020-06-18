import { gql } from 'apollo-boost';

const ADD_TRAINEE = gql`
  mutation addTrainee($name: String!, $email: String!, $password: String!) {
    createTrainee(payload : {
      name: $name,
      email: $email,
      password: $password,
    }) {
      name,
      email,
      role
    }
  }
`;

const UPDATE_TRAINEE = gql`
  mutation updateTrainee($id: ID!, $name: String!, $email: String!, $password: String!) {
    updateTrainee(id: $id, payload : {
      name: $name,
      email: $email,
      password: $password,
    })
  }
`;

const DELETE_TRAINEE = gql`
  mutation deleteTrainee($id: ID!) {
    deleteTrainee(id: $id)
  }
`;

export { ADD_TRAINEE, UPDATE_TRAINEE, DELETE_TRAINEE };
