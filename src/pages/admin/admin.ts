import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Http, Headers, Response} from '@angular/http';
import { DetalleUsuarioPage } from '../detalle-usuario/detalle-usuario';
import { TarjetaModel } from '../../models/tarjeta-model';
import { ClimaService } from '../../providers/clima-service/clima-service';
import { LoginPage } from '../login/login';


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
  id: string;
  nombre = "";
  apellidos = "";
  activo = false;
  role = 1;
  email = "";
  pass = "";


  constructor(private http : Http, public navCtrl: NavController, public navParams: NavParams, public climaService: ClimaService) {
      this.id = navParams.get('id');
  }


  ionViewDidLoad() {
    var header = new Headers({"Accept": "application/json" })
    this.http.get('http://localhost:3000/api/Usuarios',{headers:header}).map(
      (response: Response) => {
        return response.json();
      }).subscribe(
        (response) => console.log(this.datosUsrs = response),
        (error) => console.log(error)
    );
  }

  ionViewDidEnter() {
    var header = new Headers({"Accept": "application/json" })
    this.http.get('http://localhost:3000/api/Usuarios',{headers:header}).map(
      (response: Response) => {
        return response.json();
      }).subscribe(
        (response) => console.log(this.datosUsrs = response),
        (error) => console.log(error)
    ); 
  }


  detalleUsr(usr:any) {
    this.navCtrl.push(DetalleUsuarioPage,{
      datos : usr
    });
  }

  goToLogin() {
    this.id = null;
    this.navCtrl.push(LoginPage);
  }
}
