const express = require("express");
const bparser = require("body-parser");
const hbs = require("hbs");
const session = require("express-session");
const cparser = require("cookie-parser");
const app = express();

//Models

//Controllers

//Others
app.use(express.static(__dirname + "/public"));


hbs.registerPartials(__dirname + "/views/partals", ()=>{
    console.log("Partials are now loaded.");
});

app.set("view engine", ".hbs");

app.use(cparser());

app.use(bparser.json());
app.use(bparser.urlencoded({extended:true}));

//Routes
app.get("/", (req, res)=>{
    res.render('../public/views/login.hbs');
})

//Listen
app.listen(process.env.PORT || 3000, function(){
    console.log("Live at port 3000");
})