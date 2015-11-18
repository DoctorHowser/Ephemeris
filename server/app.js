var express = require("express");
var app = express();
var bodyParser = require('body-parser');

// Routes //
var index = require('./routes/index');

// App Set //
app.set("port", (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));

// Routes
app.use('/', index);

// Mongo Connection //


// Listen //
app.listen(app.get("port"), function(){
   console.log("Listening on port: " + app.get("port"));
});