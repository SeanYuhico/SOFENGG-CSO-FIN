const fb = require("./firebase.js");
const crypto = require("crypto-js");

const database = fb.database;

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
    Delete
}