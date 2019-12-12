const express = require("express");
const bparser = require("body-parser");
const hbs = require("hbs");
const path = require('path');
const session = require("express-session");
const cparser = require("cookie-parser");
const app = express();
const {google} = require('googleapis');
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const GoogleSpreadsheet = require('google-spreadsheet');
const {promisify} = require('util');
const creds = require (__dirname + "/documentTracker.json");
const doc = new GoogleSpreadsheet('1z_6sjroYPL8_TzMf6BGqWIoDzQoC8dnAIDgRjVVTNPQ');

//Models
const DocTrackerModel = require(__dirname + "/models/document-tracker.js");
const balanceModel = require(__dirname + "/models/balance.js");
const debtsModel = require(__dirname + "/models/debts.js");
const announcementModel = require(__dirname + "/models/announcement.js");
//Controllers
const userController = require(__dirname + "/controllers/user.js");
const cardController = require(__dirname + "/controllers/card.js");
const announcementController = require(__dirname + "/controllers/announcement.js");
// const docuController = require(__dirname + "/controllers/document-tracker.js");

//Others
app.use(express.static(__dirname + "/public"));
hbs.registerPartials(__dirname + "/views/partials", ()=>{ console.log("Partials are now loaded."); });
app.set("view engine", ".hbs");
app.use(cparser());
app.use(session({secret: "CSOFIN", name: "acctCookie", resave: false, saveUninitialized: false, cookie: {maxAge: 365 * 24 * 60 * 60 * 1000}}));
app.use(bparser.json());
app.use(bparser.urlencoded({extended:true}));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sofengg-cso-fin.firebaseio.com"
});
let documents;

//Listen
app.listen(process.env.PORT || 3001, function(){console.log("Live at port 3001");});

function home (req, res) {
    var authenticated = false;
    console.log("Session: " + req.session.organization);
 
    if(req.session.organization){
        authenticated = true;
    }
 
    if(authenticated === true){
        cardController.RetrieveAll(req, res);
    }else{
        console.log("wat");
        res.render("login.hbs", {});
    }
}

//Routes
app.get("/", (req, res)=>{
    home(req, res);
});

app.get("/home", (req, res)=>{
    home(req, res);
     
})

app.get("/help", (req, res)=>{
    var authenticated = false;
    console.log("Session: " + req.session.organization);
 
    if(req.session.organization){
        authenticated = true;
    }
 
    if(authenticated === true){
        announcementModel.RetrieveAll((announcements) => {
            res.render("help.hbs", {
                admin : req.session.admin,
                org : req.session.organization,
                Header : req.session.data,
                announcement : announcements
            });
        });
        
    }else{
        res.render("404.hbs", {
            org : req.session.organization
        })
    }
    
})

app.get("/users", userController.RetrieveAll);

app.get("/documentTracker", async(req, res) => {
    console.log("Redirect to Docu");
    documents = await DocTrackerModel.getSpreadsheetRows(req.session.organization);
    if(documents != null){
        req.session.data = documents;

        const promise = new Promise( (resolve, reject) => {
            console.log("promise")
            announcementModel.getAll().then(announcements => {
                if (value !== null)
                    return resolve(announcements);
                return reject();
            });
        });
        promise.then((announcements) => {
            res.render("documentTracker.hbs", {
                admin : req.session.admin,
                org : req.session.organization,
                Header : req.session.data,
                announcement : announcements
            });
        }).catch ((err)=>{
            res.render("404.hbs", {
                org : req.session.organization
            })
        });
        
        // res.render("documentTracker.hbs", {
        //     admin : req.session.admin,
        //     org : req.session.organization,
        //     Header : req.session.data
        // })
    }else{
        res.render("404.hbs", {
            org : req.session.organization
        })
    }
}); 

