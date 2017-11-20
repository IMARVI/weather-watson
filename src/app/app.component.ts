import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';
//cargas tus paginas
import { LoginPage } from '../pages/login/login';
import { UserPage } from '../pages/user/user';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //especificas cual va a ser tu pagina inicial
  @ViewChild(Nav) nav: Nav;
  rootPage:any;

  constructor(platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public nativeStorage: NativeStorage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      let env = this;
      this.nativeStorage.getItem('user')
      .then( function (data) {
        env.nav.push(UserPage);
        env.splashScreen.hide();
      }, function (error) {
        env.nav.push(LoginPage);
        env.splashScreen.hide();
      })
      this.statusBar.styleDefault();
    });
  }
}

