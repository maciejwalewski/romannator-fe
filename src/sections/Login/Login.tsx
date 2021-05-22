import React from 'react';

import s from './login.module.scss';

import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline, GoogleLogout } from 'react-google-login';
import { userDataVar } from 'apollo/vars';
import { useReactiveVar } from '@apollo/client';

export const Login = () => {
  const onSuccess = (info: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log('success info', info);
    userDataVar(info as GoogleLoginResponse);
  };

  const onLogoutSuccess = () => {
    userDataVar(null);
  };

  const onFailure = (info: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.error(info);
  };

  const userData = useReactiveVar(userDataVar);

  console.log('userData', userData);

  return (
    <div className={s.wrapper}>
      {userData ? (
        <GoogleLogout
          clientId={process.env.REACT_APP_OAUTH_CLIENT_ID as string}
          buttonText="Logout"
          onLogoutSuccess={onLogoutSuccess}
          icon={false}
          className={s.logoutWrapper}
        >
          <span className={s.logoutText}>Logout</span>
          <img className={s.avatarImage} src={userData?.profileObj?.imageUrl} />
        </GoogleLogout>
      ) : (
        <GoogleLogin
          clientId={process.env.REACT_APP_OAUTH_CLIENT_ID as string}
          buttonText="Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
        />
      )}
    </div>
  );
};
