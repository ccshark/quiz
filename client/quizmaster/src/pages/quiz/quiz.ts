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
      var quizData = JSON.parse(dataString).results[0];

      quizData.options = [quizData.incorrect_answers[0], quizData.incorrect_answers[1], quizData.incorrect_answers[2], quizData.correct_answer];
      console.log(quizData);
      this.quiz = quizData;
      //JSON.stringify(data);
      //console.log(data.results[0]);
    //  console.log(JSON.parse(data));
      //this.quiz = data.results[0];

          //var index = this.randomQuiz(data);
          //this.quiz = data[index];
          //console.log(this.quiz.options);
    }, (err) => {
        console.log("not allowed");
    });
  }

  randomQuiz(data:any) {
    console.log("loo")
    return Math.floor((Math.random() * data.length));
    //var index;
    /*
    if(random in this.usedQuestions) {
      console.log("in array");
      this.randomQuiz(data);
    } else {
      console.log("add to array");
      this.usedQuestions.push(random);
      return random;
    } */
  }

  answare(option) {
    var answare = this.quiz.options.indexOf(option);
    console.log(answare);
    if(answare == 0) {
    }
    /*this.quizService.answareQuiz(option)
      .then((data) => {
          console.log(data);
    }, (err) => {
        console.log("not allowed");
    }); */
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
