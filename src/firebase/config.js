// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7AJsLA92t-_r4fj1m1Vj1_AMRdhU81jU",
  authDomain: "twitter-935a9.firebaseapp.com",
  projectId: "twitter-935a9",
  storageBucket: "twitter-935a9.appspot.com",
  messagingSenderId: "557448548989",
  appId: "1:557448548989:web:7e59aebef4afbb1b7c1714",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// yetkilendirmenin referans işlemi
export const auth = getAuth(app);

// google sağlayıcı kurulumu
export const provider = new GoogleAuthProvider();

// veritabanının referansını alma
export const db = getFirestore(app);

// depolama alanının referansını alma
export const storage = getStorage(app);
