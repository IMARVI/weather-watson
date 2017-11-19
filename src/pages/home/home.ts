import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { LoginPage } from '../login/login';
import { DetalleClimaPage } from '../detalle-clima/detalle-clima';

import { TarjetaModel } from '../../models/tarjeta-model'
import { ClimaService } from '../../providers/clima-service/clima-service';
import { WatsonService } from '../../providers/watson-service/watson-service';

import { AddTaskModalPage } from '../add-task-modal/add-task-modal';

@Component({
  selector: 'page-cards',
  templateUrl: 'home.html',
  providers: [ClimaService, Platform, WatsonService]
})

export class HomePage {
  datosClima: any;
  enterDetected = false;

  ciudadesUsr = false;
  ciudades: any;
  id: string;

  latitudActual: any;
  longitudActual: any;


  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public climaService: ClimaService,
    public watsonService: WatsonService,
    public platform: Platform,
    private geolocation: Geolocation,
    private navParams : NavParams
  ) {
    this.id = navParams.get('id');
    climaService.ciudadesFav(this.id);

    watsonService.mensaje("hi");

    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitudActual =resp.coords.latitude;
      this.longitudActual=resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });


  }

  goToLogin(){
    this.id = null;
    this.navCtrl.push(LoginPage);
  }

  ngDoCheck() {
    if(this.climaService.userdb!= undefined){
    this.ciudadesUsr = true;
    this.ciudades = this.climaService.userdb;
  }

    if(this.datosClima != null){
      let nuevoClima = new TarjetaModel(
        this.datosClima.location.city + ", " + this.datosClima.location.region ,
        this.datosClima.item.condition.temp + "º " + this.datosClima.units.temperature,
        this.datosClima.item.condition.code,
        this.datosClima.atmosphere.pressure + " " + this.datosClima.units.pressure ,
        this.datosClima.atmosphere.humidity + "%",
        this.datosClima.wind.speed + " " + this.datosClima.units.speed
      );
      this.showFullInfo(nuevoClima, true);
      this.datosClima = null;

    }

    if(this.latitudActual!= null){
      this.callWeatherApiLatLong(this.latitudActual, this.longitudActual);
      if(this.datosClima != null){
      let nuevoClima = new TarjetaModel(
        this.datosClima.location.city + ", " + this.datosClima.location.region ,
        this.datosClima.item.condition.temp + " " + this.datosClima.units.temperature,
        this.datosClima.item.condition.code,
        this.datosClima.atmosphere.pressure + " " + this.datosClima.units.pressure ,
        this.datosClima.atmosphere.humidity,
        this.datosClima.wind.speed + " " + this.datosClima.units.speed
      );
      this.showFullInfo(nuevoClima, true);
    }

      this.datosClima = null;
      this.latitudActual= null;
    }
    if(this.ciudadesUsr != null){
    }
  }

  showFullInfo(item: TarjetaModel, agregar: boolean){
    var modal = this.modalCtrl.create(AddTaskModalPage,{item:item,agregar:agregar});
    modal.present();
  }

  callWeatherApi(ciudad : string){

    if(ciudad.length>0){
      this.climaService.buscarClima(ciudad).subscribe(
        (response) => this.datosClima = response,
        (error) => console.log(error)
      );

    }
  }

  callWeatherApiLatLong(lat : string, long: string){
    this.climaService.buscarClimaCoord(lat, long).subscribe(
      (response) => this.datosClima = response,
      (error) => console.log(error),
    );
  }
}
