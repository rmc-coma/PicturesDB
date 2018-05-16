import { UserSessionType, LoginService } from './login.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { N9SessionService } from '@neo9/n9-angular2-session';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm: FormGroup;
  public placeHolder: {
    email: string,
    password: string
  };
  public displayPassword: Boolean = false;

  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder,
              private alertCtrl: AlertController,
              private sessionService: N9SessionService<UserSessionType>,
              private loginService: LoginService)
  {
    this.placeHolder = {
      email: 'Adresse e-mail',
      password: 'Mot de passe'
    };

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  switchDisplayPassword()
  {
    this.displayPassword = !this.displayPassword;
  }

  showLoginError()
  {
    this.alertCtrl.create({
      subTitle: 'Nom d\'utilisateur ou mot de passe incorrect',
      buttons: [
        {
          text: 'OK'
        }
      ]
    }).present();
  }

  submitLogin()
  {
    if (!this.loginForm.valid)
      return (this.showLoginError());
    this.loginService.login(
      this.loginForm.controls['email'].value,
      this.loginForm.controls['password'].value
    ).subscribe(
      (session) =>
      {
        this.sessionService.open(session, true).subscribe(
          (session) => 
          {
            return (session);
          }
        );
      },
      (error) =>
      {
        this.showLoginError();
      }
    );
    this.navCtrl.popToRoot(); //change
  }
}
