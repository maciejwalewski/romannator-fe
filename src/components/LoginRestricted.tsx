import { useReactiveVar } from '@apollo/client';
import { userDataVar } from 'apollo/vars';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const LoginRestricted = ({ children }: Props) => {
  const userData = useReactiveVar(userDataVar);

  if (userData === null) {
    return null;
  }

  return <>{children}</>;
};
