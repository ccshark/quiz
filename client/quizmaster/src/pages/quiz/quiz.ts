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
          var index = this.randomQuiz(data);
          this.quiz = data[index];
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
