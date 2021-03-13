import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from 'apollo/client';
import { Map } from 'sections/Map';

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <Map />
    </ApolloProvider>
  );
};
