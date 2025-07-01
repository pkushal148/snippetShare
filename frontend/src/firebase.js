// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCA9ZIBm9aORpR0EG4LkjrGBxQqPXv_Oto",
  authDomain: "snippetshare-a38d5.firebaseapp.com",
  projectId: "snippetshare-a38d5",
  storageBucket: "snippetshare-a38d5.firebasestorage.app",
  messagingSenderId: "232031672364",
  appId: "1:232031672364:web:7b30b757d0874bf76f5989",
  measurementId: "G-FL1LJ5NLCF",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, googleProvider, githubProvider };
