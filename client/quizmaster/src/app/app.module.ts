import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { CreatePage } from '../pages/create/create';
import { LoginPage } from '../pages/login-page/login-page';
import { SignupPage } from '../pages/signup-page/signup-page';
import { Quiz } from '../providers/quiz';
import { Auth } from '../providers/auth';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CreatePage,
    LoginPage,
    SignupPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CreatePage,
    LoginPage,
    SignupPage
  ],
  providers: [Storage, Quiz, Auth]
})
export class AppModule {}
