const express = require("express");
const bparser = require("body-parser");
const hbs = require("hbs");
const session = require("express-session");
const cparser = require("cookie-parser");
const app = express();

//Models
const userDB = require(__dirname + "/models/user.js");
//Controllers
const userController = require(__dirname + "/controllers/user.js");

//Others
app.use(express.static(__dirname + "/public"));


hbs.registerPartials(__dirname + "/views/partals", ()=>{
    console.log("Partials are now loaded.");
});

app.set("view engine", ".hbs");

app.use(session({
    secret: "hello",
    name: "acctCookie",
    resave: true,
    saveUninitialized: true,
    cookie: {

    }
}));

app.use(cparser());

app.use(bparser.json());
app.use(bparser.urlencoded({extended:true}));

//Listen
app.listen(process.env.PORT || 3001, function(){
    console.log("Live at port 3001");
});

//Routes
app.get("/", (req, res)=>{
    res.render("login.hbs");
});
app.post("/login", userController.authenticate);