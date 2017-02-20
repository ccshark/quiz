import { Component } from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Quiz } from '../../providers/quiz';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login-page/login-page';

@Component({
  selector: 'create-page',
  templateUrl: 'create.html'
})
export class CreatePage {

  quiz: any;
  loading: any;

  question: String;
  a1: String;
  a2: String;
  a3: String;
  a4: String;

  constructor(public navCtrl: NavController, public quizService: Quiz, public modalCtrl: ModalController,
    public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController) {

  }

  createQuestion() {
    var quiz = {
      question: this.question,
      answare1: this.a1,
      answare2: this.a2,
      answare3: this.a3,
      answare4: this.a4
    }

    this.quizService.createQuiz(quiz).then((result) => {
        this.loading.dismiss();
        this.quiz = result;
        console.log("Question created");
    }, (err) => {
        this.loading.dismiss();
        console.log("not allowed");
    });


  }

}
