import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { CreatePage } from '../pages/create/create';
import { QuizPage } from '../pages/quiz/quiz';
import { ChatPage } from '../pages/chat/chat';
import { LoginPage } from '../pages/login-page/login-page';
import { GameLobbyPage } from '../pages/game-lobby/game-lobby';
import { SignupPage } from '../pages/signup-page/signup-page';
import { Quiz } from '../providers/quiz';
import { Auth } from '../providers/auth';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CreatePage,
    QuizPage,
    LoginPage,
    SignupPage,
    ChatPage,
    GameLobbyPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CreatePage,
    QuizPage,
    LoginPage,
    SignupPage,
    ChatPage,
    GameLobbyPage
  ],
  providers: [Storage, Quiz, Auth]
})
export class AppModule {}
