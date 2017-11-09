import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { UserModel } from '../../models/user';
import { Http, Headers, Response} from '@angular/http';
import { DetalleUsuarioPage } from '../detalle-usuario/detalle-usuario';



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
  datosUsrs: any;

  nuevo = false;
  verUsrs = false;

  nombre = "";
  apellidos = "";
  activo = false;
  role = 1;
  email = "";
  pass = "";


  constructor(private http : Http, public navCtrl: NavController, public navParams: NavParams, public climaService: ClimaService,) {
  }

  ionViewDidLoad() {
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
    console.log (data);
    var header = new Headers({"Content-Type":"application/json", "Accept": "application/json" })
    this.http.post('http://localhost:3000/api/Usuarios',data, {headers: header}).subscribe();

    this.nuevo = false;
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

  showNewUsr(){
    this.nuevo= true;
    this.verUsrs=false;
  }

  detalleUsr(usr:any){
    this.navCtrl.push(DetalleUsuarioPage,{
      datos : usr
    });
  }


  verUsr(){
    var header = new Headers({"Accept": "application/json" })
    this.http.get('http://localhost:3000/api/Usuarios',{headers:header}).map(
      (response: Response) => {
        return response.json();
      }).subscribe(
        (response) => console.log(this.datosUsrs = response),
        (error) => console.log(error)
    );
    this.verUsrs = true;
    this.nuevo = false;
  }

}
