import firebase from 'firebase/compat/app';

import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyAe76q2Bl-s9S4gS2DmOfgQtPpjjt5hflQ",
    authDomain: "notes-93360.firebaseapp.com",
    databaseURL: "https://notes-93360-default-rtdb.firebaseio.com",
    projectId: "notes-93360",
    storageBucket: "notes-93360.appspot.com",
    messagingSenderId: "138665646265",
    appId: "1:138665646265:web:7d40ef20a76c46aca5e368"
  };

  firebase.initializeApp(firebaseConfig);
  const databaseRef = firebase.database().ref();
  export const notesRef = databaseRef.child("notes");
  export default firebase;