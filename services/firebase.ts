import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAfzo8W32iCrZ4_urhNz6Mq3_fB2JjUJho",
  authDomain: "monkeys-wapal.firebaseapp.com",
  projectId: "monkeys-wapal",
  storageBucket: "monkeys-wapal.appspot.com",
  messagingSenderId: "329095913829",
  appId: "1:329095913829:web:8c610780d15fb87ba2c18c",
  measurementId: "G-3K3GZC87CC"
};

export const firebase = initializeApp(firebaseConfig);
