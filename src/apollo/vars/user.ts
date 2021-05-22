import { makeVar } from '@apollo/client';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

export const userDataVar = makeVar<GoogleLoginResponse | null>(null);
