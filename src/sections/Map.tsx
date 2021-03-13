import React, { useEffect } from 'react';
import s from './map.module.scss';
import { useLazyQuery, gql } from '@apollo/client';

export const Map = () => {
  const [getCity, { data, loading, error }] = useLazyQuery(gql`
    query {
      publications {
        id
        firstName
        description
        coordinates
      }
    }
  `);

  const test = () => {
    getCity();
  };

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  return <button onClick={() => test()}>test button</button>;
};
