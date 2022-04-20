// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyD85T-I2dqNZZJlRrD6b7hOd9B-Jjepr5k",

  authDomain: "shlprojectapp.firebaseapp.com",

  projectId: "shlprojectapp",

  storageBucket: "shlprojectapp.appspot.com",

  messagingSenderId: "371198283314",

  appId: "1:371198283314:web:cc8f7e75f4ff464772362b",

  measurementId: "G-DMGW2SCC7Y"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export default(firebaseConfig);