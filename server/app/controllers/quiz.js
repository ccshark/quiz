var Quiz = require('../models/quiz');
var request = require("request");

exports.getQuiz = function(req, res, next){
    var category = req.params.category;
    request("https://opentdb.com/api.php?amount=1&category=" + category + "&difficulty=easy&type=multiple", function(error, response, body) {
      console.log(JSON.parse(body).results[0]);
      res.json(JSON.parse(body));
    });
    //TODO: Spara ner frågor i egen databas för att föra statistik
    /*Quiz.find(function(err, quiz) {
        if (err){
            res.send(err);
        }
        console.log(quiz);
        res.json(quiz);
    }); */
}

exports.answareQuiz = function(req, res, next){
    Quiz.find(function(err, quiz) {
        if (err){
            res.send(err);
        }
        console.log(quiz);
        res.json(quiz);
    });
}

exports.createQuiz = function(req, res, next){

  //TODO: ska mappas mot trivia api't för att skapa frågor
  /*console.log(req.body.question);
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
    }); */
}

exports.deleteQuiz = function(req, res, next){
  //TODO ska nog inte finnas med
    Quiz.remove({
        _id : req.params.quiz_id
    }, function(err, quiz) {
        res.json(quiz);
    });
}
