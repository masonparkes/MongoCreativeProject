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
});
