import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detalle-usuario',
  templateUrl: 'detalle-usuario.html',
})
export class DetalleUsuarioPage {

  datos: any

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.datos = navParams.get('datos');
    console.log(this.datos);
  }

  ionViewDidLoad() {
  }
}
