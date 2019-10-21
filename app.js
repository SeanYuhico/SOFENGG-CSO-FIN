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

//Models
const userDB = require(__dirname + "/models/user.js");
//Controllers
const userController = require(__dirname + "/controllers/user.js");

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


//Listen
app.listen(process.env.PORT || 3001, function(){console.log("Live at port 3001");});

//Routes
app.get("/", (req, res)=>{
    res.render("login.hbs", {});
});
app.get("/home", (req, res)=>{
    res.render("home.hbs", {
        org : req.session.organization
    })
})
app.get("/users", userController.RetrieveAll)
app.post("/login", userController.authenticate);
app.post("/logout", userController.logout);