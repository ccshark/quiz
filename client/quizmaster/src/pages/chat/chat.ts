import { Component } from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Quiz } from '../../providers/quiz';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login-page/login-page';
import * as io from 'socket.io-client';


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {
  socket:any
  chat_input:string;
  chats = [];

  constructor(public navCtrl: NavController, public quizService: Quiz, public modalCtrl: ModalController,
    public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController) {
    this.socket = io('http://localhost:8080');

    this.socket.on('message', (msg) => {
      console.log("message", msg);
      this.chats.push(msg);
    });
  }

  send(msg) {
        if(msg != ''){
            this.socket.emit('message', msg);
        }
        this.chat_input = '';
    }
}
