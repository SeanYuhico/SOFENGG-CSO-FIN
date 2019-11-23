const fb = require("./firebase.js");
const crypto = require("crypto-js");

const database = fb.database;
const cardRef = database.ref('/cards/');

var connectedRef = fb.database.ref(".info/connected");
connectedRef.on("value", function(snap) {
  if (snap.val() === true) {
    console.log("Firebase Connected");
  } else {
    console.log("Firebase Not Connected");
  }
});

function Create(user, callback){
    let cardRef = database.ref('users/');
    cardRef.push({
        "title": title,
        "desc": desc,
        "link": link,
        "imgSrc": imgSrc
    });
    database.ref('users/' + user.org).set({
        "title": title,
        "desc": desc,
        "link": link,
        "imgSrc": imgSrc
    }, (err) => {
        callback(err);
    });
}

function RetrieveOne(username, callback){
    database.ref('cards/' + username).once('value').then(function(snapshot){
        let user = snapshot.val();
        console.log(user);
        callback(user);
    });
}

function RetrieveAll(callback){
    database.ref('cards').once('value').then(function(snapshot){
        callback(snapshot.val());
    });
}

function editCard(username, link, callback) {
    let ref = database.ref('/users/' + username);
    ref.update({debtsKey: link}, err => {
        callback(err);
    });
}

function Delete(key, callback){
    let ref = database.ref('/cards/' + key);
    ref.remove((err) => {
        callback(err)
    });
}

module.exports = {
    Create,
    Delete,
    editCard,
    RetrieveAll
}