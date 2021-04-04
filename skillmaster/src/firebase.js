import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
require('dotenv').config()



const config ={

  apiKey : "AIzaSyDLhy8VliaAdx3vzIBvedWh5cD2eFAFZ14"    ,
  authDomain:"skillmaster-39e85.firebaseapp.com",
  databaseURL:process.env.REACT_APP_FIREBASE_DATABASEURL,
  projectId: "skillmaster-39e85",
  storageBucket:"skillmaster-39e85.appspot.com" ,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID

}

console.log(process.env.REACT_APP_FIREBASE_STORAGEBUCKET)
console.log( process.env.REACT_APP_FIREBASE_PROJECTID)
console.log(process.env.REACT_APP_FIREBASE_API_KEY)
firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
    auth.signInWithRedirect(provider);
  };