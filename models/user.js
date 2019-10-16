const fb = require("./firebase.js");
const crypto = require("crypto-js");

const database = fb.database;

function Create(user, callback){
    let id = database.ref('users/').push().key;
    let hash = crypto.AES.encrypt(user.password, user.username).toString();

    database.ref('users/' + user.username).set({
        "email": user.email,
        "password": hash,
        "admin": user.admin
    }, (err) => {
        callback(err);
    });
}

function RetriveOne(username, callback){
    database.ref('users/' + username).once('value').then(function(snapshot){
        let user = snapshot.val();
        if(user){
            user.username = username;
            user.password = crypto.AES.decrypt(user.password, username).toString(crypto.enc.Utf8);
            callback(user)
        }else {
            callback(null)
        }
    });
}

function RetriveAll(callback){
    database.ref('users').once('value').then(function(snapshot){
        callback(snapshot.val());
    });
}

function Update(username, newData, callback){
    var updates = {};
    let hash = crypto.AES.encrypt(newData.password, username).toString();
    newData.password = hash;
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