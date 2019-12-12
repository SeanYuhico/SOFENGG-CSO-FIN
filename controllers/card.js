const cardDB = require("../models/card.js");
const announcementDB = require("../models/announcement.js");

function RetrieveAll(req, res){
    console.log("RetrieveAll")
    let authenticated = false;
    if(req.session.organization){
        authenticated = true;
    }
 
    if(authenticated === true){
        console.log("RetrieveAll")
        cardDB.RetrieveAll((cards) => {
            console.log("RetrieveAll")

            announcementDB.RetrieveAll((announcements) => {
                res.render("home.hbs", {
                    admin : req.session.admin,
                    org : req.session.organization,
                    orgEmail: req.session.email,
                    card: cards,
                    announcement: announcements
                });
            })
        });
    }else{
        res.render("login.hbs");
    }
}

function Create(req, res){
    //create card
    let title = req.body.title;
    let desc = req.body.desc;
    let link = req.body.link;
    let imgSrc = "../images/google drive.png";

    let card = {
        title: title,
        desc: desc,
        link: link,
        imgSrc: imgSrc
    }
    cardDB.Create(card, (err) => {
        if(err){
            console.log(err);
            console.log("Fail Update");
            res.send({"message":"FAIL"});
        } else{
            console.log("Update SUCCESS");
            res.send({"message":"SUCCESS", "title": title, "desc": desc, "link": link});
        }
    })
}

function Delete (req, res) {
    let key = req.body.key;
    cardDB.Delete(org, (err) => {
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

function editCard(req, res) {
    let key = req.body.key;
    let title = req.body.title;
    let desc = req.body.desc;
    let link = req.body.link;

    cardDB.editCard(key, title, desc, link, (err) => {
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
    editCard,
    RetrieveAll
}