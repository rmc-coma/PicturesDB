import { LoginService } from './../login/login.service';
import { SigninService } from './signin.service';
import { UserSessionType } from './../home/login.service';
import { N9SessionService } from '@neo9/n9-angular2-session';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  public signinForm: FormGroup;
  public placeHolder: {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    code: string
  }
  public displayPassword: Boolean = false;

  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder,
              private alertCtrl: AlertController,
              private sessionService: N9SessionService<UserSessionType>,
              private loginService: LoginService,
              private signinService: SigninService)
  {
    this.placeHolder = {
      firstname: 'Prénom',
      lastname: 'Nom',
      email: 'Adresse e-mail',
      password: 'Mot de passe',
      code: 'Code d\'inscription'
    };

    this.signinForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      code: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    }, { validator: this.checkPasswordsMatch })
  }

  checkPasswordsMatch(fg: FormGroup): Boolean
  {
    if (!fg.get('password').value || !fg.get('passwordConf').value)
      return (false);
    return (fg.get('password').value == fg.get('passwordConf').value);
  }

  switchDisplayPassword()
  {
    this.displayPassword = !this.displayPassword;
  }

  showSigninError()
  {
    var error:string;
    if (this.signinForm.controls['firstname'].invalid) {
      error = 'Le champs prénom est requis';
    }
    else if (this.signinForm.controls['lastname'].invalid) {
      error = 'Le champs nom est requis';
    }
    else if (this.signinForm.controls['email'].invalid) {
      error = 'Les données entrées dans le champs email sont invalides';
    }
    else if (this.signinForm.controls['password'].invalid) {
      error = 'Les données entrées dans le champs mot de passe sont invalides';
    }
    else if (this.signinForm.controls['code'].invalid) {
      error = 'Les données entrées dans le champs code sont invalides';
    }
    else {
      error = 'Les mots de passes ne correspondent pas';
    }
    this.alertCtrl.create({
      subTitle: error,
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
  }

  submitSignin()
  {
    if (!this.signinForm.valid)
      return (this.showSigninError());
    this.signinService.signin(
      this.signinForm.controls['firstname'].value,
      this.signinForm.controls['lastname'].value,
      this.signinForm.controls['email'].value,
      this.signinForm.controls['password'].value,
      this.signinForm.controls['code'].value
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
        this.showSigninError();
      }
    );
    this.navCtrl.popToRoot();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

}
