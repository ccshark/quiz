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
  quizCount = 1;
  maxCount: Number = 3;
  usedQuestions: Array<number>;
  itemclass = '';
  showCategory = true;
  showQuiz = false;

  category:Number;
  categoryPool:any;
  categories:any = ['general knowledge',
                    'books',
                    'film',
                    'music',
                    'musical theatres',
                    'television',
                    'video games',
                    'board games',
                    'science & nature',
                    'computers',
                    'mathematics',
                    'mythology',
                    'sports',
                    'geography',
                    'history',
                    'politics',
                    'art',
                    'celebrities',
                    'animals',
                    'veihcles',
                    'comics',
                    'gadgets',
                    'japanese anime & manga',
                    'cartoon & animations'
                  ];


  constructor(public navCtrl: NavController, public quizService: Quiz, public modalCtrl: ModalController,
    public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad(){
    //if(this.quizCount < this.maxCount) {
        this.setCategoryPool();
    //}
  }

  setCategoryPool() {
    this.categoryPool = [];
    for(var i = 0; i < 3; i++) {
        this.randomCategory();
    }
  }

  randomCategory() {
    var rand = Math.floor(Math.random() * this.categories.length);
    if(this.categoryPool.indexOf(this.categories[rand]) == -1) {
      this.categoryPool.push(this.categories[rand]);
    } else {
      this.randomCategory();
    }
  }

  selectCategory(category) {
    this.category = this.categories.indexOf(category) + 9;
    this.getQuiz();
  }

  getQuiz() {
    this.quizService.getQuiz(this.category).then((data) => {
      var dataString = JSON.stringify(data);
      //var dataEscaped = dataString.replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&#039;/g, "'");
      //var dataEscaped = dataString.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
      //var dataEscaped = dataString.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace("&#039;", /'/g);
      //var dataEscaped = dataString.replace(/&/g, "&amp;")
      //console.log(dataEscaped);
      var quizData = JSON.parse(dataString).results[0];
      var options = [{name: quizData.incorrect_answers[0], class: "answare"}, {name: quizData.incorrect_answers[1], class: "answare"}, {name: quizData.incorrect_answers[2], class: "answare"}, {name: quizData.correct_answer, class: "answare"}];
      quizData.options = this.random(options);
      this.quiz = quizData;

      this.showQuiz = true;
      this.showCategory = false;
    }, (err) => {
        console.log("not allowed");
    });
  }

  random(array:any) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  answare(option) {
    if(option.name == this.quiz.correct_answer) {
      option.class = option.class + " correct";
      this.updateQuiz();
    } else {
      option.class = option.class + " incorrect";
      this.updateQuiz();
    }
  }

  updateQuiz() {
    this.showQuiz = false;
    if(this.quizCount < this.maxCount) {
      this.quizCount++;
      this.getQuiz();
    } else {
      setTimeout(() => {
        this.quizCount = 1;
        this.showCategory = true;
        this.setCategoryPool();
        this.quiz = [];
    }, 800);

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
