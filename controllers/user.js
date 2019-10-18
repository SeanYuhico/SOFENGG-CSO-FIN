const userDB = require("../models/user.js");

function authenticate(req, res){
    let un = req.body.un;
    let pw = req.body.pw;
    userDB.RetrieveOne(un, (user)=>{
        if(user && user.password === pw){
            req.session.usernme = un;
            req.session.admin = user.admin;
            res.send("OK");
        }else{
            res.send("FAIL");
        }
    });
}

function logout(req, res){
    req.session.username = null;
    req.session.admin = null;
    req.session.moderator = null;
    req.session.cookie.expires = false;
    res.session.destroy();
    res.send("OK")
}

function RetrieveAll(req, res){
    let user = null;
    if (req.session.username){
        user = {};
        user.username = req.session.username;
        user.admin = req.session.admin;
        user.moderator = req.session.moderator;
        if(user.admin){
            userDB.RetrieveAll((users) => {
                res.render("users.hbs", {
                    users: users,
                    user: user
                });
            });
        }
    } else {
        // res.render("404.hbs");
    }
}

function Create(req, res){
    let un = 
}

module.exports = {
    authenticate,
    logout,
    RetrieveAll
}