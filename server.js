// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
//var methodOverride = require('method-override');

// configuration ===========================================
    
// config files
var db = require('./config/db');
var envVal = require('./config/envValues.js');

// set our port
var port = envVal.PORT || process.env.PORT || 8080; 

// connect to our mongoDB database 
mongoose.connect(db.url); 

mongoose.connection.on('open', function(){
    console.log("\tConnected to database....");
});

mongoose.connection.on('error', function(err){
    console.log("\tCouldn't connect to database.");
    console.log("error:", err);
})
console.log("Database state:",mongoose.connection.readyState);

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
//app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

// routes ==================================================
require('./app/routes')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);               

// shoutout to the user                     
console.log('App running on port ' + port);

// expose app           
exports = module.exports = app;