import { gql } from '@apollo/client';

export const GET_PUBLICATIONS_QUERY = gql`
  query {
    publications {
      id
      firstName
      description
      longitude
      latitude
    }
  }
`;
