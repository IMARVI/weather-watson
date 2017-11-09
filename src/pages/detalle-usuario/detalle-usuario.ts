import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, Response} from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-detalle-usuario',
  templateUrl: 'detalle-usuario.html',
})
export class DetalleUsuarioPage {

  usuario: any

  constructor(private http : Http,public navCtrl: NavController, public navParams: NavParams) {
    this.usuario = navParams.get('datos');
    console.log(this.usuario);
  }

  ionViewDidLoad() {
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
    this.http.delete('http://localhost:3000/api/Usuarios/'+id).subscribe();
    this.navCtrl.pop();
    
  }
}
