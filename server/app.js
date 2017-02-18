var express = require("express");
var app = express();
var bodyParser = require('body-parser');

// Routes //
var index = require('./routes/index');

// App Set //
app.set("port", (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));

console.log("dirname" ,__dirname);

app.use('/vendors', express.static(__dirname + '/public/vendors'));
app.use('/assets', express.static(__dirname + '/public/assets'));

// Routes
app.use('/', index);

// Listen //
app.listen(app.get("port"), function(){
   console.log("Listening on port: " + app.get("port"));
});