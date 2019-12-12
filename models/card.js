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
        "link": card.link
    });
}

function RetrieveOne(key, callback){
    database.ref('cards/' + key).once('value').then(function(snapshot){
        let card = snapshot.val();
        console.log(card);
        callback(card);
    });
}

function RetrieveAll(callback){
    database.ref('cards').once('value').then(function(snapshot){
        callback(snapshot.val());
    });
}

function editCard(key, title, body, link, callback) {
    let ref = database.ref('/cards/' + key);
    ref.update({cardTitle: title, cardDesc: body, link: link}, err => {
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