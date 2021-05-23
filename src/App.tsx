import 'antd/dist/antd.css';
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from 'apollo/client';
import { Map } from 'sections/Map/Map';
import { Chat } from 'sections/Chat/Chat';
import 'services/firebase';
import s from './app.module.scss';
import { LoginRestricted } from 'components/LoginRestricted';

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <main className={s.main}>
        <Map />
        <LoginRestricted>
          <Chat />
        </LoginRestricted>
      </main>
    </ApolloProvider>
  );
};
