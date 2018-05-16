import { UserSessionType } from './../pages/login/login.service';
import { N9SessionService } from '@neo9/n9-angular2-session';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  private rootPage: any = HomePage;
  private loggedIn: boolean = false;
  private userSession: UserSessionType;

  constructor(private platform: Platform,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private sessionService: N9SessionService<UserSessionType>)
  {
    platform.ready().then(
      () =>
      {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
        this.sessionService.load().subscribe();
      }
    );

    this.sessionService.getLoggedOut().subscribe(
      (session) =>
      {
        this.nav.setRoot(HomePage);
        this.loggedIn = false;
      }
    );

    this.sessionService.getLoggedIn().do(
      (session: UserSessionType) =>
      {
        if (!(this.userSession = session))
          return (this.nav.setRoot(HomePage));
      }
    ).subscribe();
  }
}

