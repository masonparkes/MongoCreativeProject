angular.module('ChaseTheBox', [])
    .controller('MainCtrl', [
        '$scope', '$http',
        function($scope, $http) {
            $scope.highScores = [];

            var count = 0;
            var name = "";

            var start_time = 0;
            var end_time = 0;
            var time = 0;

            document.getElementById("butt").style.visibility = "hidden";
            document.getElementById("gameOverHeading").style.visibility = "hidden";
            document.getElementById("nameText").style.visibility = "hidden";
            document.getElementById("save_CTB_score").style.visibility = "hidden";
            document.getElementById("namePrompt").style.visibility = "hidden";
            document.getElementById("highScoresList").style.visibility = "hidden";


            // Start the game
            $scope.start = function() {
                console.log("start CTB");

                count = 0;
                start_time = new Date().getTime() / 1000;

                document.getElementById("butt").style.visibility = "hidden";
                document.getElementById("gameOverHeading").style.visibility = "hidden";
                document.getElementById("nameText").style.visibility = "hidden";
                document.getElementById("save_CTB_score").style.visibility = "hidden";
                document.getElementById("namePrompt").style.visibility = "hidden";

                document.getElementById("butt").style.top = "50%";
                document.getElementById("butt").style.left = "50%";
                document.getElementById("butt").style.visibility = "visible";
                document.getElementById("instructions").style.visibility = "hidden";
                //document.getElementById("endgame").style.visibility="visible";
                document.getElementById("start").style.visibility = "hidden";
                document.body.bgColor = "red";
            };

            // Move the box to random location on click
            $scope.ChaseTheBox = function() {
                console.log("Chase the Box clicked");

                end_time = new Date().getTime() / 1000;
                time = end_time - start_time;
                if (time >= 10) {
                    end_game();
                }

                var X = Math.random() * 97;
                var xper = X + "%";
                var Y = Math.random() * 98;
                var yper = Y + "%";

                document.getElementById("butt").style.top = yper;
                document.getElementById("butt").style.left = xper;

                count++;
            }


            // End the game
            function end_game() {
                end_time = new Date().getTime() / 1000;
                time = end_time - start_time;

                document.getElementById("gameOverHeading").innerHTML = "You clicked the button " + count + " times in 10 seconds";
                
                document.getElementById("saveForm").visibility = "visible";
                
                document.getElementById("butt").style.visibility = "hidden";
                document.getElementById("gameOverHeading").style.visibility = "visible";
                document.getElementById("nameText").style.visibility = "visible";
                document.getElementById("save_CTB_score").style.visibility = "visible";
                document.getElementById("namePrompt").style.visibility = "visible";

                document.getElementById("endgame").style.visibility = "hidden";
                document.getElementById("start").style.visibility = "visible";
                document.getElementById("instructions").style.visibility = "visible";
            }

            $scope.save = function() {
                console.log("in save");

                console.log("name: " + $scope.nameText);
                console.log("score: " + count);

                // Save `count` var into the db
                var newScore = { name: $scope.nameText, score: count };
                $http.post('/ctb_highscores', newScore).success(function(data) {
                    $scope.highScores.push(data);
                });

                $scope.nameText = '';
                document.getElementById("highScoresList").style.visibility = "visible";
                console.log("finished save");
            };
            
            
            // GET All CTB High Scores
            $scope.getAll = function() {
                return $http.get('/ctb_highscores').success(function(data) {
                    angular.copy(data, $scope.highScores);
                });
            };
            $scope.getAll();
        }
    ]);