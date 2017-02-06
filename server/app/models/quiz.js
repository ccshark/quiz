var mongoose = require('mongoose');

var QuizSchema = new mongoose.Schema({
    question: String,
    answare1: String,
    answare2: String,
    answare3: String,
    answare4: String,
    author: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Quiz', QuizSchema);
