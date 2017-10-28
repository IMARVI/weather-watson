import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { LoginPage } from '../login/login';
import { DetalleClimaPage } from '../detalle-clima/detalle-clima';

import { TarjetaModel } from '../../models/tarjeta-model'
import { ClimaService } from '../../providers/clima-service/clima-service';
import { AddTaskModalPage } from '../add-task-modal/add-task-modal';

var Watson = require ('../../../node_modules/watson-developer-cloud/conversation/v1.js');

@Component({
  selector: 'page-cards',
  templateUrl: 'home.html',
  providers: [ClimaService, Platform]
})

export class HomePage {
  datosClima: any;
  watson: any;
  enterDetected = false;

  latitudActual: any;
  longitudActual: any;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public climaService: ClimaService,
    public platform: Platform,
    private geolocation: Geolocation
  ) {
    /*this.watson = new Watson({
      username: '1583e851-63d6-4689-9bce-8ac4d3b6583a',
      password: 'WdaKCf8xFsEh',
      version: 'v1',
      path: { workspace_id: 'e3183c7a-3790-4efd-9ac2-deb7740f4044' },
      version_date: '2017-05-26'
    });
    this.watson.message({}, processResponse);

    // Process the conversation response.
    function processResponse(err, response) {
      if (err) {
        console.error(err); // something went wrong
        return;
      }
      // Display the output from dialog, if any.
      if (response.output.text.length != 0) {
          console.log(response.output.text[0]);
      }
    }*/

    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitudActual =resp.coords.latitude;
      this.longitudActual=resp.coords.longitude;
      console.log(resp);
     }).catch((error) => {
       console.log('Error getting location', error);
     });

     //let watch = this.geolocation.watchPosition();
     //watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
     //});
  }

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }


  goToDetalleCima(ciudad : string){
    if(ciudad.length>0){
    this.navCtrl.push(DetalleClimaPage,{
      datos : this.datosClima
    });
    }
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
      this.showFullInfo(nuevoClima);

      this.datosClima = null;
      //console.log(this.datosClima.display_location.city);
      //console.log(this.datosClima);
    }

    if(this.latitudActual!= null){
      this.callWeatherApiLatLong(this.latitudActual, this.longitudActual);
      if(this.datosClima != null){
      let nuevoClima = new TarjetaModel(
        this.datosClima.display_location.full,
        this.datosClima.feelslike_c,
        this.datosClima.image.url,
        this.datosClima.precip_today_metric,
        this.datosClima.relative_humidity,
        this.datosClima.wind_kph
      );
      this.showFullInfo(nuevoClima);
    }

      this.datosClima = null;
      this.latitudActual= null;
    }
  }
  showFullInfo(item: TarjetaModel){
    var modal = this.modalCtrl.create(AddTaskModalPage,item);
    modal.present();
  }

  callWeatherApi(ciudad : string){

    if(ciudad.length>0){
      this.climaService.buscarClima(ciudad).subscribe(
        (response) => console.log(this.datosClima = response['current_observation']),
        (error) => console.log(error),
      );
      /* if (this.datosClima != undefined && this.datosClima["current_observation"] != null){
        let info = this.datosClima["current_observation"];
        this.showFullInfo(
          new TarjetaModel(
          info.display_location.full,
          info.feelslike_c+"°C",
          "day-thunderstorm",
          info.precip_today_metric+"%",
          info.relative_humidity,
          info.wind_kph+"km/h"
        ));
      } */
    }
  }

  callWeatherApiLatLong(lat : string, long: string){
    this.climaService.buscarClimaCoord(lat, long).subscribe(
      (response) => console.log(this.datosClima = response['current_observation']),
      (error) => console.log(error),
    );
  }
}