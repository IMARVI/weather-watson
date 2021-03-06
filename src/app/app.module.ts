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
import { NativeStorage } from '@ionic-native/native-storage';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { UserPage } from '../pages/user/user';
import { HomePage } from '../pages/home/home';
import { DetalleClimaPage } from '../pages/detalle-clima/detalle-clima';
import { DetalleUsuarioPage } from '../pages/detalle-usuario/detalle-usuario';
import { AdminPage } from '../pages/admin/admin';
import { RegistroPage } from '../pages/registro/registro';


import { AddTaskModalPage } from '../pages/add-task-modal/add-task-modal';
import { ClimaService }from '../providers/clima-service/clima-service';
import { WatsonService }from '../providers/watson-service/watson-service';

import { Chart } from 'chart.js';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    DetalleClimaPage,
    DetalleUsuarioPage,
    AddTaskModalPage,
    RegistroPage,
    AdminPage,
    UserPage
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
    UserPage,
    DetalleClimaPage,
    DetalleUsuarioPage,
    AddTaskModalPage,
    RegistroPage,
    AdminPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ClimaService,
    WatsonService,
    Facebook,
    Geolocation,
    NativeStorage
  ]
})
export class AppModule {};
