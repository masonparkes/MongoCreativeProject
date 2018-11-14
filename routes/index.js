var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

var CTBscores = mongoose.createConnection('mongodb://localhost/CTBscores'); //Connects to a mongo database called "commentDB"
var RTCscores = mongoose.createConnection('mongodb://localhost/RTCscores');

var CTBscore = CTBscores.model('Model', new mongoose.Schema({
    Name: String,
    Score: Number
}));
var RTCscore = RTCscores.model('Model', new mongoose.Schema({
    Nane: String,
    Time: Number
}))

/*var CTBSchema = mongoose.Schema({ //Defines the Schema for this database
    Name: String,
    Score: String
});
*/
//var CTBscore = mongoose.model('Score', CTBSchema); //Makes an object from that schema as a model

//var CTBdb = mongoose.connection; //Saves the connection as a variable to use
//CTBdb.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
//CTBdb.once('open', function() { //Lets us know when we're connected
//    console.log('Connected');
//});

//mongoose.connect('mongodb://localhost/RTCscores', { useNewUrlParser: true }); //Connects to a mongo database called "commentDB"
/*
var RTCSchema = mongoose.Schema({ //Defines the Schema for this database
    Name: String,
    time: String
});

var RTCscore = mongoose.model('Score', RTCSchema); //Makes an object from that schema as a model

var RTCdb = mongoose.connection; //Saves the connection as a variable to use
RTCdb.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
RTCdb.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});
*/


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


router.get('/CTBhighscores', function(req, res, next) {
    console.log("getting chase the box high scores");
    CTBscore.find().sort({ 'score': 1 }).exec(function(err, data) {
        if (err) return console.error(err);
        else {
            console.log("high scores:");
            console.log(data);
            res.json(data);
        }
    });
});
router.get('/RTChighscores', function(req, res, next) {
    CTBscore.find().sort({ 'time': -1 }).exec(function(err, data) {
        console.log("getting race the clock high scores");
        if (err) return console.error(err);
        else {
            console.log("high scores:");
            console.log(data);
            res.json(data);
        }
    });
});

module.exports = router;
