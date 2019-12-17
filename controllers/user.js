const userDB = require("../models/user.js");
const announcementDB = require("../models/announcement.js");


function authenticate(req, res){
    let org = req.body.org;
    let em = req.body.em;
    let pw = req.body.pw;
    userDB.RetrieveOne(org, (organization)=>{
        if(organization && organization.email === em && organization.password === pw){
            req.session.organization = org;
            req.session.admin = organization.admin;
            req.session.email = em;
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

function RetrieveBalanceSheet (req, res) {
    console.log("org" + req.session.organization)

    return new Promise((resolve, reject) => {
        userDB.RetrieveOne(req.session.organization, (user) => {
            console.log("Balance key: " + user.balanceKey);
            let balanceKey = user.balanceKey;
            //res.send(balanceKey);
            
            console.log(user);
    
            if (balanceKey !== null) {
                console.log("balanceKey: " + balanceKey);
                return resolve(balanceKey);
            } else {
                return reject("null");
            }
        });
    })
}

function RetrieveDebtsSheet (req, res) {
    console.log("org" + req.session.organization)

    return new Promise((resolve, reject) => {
        userDB.RetrieveOne(req.session.organization, (user) => {
            console.log("Debts key: " + user.debtsKey);
            let debtsKey = user.debtsKey;
            //res.send(balanceKey);
            
            console.log(user);
    
            if (debtsKey !== null) {
                console.log("debtsKey: " + debtsKey);
                return resolve(debtsKey);
            } else {
                return reject("null");
            }
        });
    })
}
 
function RetrieveAll(req, res){
    let user = null;
    if (req.session.organization){
        user = {};
        user.organization = req.session.organization;
        user.admin = req.session.admin;
        if(user.admin == 1 && req.session.organization != ""){
            announcementDB.RetrieveAll((announcements) => {
                userDB.RetrieveAll((users) => {
                    for (let i = 0; i < users.length; i++) {
                        delete users[i].password;
                    }

                    res.render("users.hbs", {
                        org : req.session.organization,
                        users: users,
                        user: user,
                        announcement: announcements
                    });
                });
            })
        }
    } else {
        res.render("404.hbs", {
            org : req.session.organization,
            admin : req.session.admin
        });
    }
}

function RetrieveOrgs(req, res){
    userDB.RetrieveOrgs((orgs) => {
        if (orgs === null) {
            res.send({message: "FAIL"});
        } else {
            res.send({message: "SUCCESS", orgs: orgs})
        }
        
    });
}

function Create(req, res){
    //create user
    let em = req.body.em;
    let org = req.body.org;
    let pw = req.body.pw;
    let random = (Math.floor(Math.random() * 90000) + 10000) + "";
    if (req.body.pw === null)
        pw = random;
    let user = {
        org: org,
        password: pw,
        email: em
    }
    userDB.Create(user, (err) => {
        if(err){
            console.log(err);
            console.log("Fail Update");
            res.send({"message":"FAIL"});
        } else{
            console.log("Update SUCCESS");
            res.send({"message":"SUCCESS", "org": org, "pw": pw, "email": em});
        }
    })
}

function Delete (req, res) {
    let org = req.body.org;
    userDB.Delete(org, (err) => {
        if(err){
            console.log(err);
            console.log("Delete FAILURE");
            res.send({"message":"FAIL"});
        } else{
            console.log("Delete SUCCESS");
            res.send({"message":"SUCCESS", "org": org});
        }
    })
}

function resetPassword(req, res) {
    let org = req.body.org;
    let email = req.body.em;
    let random = (Math.floor(Math.random() * 90000) + 10000) + "";

    userDB.UpdatePassword(org, email, random, (err) => {
        if(err){
            console.log(err);
            console.log("Fail Update");
            res.send({message: "FAIL"});
        } else{
            console.log("Update SUCCESS");
            res.send({message: "SUCCESS", password: random});
        }
    });
}

function editEmail(req, res) {
    let org = req.body.org;
    let email = req.body.em;

    userDB.UpdateEmail(org, email, (err) => {
        if(err){
            console.log(err);
            console.log("Fail Update");
            //res.send("FAIL");
            res.send({message: "FAIL"});
        } else{
            console.log("Update SUCCESS");
            res.send({message: "SUCCESS", "email": email});
        }
    });
}

function editPassword(req, res) {
    let org = req.body.org;
    let email = req.body.em;
    let pw = req.body.pw;

    userDB.UpdatePassword(org, email, pw, (err) => {
        if(err){
            console.log(err);
            console.log("Fail Update");
            //res.send("FAIL");
        } else{
            console.log("Update SUCCESS");
            //res.send("SUCCESS");
        }
    });
}

function updateBalanceDebtsSheet (req, res) {
    console.log("updateBalanceDebtsSheet")
    let org = req.body.org;
    let sheetKey = req.body.sheetKey;
    let key = sheetKey.split("/");
    userDB.UpdateBalanceDebtsSheet(org, key[5], (err) => {
        if (err) {
            console.log("Update Failure");
            res.send("FAIL");
        } else {
            console.log("Update Success");
            res.send("SUCCESS");
        }
    })
}

function ValidatePassword (req, res) {
    let pw = req.body.password;
    let org = req.body.org;

    userDB.ComparePassword(org, pw, (valid) => {
        res.send({message: "SUCCESS", valid: valid});
    });
    res.send({message: "FAIL", valid: false})
}

module.exports = {
    authenticate,
    logout,
    RetrieveAll, 
    RetrieveOrgs,
    RetrieveBalanceSheet,
    RetrieveDebtsSheet,
    editEmail,
    editPassword,
    resetPassword,
    updateBalanceDebtsSheet,
    Create,
    ValidatePassword,
    Delete
}