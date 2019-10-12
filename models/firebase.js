var firebase = require("firebase/app");

require("firebase/database");

var firebaseConfig = {
    apiKey: "AIzaSyAhvnpgjzIXiY1swvEpHbH9ZnhHgt0li5c",
    authDomain: "sofengg-cso-fin.firebaseapp.com",
    databaseURL: "https://sofengg-cso-fin.firebaseio.com",
    projectId: "sofengg-cso-fin",
    storageBucket: "sofengg-cso-fin.appspot.com",
    messagingSenderId: "1051987299816",
    appId: "1:1051987299816:web:c4f864b7645c053eb9e85d",
    measurementId: "G-BWT5CVML5K"
};

//Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

module.exports = {
    database
}