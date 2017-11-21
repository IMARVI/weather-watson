import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, NavController } from 'ionic-angular';
import {TarjetaModel} from '../../models/tarjeta-model';
import { Http, Headers} from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-add-task-modal',
  templateUrl: 'add-task-modal.html',
})
export class AddTaskModalPage {
  public agregar: boolean;
  public info: TarjetaModel;
  private ciudades:string[];
  private cf: string[];
  private id: string;

  constructor(
    private http:Http,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    private navCtrl: NavController
  ) {
    this.info = navParams.get('item');
    this.agregar = navParams.get('agregar');
    this.ciudades = navParams.get('ciudades');
    this.id = navParams.get('id');
    console.log(this.ciudades);

  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  agregarCiudad(ciudad:string){
    //console.log(this.ciudades[0]["location"]["city"]);
    var aux = this.convertirArreglo();
    aux.push(ciudad);

    var js = {
      'ciudadesFav' : aux
    }
    var data = JSON.stringify(js);
    console.log(data);
    var header = new Headers({"Content-Type":"application/json"})
    this.http.patch('http://localhost:3000/api/Usuarios/'+this.id, data, {headers: header}).subscribe();
    this.navCtrl.pop();
  }

  eliminarCiudad(ciudad:string){
    var aux = this.convertirArreglo();
    var nuevo= [];
    console.log(ciudad);
    console.log(aux);

    for(var x = 0; x < aux.length; x++){
      console.log(aux[x]);
      console.log(ciudad);
      if (aux[x]!= ciudad){
        nuevo.push(this.ciudades[x]["location"]["city"]+", "+this.ciudades[x]["location"]["region"]);
      }
    }
    console.log(nuevo);

    var js = {
      'ciudadesFav' : nuevo
    }

    var data = JSON.stringify(js);
    console.log(data);
    var header = new Headers({"Content-Type":"application/json"})
    this.http.patch('http://localhost:3000/api/Usuarios/'+this.id, data, {headers: header}).subscribe();
    this.navCtrl.pop();
  }

  convertirArreglo(){
    var aux = [];
    for(var x = 0; x < this.ciudades.length;x++){
      //console.log(this.ciudades[x]["location"]["city"]);
      aux.push(this.ciudades[x]["location"]["city"]+", "+this.ciudades[x]["location"]["region"]);
      //console.log(aux[x]);
    }
    return aux;
  }

}
