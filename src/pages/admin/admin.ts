import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { UserModel } from '../../models/user';
import { Http, Response, HttpModule, Headers } from '@angular/http';

/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import { TarjetaModel } from '../../models/tarjeta-model'
import { ClimaService } from '../../providers/clima-service/clima-service';

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
    providers: [ClimaService, Platform],
})
export class AdminPage {
  datosClima: any;
  user = new UserModel("","",true,1,"","",null);
  activo = true;

  constructor(private http : Http, public navCtrl: NavController, public navParams: NavParams, public climaService: ClimaService,) {
  }

  ionViewDidLoad() {
  }

  regUser(){
    var data = JSON.stringify({
      "nombre" : this.user.nombre,
      "pellido" : this.user.apellido,
      "activo" : this.user.activo,
      "role" : this.user.activo, //0 = admin, 1 = user
      "email" : this.user.email,
      "pass" : this.user.pass,
      "ciudadesFav" : null
    });
    this.http.post('http://localhost:3000/api/Usuarios',data,{
      headers: new Headers().set( Accept : "pplication/json")
    }).subscribe();
  }

  ngDoCheck() {
    if(this.datosClima != null){
      let nuevoClima = new TarjetaModel(
        this.datosClima.display_location.full,
        this.datosClima.feelslike_c,
        this.datosClima.image.url,
        this.datosClima.precip_today_metric,
        this.datosClima.relative_humidity,
        this.datosClima.wind_kph
      );

      this.datosClima = null;
      //console.log(this.datosClima.display_location.city);
      //console.log(this.datosClima);
    }
  }

}
