import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, getDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { Database } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js"

// import { initializeApp } from 'firebase/app';
// import {} from 'firebase/firestore';

// var firebase = require('firebase/app');
// require('firebase/auth');
// require('firebase/database');


const firebaseConfig = {
    apiKey: "AIzaSyC3ps9TLHB_fPv_bIQj34rUpwMO1P8kXrU",
    authDomain: "kuomaje-5bbd3.firebaseapp.com",
    projectId: "kuomaje-5bbd3",
    storageBucket: "kuomaje-5bbd3.appspot.com",
    messagingSenderId: "411733631138",
    appId: "1:411733631138:web:87fd0efdd54ba2da09f7fb",
    measurementId: "G-SE3XPBSVN2"
};


firebase.initializeApp(firebaseConfig)
var pointsData = firebase.Database().ref()
//
// console.log('Hello there, Firestore!')
// console.log(pointsData)
