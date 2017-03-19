import { Component } from "@angular/core";
import { NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Quiz } from '../../providers/quiz';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login-page/login-page';
import * as io from 'socket.io-client';


@Component({
  selector: 'page-game-lobby',
  templateUrl: 'game-lobby.html'
})
export class GameLobbyPage {
  socket:any
  room:String;

  constructor(public navCtrl: NavController, public quizService: Quiz, public modalCtrl: ModalController,
    public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController,  private navParams: NavParams,) {
    this.socket = io('http://localhost:8080');
    this.room = navParams.get('param1');

    
    this.socket.on('connect', function() {
   // Connected, let's sign-up for to receive messages for this room
       this.socket.emit('room', this.room);
     });

     this.socket.on('message', function(data) {
       console.log('Incoming message:', data);
     });
  }

  send(msg) {
      /*  if(msg != ''){
            this.socket.emit('message', msg);
        }
        this.chat_input = ''; */
    }
}
