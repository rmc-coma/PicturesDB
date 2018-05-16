import { LoginPage } from './../login/login';
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { UserSessionType } from './../login/login.service';
import { N9SessionService } from '@neo9/n9-angular2-session';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage
{

  constructor(public navCtrl: NavController,
              private http: HttpClient,
              public sessionService: N9SessionService<UserSessionType>)
  {

  }

  ionViewDidEnter()
  {
    this.navCtrl.setRoot(LoginPage);
  }

  //ionViewDidEnter()
  //{
  //  this.http.get("/api/routes").subscribe(
  //    (response) => {
  //      this.rep = response;
  //      return (this.rep);
  //    }
  //  );
  //}
}
