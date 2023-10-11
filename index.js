var express = require("express");

var app = express();

app.use(express.static("/Users/user/Desktop/programming-III"));

app.get("/", function(req, res){

res.redirect("index.html");

});

app.listen(3000, function(){

console.log("Example is running on port 3000");

});