// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhGvfgJmNc6GwOe6N5lnXfviJnek3PPZE",
  authDomain: "fir-react-45e17.firebaseapp.com",
  projectId: "fir-react-45e17",
  storageBucket: "fir-react-45e17.appspot.com",
  messagingSenderId: "962226171340",
  appId: "1:962226171340:web:b100062b159cb34fda4169",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

const firestore = firebase.firestore();

export default firebase;
export { auth, firestore };
