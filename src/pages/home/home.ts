import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TarjetaModel } from '../../models/tarjeta-model'
import { TarjetaService } from '../../providers/tarjeta-service/tarjeta-service';
import { AddTaskModalPage } from '../add-task-modal/add-task-modal'
@Component({
  selector: 'page-cards',
  templateUrl: 'home.html',
  //Este service es unico para la home-page
  //si quieres hacerlo global lo pones en app.module
  providers: [TarjetaService, Platform]
})

export class HomePage {
  datos: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public tarjetaService: TarjetaService,
    public platform: Platform
  ) {}

  goTologin(){
    this.navCtrl.push(LoginPage);
  }

  showFullInfo(item: TarjetaModel){
    var modal = this.modalCtrl.create(AddTaskModalPage,item);
    modal.present();
  }

  callWeatherApi(ciudad : string){

    if(ciudad.length>0){
      this.tarjetaService.buscarClima(ciudad)
      .subscribe(data => this.datos= data);
      console.log(this.datos);

      if (this.datos != undefined  && this.datos.response.error != null){
        console.log("dentro del error")
      }

      if (this.datos != undefined && this.datos.current_observation != null){
        let info = this.datos.current_observation;
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
