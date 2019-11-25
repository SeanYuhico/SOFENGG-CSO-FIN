const fb = require("./firebase.js");
const crypto = require("crypto-js");

const database = fb.database;
const cardRef = database.ref('cards/');

var connectedRef = fb.database.ref(".info/connected");
connectedRef.on("value", function(snap) {
  if (snap.val() === true) {
    console.log("Firebase Connected");
  } else {
    console.log("Firebase Not Connected");
  }
});

function Create(card, callback){
    console.log("CREATE")
    cardRef.push({
        "cardTitle": card.title,
        "cardDesc": card.desc,
        "link": card.link,
        "imgSrc": card.imgSrc
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