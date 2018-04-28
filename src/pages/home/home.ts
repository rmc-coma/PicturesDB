import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public rep: any;

  constructor(public navCtrl: NavController, private http: HttpClient) {

  }

  ionViewDidEnter()
  {
    this.http.get("/api/routes").subscribe(
      (response) => {
        this.rep = response;
        return this.rep;
      }
    );
  }
}
