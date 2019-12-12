const announcementDB = require("../models/announcement.js");
 
function RetrieveAll(req, res){
    console.log("RetrieveAll")
    let authenticated = false;
    if(req.session.organization){
        authenticated = true;
    }
 
    return announcementDB.RetrieveAll((announcements) => {
        console.log("RetrieveAll")
        console.log(req.session.admin)
        console.log(req.session.organization)
        console.log(req.session.email)
        console.log(announcements)
        return announcements;
    });
}

function Create(req, res){
    //create announcement
    let announcement = {
        title: req.body.title,
        body: req.body.body
    }
    console.log(announcement);
    announcementDB.Create(announcement, (err) => {
        if(err){
            console.log(err);
            console.log("Fail Update");
            res.send({"message":"FAIL"});
        } else{
            console.log("Update SUCCESS");
            res.send({"message":"SUCCESS", "title": title, "body": body});
        }
    })
}

function Delete (req, res) {
    let key = req.body.key;
    announcementDB.Delete(org, (err) => {
        if(err){
            console.log(err);
            console.log("Delete FAILURE");
            res.send({"message":"FAIL"});
        } else{
            console.log("Delete SUCCESS");
            res.send({"message":"SUCCESS", "key": key});
        }
    })
}

function editAnnouncement(req, res) {
    let key = req.body.key;
    let title = req.body.title;
    let body = req.body.body;

    announcementDB.editAnnouncement(key, title, body, (err) => {
        if(err){
            console.log(err);
            console.log("Fail Update");
            //res.send("FAIL");
            res.send({message: "FAIL"});
        } else{
            console.log("Update SUCCESS");
            res.send({message: "SUCCESS", "key": key});
        }
    });
}

module.exports = {
    Create,
    Delete,
    editAnnouncement,
    RetrieveAll
}