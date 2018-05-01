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
  public  buttonText: string;
  private loggedIn: boolean;
  private tmp: any;

  constructor(public navCtrl: NavController,
              private http: HttpClient,
              public sessionService: N9SessionService<UserSessionType>)
  {
    this.loggedIn = false;
    this.buttonText = "Log in";
  }

  buttonTapped()
  {
    if (!this.loggedIn)
      this.navCtrl.push(LoginPage);
  }

  ionViewDidEnter()
  {
    if ((this.tmp = localStorage.getItem("loggedIn")) == "true")
    {
      this.buttonText = "Logged in";
      this.loggedIn = true;
    }
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
