import firebase from "firebase";
const firebaseApp = firebase.initializeApp ({
    apiKey: "AIzaSyBZYmmKnInyFLzjMtkpwYXVw6V0LMMIOvQ",
    authDomain: "instagram-clone-ad957.firebaseapp.com",
    databaseURL: "https://instagram-clone-ad957.firebaseio.com",
    projectId: "instagram-clone-ad957",
    storageBucket: "instagram-clone-ad957.appspot.com",
    messagingSenderId: "839919146024",
    appId: "1:839919146024:web:ea1e0ccd5f9dab9162911d",
    measurementId: "G-BNC7SSJSSE"
  });


  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const storage=firebase.storage();


  export {db,auth,storage};