app.get("/debts", async(req, res) => {
    console.log("Redirect to Debts");

    const promise = new Promise( (resolve, reject) => {
        console.log("promise")
        userController.RetrieveDebtsSheet(req, res).then(value => {
            console.log("value: " +value);

            if (value !== null)
                return resolve(value);
            return reject();
        });
    });

    promise.then((debtsKey) => {
        console.log("is debtsKey null? " + (debtsKey == null))
        if (debtsKey) {
            let val = debtsModel.setSpreadsheet(debtsKey).then(sheet => {
                console.log(sheet);
                if (sheet === null)
                    return null;
                else 
                    return sheet;
            })
            console.log("val: " + val)
            return val;
        } return null;
    }).then((sheet) => {
        console.log("is sheet null? " + (sheet == null))
        console.log(sheet);
        if (sheet === null)
            return null;
        let rows = debtsModel.accessSpreadsheet(req.session.organization, sheet).then(sheetRows => {
            if (sheetRows === null)
                return null;
            return sheetRows;
        });
        return rows;
    }).then((rows) => {
        console.log("wow! yay! " + (rows === null))
        if (rows !== null) {
            req.session.data = rows;
            announcementModel.RetrieveAll((announcements) => {
                console.log("wowwi");
                console.log(announcements)
                res.render("debts.hbs", {
                    admin : req.session.admin,
                    org : req.session.organization,
                    Header : req.session.data,
                    announcement : announcements
                });
            });
        } else {
            return null;
        }
    })
    .catch ((err)=>{
        res.render("404.hbs", {
            org : req.session.organization
        })
    });
}); 

app.get("/balance", async(req, res) => {
    console.log("Redirect to Balance");

    const promise = new Promise( (resolve, reject) => {
        console.log("promise")
        userController.RetrieveBalanceSheet(req, res).then(value => {
            console.log("value: " +value);

            if (value !== null)
                return resolve(value);
            return reject();
        });
    });

    promise.then((balanceKey) => {
        console.log("is balanceKey null? " + (balanceKey == null))
        if (balanceKey) {
            let val = balanceModel.setSpreadsheet(balanceKey).then(sheet => {
                console.log(sheet);
                if (sheet === null)
                    return null;
                else 
                    return sheet;
            })
            console.log("val: " + val)
            return val;
        } return null;
    }).then((sheet) => {
        console.log("is sheet null? " + (sheet == null))
        console.log(sheet);
        if (sheet === null)
            return null;
        let rows = balanceModel.accessSpreadsheet(req.session.organization, sheet).then(sheetRows => {
            if (sheetRows === null)
                return null;
            return sheetRows;
        });
        return rows;
    }).then((rows) => {
        console.log("wow! yay! " + (rows === null))
        if (rows !== null) {
            req.session.data = rows;
            console.log("wowwa");
            announcementModel.RetrieveAll((announcements) => {
                console.log("wowwi");
                console.log(announcements)
                res.render("balance.hbs", {
                    admin : req.session.admin,
                    org : req.session.organization,
                    Header : req.session.data,
                    announcement : announcements
                });
            });
        }
    })
    .catch ((err)=>{
        res.render("404.hbs", {
            org : req.session.organization
        })
    });
}); 

app.get("/getOrgs", (req, res) => {
    console.log("/getOrgs");
    userController.RetrieveOrgs(req, res);
});

app.post("/login", (req, res) => {
    console.log("/login");
    userController.authenticate(req, res)
});

app.post("/logout", userController.logout);

app.post("/createUser", (req, res) => {
    console.log("/createUser");
    userController.Create(req, res);
});

app.post("/createCard", (req, res) => {
    console.log("/createCard");
    cardController.Create(req, res);
});

app.post("/createAnnouncement", (req, res) => {
    console.log("/createAnnouncement");
    announcementController.Create(req, res);
});

app.post("/editSheet", (req,res)=>{
    console.log("/editSheet");
    userController.updateBalanceDebtsSheet(req, res);
});

app.post("/resetPw", (req,res)=>{
    console.log("/resetPw");
    userController.resetPassword(req, res);
});

app.post("/editEm", (req,res)=>{
    console.log("/editEm");
    userController.editEmail(req, res);
});

app.post("/editPw", (req,res)=>{
    console.log("/editPw");
    userController.editPassword(req, res);
});

app.post("/editCard", (req,res)=>{
    console.log("/editCard");
    cardController.editCard(req, res);
});

app.post("/editAnnouncement", (req,res)=>{
    console.log("/editAnnouncement");
    announcementController.editAnnouncement(req, res);
});

app.delete("/deleteUser", (req, res) => {
    console.log("/deleteUser");
    userController.Delete(req, res);
})

app.use("*", function(req, res){
    res.render("404.hbs", {
        org : req.session.organization
    })
});