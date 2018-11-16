var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var CTB_HighScore = mongoose.model('CTB_HighScore');

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
