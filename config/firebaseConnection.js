// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"; //firebase

import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClzmsKrgQuvofCrh4B_Vvm38_1NjSxmps",
  authDomain: "appcrudreact.firebaseapp.com",
  projectId: "appcrudreact",
  storageBucket: "appcrudreact.appspot.com",
  messagingSenderId: "183689205861",
  appId: "1:183689205861:web:2069118fb6ce5fd84e0e8c"
};

// Initialize Firebase
if(!firebase.apps.length){

  firebase.initializeApp(firebaseConfig);
}
firebase.firestore();
export default firebase 