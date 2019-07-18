import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyB4j-l8qFPJPuHCe46a7dzGNpvX175w_Ws",
  authDomain: "react-weather-forecast-294e6.firebaseapp.com",
  databaseURL: "https://react-weather-forecast-294e6.firebaseio.com",
  projectId: "react-weather-forecast-294e6",
  storageBucket: "react-weather-forecast-294e6.appspot.com",
  messagingSenderId: "689765787813",
  appId: "1:689765787813:web:80ddb1a3fc16ebf9"
};
const Firebase = firebase.initializeApp(config);

export default Firebase;
