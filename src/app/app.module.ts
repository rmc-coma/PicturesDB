import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { JsonPipe } from '@angular/common';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { UserSessionType } from './../pages/login/login.service';
import { LoginPageModule } from './../pages/login/login.module';

import { storeFactory, N9StorageModule, N9StorageService, } from '@neo9/n9-angular2-storage';
import { N9SessionModule } from '@neo9/n9-angular2-session';
import { IonicStorageModule, Storage } from "@ionic/storage";


@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    N9SessionModule.forRoot<UserSessionType>(),
    N9StorageModule.forRoot({
      loader: {
        provide: N9StorageService,
        useFactory: (storeFactory),
        deps: [Storage]        
      }
    }),
    HttpClientModule,
    LoginPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
