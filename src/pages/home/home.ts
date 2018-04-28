import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public rep: any;

  constructor(public navCtrl: NavController, private http: Http) {

  }

  ionViewDidEnter()
  {
    this.http.get("api/root").subscribe(
      response => {
        this.rep = (response);
      }
    );
    return this.rep;
  }
}
