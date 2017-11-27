import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers} from '@angular/http';
import { AlertController } from 'ionic-angular';

import { LoginPage } from '../login/login'

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})

export class RegistroPage {

  disponible = null;
  registrado = null;

  nombre = "";
  apellidos = "";
  activo = true;
  role = 1;
  email = "";
  pass = "";

  constructor(
    private http : Http,
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController
  ) {
  }

  disponibilidad(nombre:string){
    var data = this.email;
    var header = new Headers({"Accept": "application/json" });

    this.http.get('http://localhost:3000/api/Usuarios/disponibilidad?email='+data,{headers:header}).subscribe(
      (response) => console.log(this.disponible = response.json().disponible),
      (error) => console.log(error)
    );
  }

  changeEmail() {
    let alert = this.alertCtrl.create({
      title: 'Change Email ',
      subTitle: 'This Email has been alredy been used',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  confirmUsr() {
    let alert = this.alertCtrl.create({
      title: 'Welcome to Weather-Bot ',
      subTitle: 'Please login!',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  regUser(){
    var js = {
    'nombre' : this.nombre,
    'apellidos' : this.apellidos,
    'activo' : this.activo,
    'role' : this.activo, //0 = admin, 1 = user
    'email' : this.email,
    'pass' : this.pass,
    'ciudadesFav' : []
  }
    var data = JSON.stringify(js);
    //console.log (data);
    var header = new Headers({"Content-Type":"application/json", "Accept": "application/json" })
    this.http.post('http://localhost:3000/api/Usuarios',data, {headers: header}).subscribe(
      (response) => console.log(this.disponible = response.json().activo),
      (error) => console.log(error)
    );
  }

  ionViewDidLoad() {
  }

  ngDoCheck() {
    if(this.disponible == false){
      this.changeEmail();
      this.disponible = null;
    }
    if(this.disponible == true){
      this.regUser();
      this.confirmUsr();
      this.disponible = null;
      this.navCtrl.push(LoginPage);
    }
  }

}
