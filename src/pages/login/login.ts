import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { HomePage } from '../home/home';
import { AdminPage } from '../admin/admin';
import { RegistroPage } from '../registro/registro';
import { Http, Headers} from '@angular/http';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  userData = null;
  email: string;
  pass: string;
  userdb = null;

  constructor(
    private http : Http,
    private alertCtrl: AlertController,
    private facebook: Facebook,
    public navCtrl: NavController) {
    }

  goToHome(id:string){
    this.navCtrl.push(HomePage,{
      id: id
    });
  }

  goToAdmin(){
    this.navCtrl.push(AdminPage);
  }

  verifyCredentials(mail:string, password:string){
    var data = this.email;
    var header = new Headers({"Accept": "application/json" });

    this.http.get('http://localhost:3000/api/Usuarios/login?email='+data,{headers:header}).subscribe(
      (response) => this.userdb = response.json(),
      (error) => console.log(error)
    );
  }

  loginWithFB() {
    this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        this.userData = {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']};
      })
    })
  }

  ngDoCheck() {
    if(this.userdb != null){
      if(this.userdb.usr.length> 0){
        var pass = this.userdb.usr[0]["pass"];
        if(pass == this.pass){
          if(this.userdb.usr[0]["role"] == 0){
            this.goToAdmin();
          }else{
            this.goToHome(this.userdb.usr[0]["id"]);
          }
        }else{
          this.wrongData();
        }
      }else{
        this.wrongData();
      }
      this.userdb = null;
    }
  }

  wrongData() {
    let alert = this.alertCtrl.create({
      title: 'Authentication Error',
      subTitle: 'Wrong email or password!',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  registrar(){
    this.navCtrl.push( RegistroPage );
  }
}
