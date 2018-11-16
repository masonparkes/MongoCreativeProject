var mongoose = require('mongoose');

var CTBHighScoreSchema = new mongoose.Schema({
  name: String,
  score: {type: Number, default: 0},
});

mongoose.model('CTB_HighScore', CTBHighScoreSchema);