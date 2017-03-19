import { Component } from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Quiz } from '../../providers/quiz';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login-page/login-page';
import { CreatePage } from '../create/create';
import { QuizPage } from '../quiz/quiz';
import { ChatPage } from '../chat/chat';
import { GameLobbyPage } from '../game-lobby/game-lobby';
import * as io from 'socket.io-client';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  quiz: any;
  loading: any;
  socket: any;

  constructor(public navCtrl: NavController, public quizService: Quiz, public modalCtrl: ModalController,
    public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController) {
      this.socket = io('http://localhost:8080');
  }

  ionViewDidLoad(){

    /*this.quizService.getQuiz().then((data) => {
          this.quiz = data;
    }, (err) => {
        console.log("not allowed");
    }); */

  }

  startChat() {
    this.navCtrl.push(ChatPage);
  }

  createGame(gameRoom) {
    this.navCtrl.push(GameLobbyPage, {
    param1: gameRoom});
  }

  joinGame(gameRoom) {
    console.log(gameRoom);
    //this.navCtrl.push(QuizPage);
  }

  addQuiz(){
    this.navCtrl.push(CreatePage);
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
