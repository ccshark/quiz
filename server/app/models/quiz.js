var mongoose = require('mongoose');

var QuizSchema = new mongoose.Schema({
  question: {
      type: String
  },
  options: {
    type: Array
  }
}, {
    timestamps: true
});

module.exports = mongoose.model('Quiz', QuizSchema);
