import * as firebase from "firebase";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyCkXSfbk3a6LpdTUwvQrainQQ9PMAeWEO4",
  authDomain: "digitalvisitorregister.firebaseapp.com",
  databaseURL: "https://digitalvisitorregister.firebaseio.com",
  projectId: "digitalvisitorregister",
  storageBucket: "digitalvisitorregister.appspot.com",
  messagingSenderId: "955851912111"
});
//   firebase.initializeApp(firebaseConfig);

export default firebaseConfig;
