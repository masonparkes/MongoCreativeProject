var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency
mongoose.connect('mongodb://localhost/mongo_creative_proj', { useNewUrlParser: true });
var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});


var CTBscores = mongoose.createConnection('mongodb://localhost/CTB_HighScores'); //Connects to a mongo database called "commentDB"

var CTB_HighScore = CTBscores.model('CTB_HighScore', new mongoose.Schema({
    name: String,
    score: {type: Number, default: 0},
}));


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('ChaseTheBox', { title: 'Chase The Box' });
});


/* GET Comments */
router.get('/ctb_highscores', function(req, res, next) {
    console.log("In GET CTB High Scores route");

    CTB_HighScore.find(function(err, scores) {
        if (err) {
            return next(err);
        }

        res.json(scores);
    });
});


/* POST -- add new comments */
router.post('/ctb_highscores', function(req, res, next) {
    console.log("In POST CTB High Scores route");

    var score = new CTB_HighScore(req.body);

    score.save(function(err, score) {
        if (err) {
            return next(err);
        }

        res.json(score);
    });
});

module.exports = router;


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


/* POST */
router.post('/CTBScore', function(req, res, next) {
    
})


/* POST -- add new comments */
router.post('/comments', function(req, res, next) {
    console.log("In POST CTB SCORE route");

    var score = new CTBscore(req.body);

    score.save(function(err, score) {
        if (err) {
            return next(err);
        }

        res.json(score);
    });
});

module.exports = router;
