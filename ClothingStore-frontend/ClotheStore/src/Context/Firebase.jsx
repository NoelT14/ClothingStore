
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDl65wArqLnEzWiFviCU0vAj-dT0ouWPaM",
  authDomain: "fir-authstore-6bef9.firebaseapp.com",
  projectId: "fir-authstore-6bef9",
  storageBucket: "fir-authstore-6bef9.appspot.com",
  messagingSenderId: "282530379103",
  appId: "1:282530379103:web:b400f88647c50511a9b2ea"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };