const express = require("express");
const bodyparser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
const items = [];
const workItems = [];

const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({extended: true}))
app.use(express.static("public"));

/* ---------------------  "/"  --------------------------- */

app.get("/", function(req, res){

    const day = date.getDate();
    
    res.render("List", {listTitle: day, newListItems: items});
});


app.post("/", function(req, res){
    const item = req.body.newItem;

    if (req.body.list === "Arbete"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
});

/* --------------------- "/work" ----------------------------- */

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Arbete", newListItems: workItems});
});

app.get("/about", function(req, res){
    res.render("about");
})


app.listen(PORT, function(){
    console.log(`Server started on port ${PORT}`);
});

