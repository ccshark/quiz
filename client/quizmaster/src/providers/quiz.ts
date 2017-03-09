import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from './auth';
import 'rxjs/add/operator/map';

@Injectable()
export class Quiz {

  constructor(public http: Http, public authService: Auth) {

  }

  getQuiz(category){
    return new Promise((resolve, reject) => {
      console.log(category);
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.get('http://127.0.0.1:8080/api/quiz/' + category, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });

  }

  answareQuiz(answare) {
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.post('http://127.0.0.1:8080/api/quiz/answare', answare, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  createQuiz(quiz){
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);
      console.log(quiz);
      this.http.post('http://127.0.0.1:8080/api/quiz/create', JSON.stringify(quiz), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });

    });

  }

  deleteQuiz(id){

    return new Promise((resolve, reject) => {

        let headers = new Headers();
        headers.append('Authorization', this.authService.token);

        this.http.delete('https://YOUR_HEROKU_APP.herokuapp.com/api/quiz/' + id, {headers: headers}).subscribe((res) => {
            resolve(res);
        }, (err) => {
            reject(err);
        });

    });

  }

}
