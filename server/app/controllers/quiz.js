var Quiz = require('../models/quiz');
var request = require("request");

exports.getQuiz = function(req, res, next){
    var category = req.params.category;
    console.log(category);
    request("https://opentdb.com/api.php?amount=1&category=" + category + "&difficulty=easy&type=multiple", function(error, response, body) {
      console.log(JSON.parse(body).results[0]);
      res.json(JSON.parse(body));
    });
    /*Quiz.find(function(err, quiz) {
        if (err){
            res.send(err);
        }
        console.log(quiz);
        res.json(quiz);
    }); */
}

exports.answareQuiz = function(req, res, next){
    console.log(req.body.answare);
    Quiz.find(function(err, quiz) {
        if (err){
            res.send(err);
        }
        console.log(quiz);
        res.json(quiz);
    });
}

exports.createQuiz = function(req, res, next){
  console.log(req.body.question);
  console.log(req.body.options);
    Quiz.create({
        question : req.body.question,
        options : req.body.options
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
