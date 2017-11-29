import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers} from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-detalle-usuario',
  templateUrl: 'detalle-usuario.html',
})
export class DetalleUsuarioPage {

  usuario: any;
  n_user: boolean;

  constructor(private http : Http,public navCtrl: NavController, public navParams: NavParams) {
    this.usuario = navParams.get('datos');
    if(!this.usuario) {
      this.n_user = true;
      this.usuario = {
        'nombre' : "",
        'apellidos' : "",
        'activo' : "",
        'role' : "", //0 = admin, 1 = user
        'email' : "",
        'pass' : "",
        'ciudadesFav' : []
      }
    }
    console.log(this.usuario);
  }

  ionViewDidLoad() {
  }


  new_user() {
    var data = JSON.stringify(this.usuario);
    var header = new Headers({"Content-Type":"application/json", "Accept": "application/json" })
    this.http.post('http://localhost:3000/api/Usuarios',data, {headers: header}).subscribe();
    this.navCtrl.pop();
  }

  save(id){
    var data = JSON.stringify(this.usuario);
    var header = new Headers({"Content-Type":"application/json", "Accept": "application/json" })
    this.http.patch('http://localhost:3000/api/Usuarios/'+id,data, {headers: header}).subscribe();
    this.navCtrl.pop();

  }

  delete(id){
    var data = JSON.stringify(this.usuario);
    var header = new Headers({"Content-Type":"application/json", "Accept": "application/json" })
    this.http.delete('http://localhost:3000/api/Usuarios/'+id, {headers: header}).subscribe();
    this.navCtrl.pop();

  }
}
