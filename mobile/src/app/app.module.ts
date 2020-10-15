import { ListRegistersPageModule } from './../pages/list-registers/list-registers.module';
import { MyRegistersPageModule } from './../pages/my-registers/my-registers.module';
import { ProfilePageModule } from './../pages/profile/profile.module';
import { CreateRegisterPageModule } from './../pages/create-register/create-register.module';
import { RegisterPageModule } from './../pages/register/register.module';
import { LoginPageModule } from './../pages/login/login.module';
import { UniqueRegisterPage } from './../pages/unique-register/unique-register';
import { ListRegistersPage } from './../pages/list-registers/list-registers';
import { MyRegistersPage } from './../pages/my-registers/my-registers';
import { CreateRegisterPage } from './../pages/create-register/create-register';
import { RegisterPage } from './../pages/register/register';
import { LoginPage } from './../pages/login/login';
import { HttpModule } from "@angular/http";
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { IonicStorageModule } from '@ionic/storage';

import { Geolocation } from '@ionic-native/geolocation';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ApiProvider } from '../providers/api/api';
import { ProfilePage } from '../pages/profile/profile';
import { LocaleProvider } from '../providers/locale/locale';
import { UniqueRegisterPageModule } from '../pages/unique-register/unique-register.module';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    LoginPageModule,
    RegisterPageModule,
    CreateRegisterPageModule,
    ProfilePageModule,
    MyRegistersPageModule,
    ListRegistersPageModule,
    UniqueRegisterPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    CreateRegisterPage,
    ProfilePage,
    ListRegistersPage,
    MyRegistersPage,
    UniqueRegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    LocaleProvider
  ]
})
export class AppModule { }
