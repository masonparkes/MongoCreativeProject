var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Setup Mongo/Mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo_creative_proj', { useNewUrlParser: true });
// require('./models/CTB_HighScores');
var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});

// Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;




$(document).ready(function() {
    $("#viewCTB").click(function() {
        //get high scores from database
        //put them in the highscore div
        $.getJSON("/CTBhighscores", function(data) {
            var list = "<h2>Player&nbsp&nbsp&nbsp&nbspScore</h2><ul>";
            for (var i = 0; i < data.length; i++) {
                list += "<li>" + data[i].Name + "&nbsp&nbsp&nbsp&nbsp" + data[i].Score + "<li>";
            }
            list += "<li>";
            $("#highscorelist").html(list);
        });
    });
    
    
    /*
    //I'm not sure this would be needed
    //I was worried about potential problems with going to different pages for the games and then
    //trying to access the databases from those pages, and organizing functions and all that, but I think
    //we should be able to make it work. 
    $("#viewRTC").click(function() {
        //get high scores from database
        //put them in the highscore div
        $.getJSON("/CTBhighscores", function(data) {
            var list = "<h2>Player&nbsp&nbsp&nbsp&nbspTime</h2><ul>";
            for (var i = 0; i < data.length; i++) {
                list += "<li>" + data[i].Name + "&nbsp&nbsp&nbsp&nbsp" + data[i].Time + "<li>";
            }
            list += "<li>";
            $("#highscorelist").html(list);
        });
    });
    
    $("#saveCTBscores").click(function(){
        alert("it works");
    })
    /*
    //I'm not sure this would be needed
    //I was worried about potential problems with going to different pages for the games and then
    //trying to access the databases from those pages, and organizing functions and all that, but I think
    //we should be able to make it work. 
    $("#playRTC").click(function() {
        var newHTML=getGamehtml("RTC");
        $("#game").html(newHTML);
        $("#start").click(startGame());
    })
    */
});
/*
//same as above, we would only need these if we were going to change how the game ran
function getGamehtml(game_name) {
    if (game_name == "RTC") {
        var stuff = "";
        stuff += '<button type = "button" id = "start">Start</button>';
        stuff += '<div id="game-window" style="display:none">';
        stuff += '<p id="mover">&#9658</p> </div>';
        stuff += '<div id="instructions" style="display:none">';
        stuff += '<p>Click the button to move the arrow, make it to the other side before time runs out.</p>';
        stuff += '<button type="button" id="move" onclick=move()>GO</button></div>';
        stuff += '<div id="win" style="display:none"><h1 class="message">You Won!!</h1></div>';
        stuff += '<div id="game-over" style="display:none"><h class="message">Should have moved faster</h></div>';
        stuff += '<button id="again" type="button" style="display:none" onclick=reset()>Play Again</button>';
        return stuff;
    }
    else if(game_name=="CTB"){
        
    }

}
//functions for Race the clock game
function startGame()
         {
             start_time=new Date().getTime()/1000;
             document.getElementById('game-window').style.display="block";
             document.getElementById('instructions').style.display="block";
             
             
         }
         function endGame()
         {
             document.getElementById('instructions').style.display="none";
             document.getElementById('game-window').style.display="none";
             document.getElementById('game-over').style.display="block";
             document.getElementById('again').style.display="block";
            
         }
         function getOffset( el )
         {
            var _x = 0;
            var _y = 0;
            while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
            }
            return { top: _y, left: _x };
         }
         function move()
         {
             end_time=new Date().getTime()/1000;
             time=end_time-start_time;
             if(time>20)
             {
                 lose();
             }
             var x=getOffset( document.getElementById('mover') ).left;
             var y=x+20+"px"
             document.getElementById('mover').style.left=y;
             if(x+20>=1180)
             {
                 win();
             }
         }
         function win()
         {
             
            alert("you won! Your time was "+time+" seconds! Click 'ok' to play again");
            reset();
         }
         function reset()
         {
             document.getElementById('game-window').style.display="none";
             document.getElementById('instructions').style.display="none";
             document.getElementById('mover').style.left="80px";

             startGame();
            

         }
         function lose()
         {
             alert("you didn't make it. Better luck next time... Click 'ok' to play again");
             reset();
         }
*/