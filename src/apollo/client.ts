import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const link = createHttpLink({
  uri: 'http://localhost:5000/graphql/',
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});
