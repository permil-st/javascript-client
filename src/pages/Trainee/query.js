import { gql } from 'apollo-boost';

const FETCH_TRAINEE = gql`
  query getAllTrainee($skip: Int, $limit: Int) {
    getAllTrainees(skip: $skip, limit: $limit) {
      records {
        name,
        email,
        role,
        createdAt,
        originalId,
      }
      count,
    }
  }
`;

export { FETCH_TRAINEE };
