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
const userDB = require(__dirname + "/models/user.js");
//Controllers
const userController = require(__dirname + "/controllers/user.js");
// const docuController = require(__dirname + "/controllers/document-tracker.js");

//Others
app.use(express.static(__dirname + "/public"));
hbs.registerPartials(__dirname + "/views/partials", ()=>{ console.log("Partials are now loaded."); });
app.set("view engine", ".hbs");
app.use(cparser());
app.use(session({secret: "CSOFIN", name: "acctCookie", resave: false, saveUninitialized: false, cookie: {maxAge: 60 * 60 * 1000}}));
app.use(bparser.json());
app.use(bparser.urlencoded({extended:true}));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sofengg-cso-fin.firebaseio.com"
});
var documents;

//Listen
app.listen(process.env.PORT || 3001, function(){console.log("Live at port 3001");});

//Routes
app.get("/", (req, res)=>{
    res.render("login.hbs", {});
});
app.get("/home", (req, res)=>{
    var authenticated = false;
    console.log("Session: " + req.session.organization);
 
    if(req.session.organization){
        authenticated = true;
    }
 
    if(authenticated === true){
        res.render("home.hbs", {
            admin : req.session.admin,
            org : req.session.organization
        })
    }else{
        res.render("404.hbs", {
            org : req.session.organization
        })
    }
    
})
app.get("/users", userController.RetrieveAll);
app.get("/documentTracker", async(req, res) => {
    console.log("Redirect to Docu");
    await accessSpreadsheet(req.session.organization);
    if(documents != null){
        req.session.data = documents;
        res.render("documentTracker.hbs", {
            admin : req.session.admin,
            org : req.session.organization,
            Header : req.session.data
        })
    }else{
        res.render("404.hbs", {
            org : req.session.organization
        })
    }
});
app.post("/login", userController.authenticate);
app.post("/logout", userController.logout);
app.use("*", function(req, res){
    res.render("404.hbs", {
        org : req.session.organization
    })
});

//Retrieve GSheets
async function accessSpreadsheet(orgName) {
        await promisify(doc.useServiceAccountAuth)(creds);
        const info = await promisify(doc.getInfo)();
        const sheet = info.worksheets[0];
        const rows = await promisify(sheet.getRows)({
            offset: 1,
            query: "organizationsname = " + orgName
        })
        documents = rows;
        console.log("Data Loaded Successfully");
}
