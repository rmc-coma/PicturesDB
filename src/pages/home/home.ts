import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController } from 'ionic-angular';
import { map } from 'rxjs/operators';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public rep: any;

  constructor(public navCtrl: NavController, private http: Http) {
    this.http.get('http://46.101.55.225:6686/routes').pipe(
      map(res => res.json())
    ).subscribe(
      response => {
        //this.response = response;
        //console.log(response);
        this.rep = response;
      }
    );
  }

  kek()
  {

    console.log(this.rep);
  }
}
