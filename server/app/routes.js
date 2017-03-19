var AuthenticationController = require('./controllers/authentication'),
    QuizController = require('./controllers/quiz'),
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');

var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});

module.exports = function(app){

    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        quizRoutes = express.Router();

    // Auth Routes
    apiRoutes.use('/auth', authRoutes);

    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);

    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });

    // Quiz Routes
    apiRoutes.use('/quiz', quizRoutes);

    quizRoutes.get('/:category', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), QuizController.getQuiz);
    quizRoutes.get('/start', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), QuizController.startQuiz);
    quizRoutes.post('/answare', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), QuizController.answareQuiz);
    quizRoutes.post('/create', requireAuth, AuthenticationController.roleAuthorization(['creator','editor']), QuizController.createQuiz);
    quizRoutes.delete('/:quiz_id', requireAuth, AuthenticationController.roleAuthorization(['editor', 'creator']), QuizController.deleteQuiz);

    // Set up routes
    app.use('/api', apiRoutes);

}
