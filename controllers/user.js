const userDB = require("../models/user.js");

function authenticate(req, res){
    let org = req.body.org;
    let em = req.body.em;
    let pw = req.body.pw;
    userDB.RetrieveOne(org, (organization)=>{
        if(organization && organization.email === em && organization.password === pw){
            req.session.organization = org;
            req.session.admin = organization.admin;
            // console.log("Session Values: " + req.session.organization + "Admin: " + req.session.admin);
            res.send("OK");
        } else if(organization && organization.email === em && pw != "" && organization.password == ""){
            var random = (Math.floor(Math.random() * 90000) + 10000) + "";
            var user = {
                password:random,
                email:em
            }
            userDB.Update(org, user, (err) => {
                if(err){
                    console.log(err);
                    console.log("Fail Update");
                }else{
                    req.session.organization = org;
                    req.session.admin = organization.admin;
                    console.log("Update SUCCESS");
                }
            })
            res.send("PASSWORD");
        }else{
            res.send("FAIL");
        }
    });
}

function logout(req, res){
    console.log("Logged Out Sucessfully");
    req.session.organization = null;
    req.session.admin = null;
    req.session.cookie.expires = false;
    req.session.destroy();
    res.send("OK")
}

function RetrieveAll(req, res){
    let user = null;
    if (req.session.organization){
        user = {};
        user.organization = req.session.organization;
        user.admin = req.session.admin;
        if(user.admin == 1 && req.session.organization != ""){
            userDB.RetrieveAll((users) => {
                res.render("users.hbs", {
                    users: users,
                    user: user
                });
            });
        }
    } else {
        res.render("404.hbs", {
            admin : req.session.admin
        });
    }
}

function Create(req, res){
    //create user
    let em = req.body.em;
    let pw = req.body.pw;
    var user = {
        password:random,
        email:em
    }
    userDB.Create(user, (err) => {
        if(err){
            console.log(err);
            console.log("Fail Update");
            res.send("FAIL");
        } else{
            console.log("Update SUCCESS");
            res.send("SUCCESS");
        }
    })
}

module.exports = {
    authenticate,
    logout,
    RetrieveAll, 
    Create
}