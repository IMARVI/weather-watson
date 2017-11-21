import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AdminPage } from '../admin/admin';
import { RegistroPage } from '../registro/registro';
import { Http, Headers} from '@angular/http';
import { AlertController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  userData = null;
  email: string;
  pass: string;
  userdb = null;
  FB_APP_ID: number = 1954803271511700;

  constructor(
    private http : Http,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public fb: Facebook,
    public nativeStorage: NativeStorage) {
      this.fb.browserInit(this.FB_APP_ID, "v2.8");
    }

  goToHome(id:string){
    this.navCtrl.push(HomePage,{
      id: id,
      data: this.userdb.usr[0]
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

  ngDoCheck() {
    if(this.userdb != null){
      if(this.userdb.usr.length> 0){
        var pass = this.userdb.usr[0]["pass"];
        if(pass == this.pass){
          if(this.userdb.usr[0]["role"] == 0){
            this.goToAdmin();
          }else{
            this.goToHome(
              this.userdb.usr[0]["id"]

            );
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

  doFbLogin(){
    let permissions = new Array<string>();
    let nav = this.navCtrl;

    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];

    this.fb.login(permissions)
    .then((response) => {
      let userId = response.authResponse.userID;
      let params = new Array<string>();

      //Getting name and gender properties
      this.fb.api("/me?fields=name,gender", params)
      .then((user) => {
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        //now we have the users info, let's save it in the NativeStorage
        this.nativeStorage.setItem('user',
        {
          name: user.name,
          gender: user.gender,
          picture: user.picture
        })
        .then(() => {
          //nav.push(UserPage);
          console.log("Success");
        },(error) => {
          console.log(error);
        })
      })
    }, (error) => {
      console.log(error);
    });
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
