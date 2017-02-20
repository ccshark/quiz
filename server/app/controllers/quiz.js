var Quiz = require('../models/quiz');

exports.getQuiz = function(req, res, next){
    Quiz.find(function(err, quiz) {
        if (err){
            res.send(err);
        }
        console.log(quiz);
        res.json(quiz);
    });
}

exports.createQuiz = function(req, res, next){
  console.log("loo");
  console.log(req.body.question);
    Quiz.create({
        question : req.body.question,
        answare1 : req.body.answare1,
        answare2 : req.body.answare2,
        answare3 : req.body.answare3,
        answare4 : req.body.answare4
    }, function(err, quiz) {
        if (err){
            res.send(err);
        }
        Quiz.find(function(err, quiz) {
            if (err){
                res.send(err);
            }
            res.json(quiz);
        });
    });
}

exports.deleteQuiz = function(req, res, next){
    Quiz.remove({
        _id : req.params.quiz_id
    }, function(err, quiz) {
        res.json(quiz);
    });
}
