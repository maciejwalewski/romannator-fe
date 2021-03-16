import { gql } from '@apollo/client';

export const ADD_PUBLICATION_MUTATION = gql`
  mutation AddPublication($firstName: String!, $description: String!, $longitude: String!, $latitude: String!) {
    addPublication(
      addPublicationData: {
        firstName: $firstName
        description: $description
        longitude: $longitude
        latitude: $latitude
      }
    ) {
      firstName
      description
      longitude
      latitude
    }
  }
`;
