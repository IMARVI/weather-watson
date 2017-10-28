import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams,    public climaService: ClimaService,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
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
