import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TarjetaModel } from '../../models/tarjeta-model'
import { TarjetaService } from '../../providers/tarjeta-service/tarjeta-service';
import { AddTaskModalPage } from '../add-task-modal/add-task-modal';
var Watson = require ('../../../node_modules/watson-developer-cloud/conversation/v1.js');

@Component({
  selector: 'page-cards',
  templateUrl: 'home.html',
  //Este service es unico para la home-page
  //si quieres hacerlo global lo pones en app.module
  providers: [TarjetaService, Platform]
})

export class HomePage {
  datosClima: any[];
  watson: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public tarjetaService: TarjetaService,
    public platform: Platform
  ) {
    this.watson = new Watson({
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
    }
  }

  goTologin(){
    this.navCtrl.push(LoginPage);
  }

  showFullInfo(item: TarjetaModel){
    var modal = this.modalCtrl.create(AddTaskModalPage,item);
    modal.present();
  }

  callWeatherApi(ciudad : string){

    if(ciudad.length>0){
      this.tarjetaService.buscarClima(ciudad).subscribe(
        (response) => this.datosClima = response),
        (error) => console.log(error);
      //console.log(this.datosClima);

      if (this.datosClima != undefined  && this.datosClima["response.error"] != null){
        console.log("dentro del error")
      }
      if (this.datosClima != undefined && this.datosClima["current_observation"] != null){
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
      }
    }
  }
}
