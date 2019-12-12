const fb = require("./firebase.js");
const crypto = require("crypto-js");

const database = fb.database;
const annRef = database.ref('announcements/');

var connectedRef = fb.database.ref(".info/connected");
connectedRef.on("value", function(snap) {
  if (snap.val() === true) {
    console.log("Firebase Connected");
  } else {
    console.log("Firebase Not Connected");
  }
});

function Create(announcement, callback){
    console.log("CREATE")

    console.log(announcement);
    
    let today = new Date();
    let date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    annRef.push({
        "title": announcement.title,
        "body": announcement.body,
        "dateTime": dateTime
    });
}

function RetrieveOne(key, callback){
    database.ref('announcements/' + key).once('value').then(function(snapshot){
        let announcement = snapshot.val();
        console.log(announcement);
        callback(announcement);
    });
}

function RetrieveAll(callback){
    database.ref('announcements').once('value').then(function(snapshot){
        callback(snapshot.val());
    });
}

function getAll(){
    database.ref('announcements').once('value').then(function(snapshot){
        return snapshot.val();
    });
}

function editAnnouncement(key, title, body, callback) {
    let ref = database.ref('/announcements/' + key);
    ref.update({title: title, body: body}, err => {
        callback(err);
    });
}

function Delete(key, callback){
    let ref = database.ref('/announcements/' + key);
    ref.remove((err) => {
        callback(err)
    });
}

module.exports = {
    Create,
    Delete,
    editAnnouncement,
    RetrieveAll,
    getAll
}