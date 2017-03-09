import { Component } from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Quiz } from '../../providers/quiz';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login-page/login-page';

@Component({
  selector: 'quiz-page',
  templateUrl: 'quiz.html'
})
export class QuizPage {

  quiz: any;
  loading: any;
  quizCount: Number = 0;
  maxCount: Number = 3;
  usedQuestions: Array<number>;
  itemclass = '';


  constructor(public navCtrl: NavController, public quizService: Quiz, public modalCtrl: ModalController,
    public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad(){
    if(this.quizCount < this.maxCount) {
        this.getQuiz();
    }
  }


  getQuiz() {
    this.quizService.getQuiz().then((data) => {
      var dataString = JSON.stringify(data);
      //var dataEscaped = dataString.replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&#039;/g, "'");
      //var dataEscaped = dataString.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
      //var dataEscaped = dataString.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace("&#039;", /'/g);
      //var dataEscaped = dataString.replace(/&/g, "&amp;")
      //console.log(dataEscaped);
      var quizData = JSON.parse(dataString).results[0];

      var options = [{name: quizData.incorrect_answers[0], class: "answare"}, {name: quizData.incorrect_answers[1], class: "answare"}, {name: quizData.incorrect_answers[2], class: "answare"}, {name: quizData.correct_answer, class: "answare"}];

      quizData.options = this.random(options);

      console.log(quizData);
      this.quiz = quizData;
    }, (err) => {
        console.log("not allowed");
    });
  }

  random(array:any) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  answare(option) {
    console.log(option);

    if(option.name == this.quiz.correct_answer) {
      option.class = option.class + " correct";
      this.getQuiz();
    } else {
      option.class = option.class + " incorrect";
      this.getQuiz();
    }
  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }

  logout(){

    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);

  }

}
