import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { HttpClientModule }  from '@angular/common/http';

import { Facebook } from '@ionic-native/facebook';

import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { DetalleClimaPage } from '../pages/detalle-clima/detalle-clima';
import { AdminPage } from '../pages/admin/admin';

import { AddTaskModalPage } from '../pages/add-task-modal/add-task-modal';
import { ClimaService }from '../providers/clima-service/clima-service';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    DetalleClimaPage,
    AddTaskModalPage,
    AdminPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    DetalleClimaPage,
    AddTaskModalPage,
    AdminPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ClimaService,
    Facebook,
    Geolocation,

  ]
})
export class AppModule {};
