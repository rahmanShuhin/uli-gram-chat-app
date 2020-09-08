import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBLZ7WjNP2yW29HotYH0iqK6YmH7yyRjvE",
  authDomain: "uli-gram-chat.firebaseapp.com",
  databaseURL: "https://uli-gram-chat.firebaseio.com",
  projectId: "uli-gram-chat",
  storageBucket: "uli-gram-chat.appspot.com",
  messagingSenderId: "827526248213",
  appId: "1:827526248213:web:23d3f2b776970566e29b1c",
  measurementId: "G-NGPNKHMZHF",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.FacebookAuthProvider();
export { auth, provider, storage };
export default db;
