import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_FIREBASE_API_KEY,
  authDomain: 'romannator-fe.firebaseapp.com',
  databaseURL: 'https://romannator-fe-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'romannator-fe',
  storageBucket: 'romannator-fe.appspot.com',
  messagingSenderId: '58796700319',
  appId: process.env.REACT_FIREBASE_APP_ID,
};
// Initialize Firebase
firebase.initializeApp(config);

export const rtDatabase = firebase.database();

export const globalMsgs = rtDatabase.ref('globalMessages');
