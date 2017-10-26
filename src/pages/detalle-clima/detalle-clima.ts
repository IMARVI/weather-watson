import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetalleClimaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-clima',
  templateUrl: 'detalle-clima.html',
})
export class DetalleClimaPage {
  detalle: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
     this.detalle = navParams.get('datos');  
  }

  ionViewDidLoad() {
    console.log(this.detalle);
  }

}
