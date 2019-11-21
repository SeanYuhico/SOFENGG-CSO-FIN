const fb = require("./firebase.js");
const crypto = require("crypto-js");

const database = fb.database;
const userRef = database.ref('/users/');

var connectedRef = fb.database.ref(".info/connected");
connectedRef.on("value", function(snap) {
  if (snap.val() === true) {
    console.log("Firebase Connected");
  } else {
    console.log("Firebase Not Connected");
  }
});

function Create(user, callback){
    let id = database.ref('users/').push().key;
    let hash = crypto.AES.encrypt(user.password, user.email).toString();

    database.ref('users/' + user.email).set({
        "email": user.email,
        "password": hash,
        "admin": user.admin
    }, (err) => {
        callback(err);
    });
}

function updatePassword (org, email, password, callback) {
    let ref = database.ref('/users/' + org);
    let hash = crypto.AES.encrypt(password, email).toString();

    ref.update({password: hash}, err => {
        callback(err);
    });
}

function RetrieveOne(username, callback){
    database.ref('users/' + username).once('value').then(function(snapshot){
        let user = snapshot.val();
        console.log(user);
        if(user){
            user.username = username;
            if (user.password != ""){
                user.password = crypto.AES.decrypt(user.password, user.email).toString(crypto.enc.Utf8);
            }else
                user.password = "";
                callback(user)
        }else {
            callback(null)
        }
    });
}

function RetrieveAll(callback){
    database.ref('users').once('value').then(function(snapshot){
        callback(snapshot.val());
    });
}

function resetSheets(){
    userRef.once("value", function(snapshot) {
        snapshot.forEach(function(child) {
            console.log(child.key+": "+child.val());
        })
    })

    userRef.once("value", function(snapshot) {
        snapshot.forEach(function(child) {
          child.ref.update({
            debtsKey: '0',
            balanceKey: '0'
          });
        });
    });
}

function Update(username, newData, callback){
    var updates = {};
    console.log(newData.password + "");
    let hash = crypto.AES.encrypt(newData.password, newData.email).toString();
    newData.password = hash;
    let key = "email"
    delete newData[key];
    updates = newData;
    database.ref('/users/' + username).update(updates, (err) => {
        callback(err);
    });
}

function UpdateDebtsSheet(username, link, callback) {
    let ref = database.ref('/users/' + username);
    ref.update({debtsKey: link}, err => {
        callback(err);
    });
}

function UpdateBalanceSheet(username, link, callback) {
    let ref = database.ref('/users/' + username);
    ref.update({balanceKey: link}, err => {
        callback(err);
    });
}

function UpdateBalanceDebtsSheet(username, link, callback) {
    console.log("UpdateBalanceDebtsSheet() - model")
    let ref = database.ref('/users/' + username);
    ref.update({balanceKey: link, debtsKey: link}, err => {
        callback(err);
    });
}

function Delete(username, callback){
    database.ref('users/' + username).remove((err) => {
        callback(ref);
    });
}

module.exports = {
    Create,
    RetrieveOne,
    RetrieveAll,
    Update,
    UpdateDebtsSheet,
    UpdateBalanceSheet,
    UpdateBalanceDebtsSheet,
    Delete,
    resetSheets
}