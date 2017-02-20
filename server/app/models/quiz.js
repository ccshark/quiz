var mongoose = require('mongoose');

var QuizSchema = new mongoose.Schema({
  question: {
      type: String
  },
  answare1: {
      type: String
  },
  answare2: {
      type: String
  },
  answare3: {
      type: String
  },
  answare4: {
      type: String
  }
}, {
    timestamps: true
});

module.exports = mongoose.model('Quiz', QuizSchema);
