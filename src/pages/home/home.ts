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

  ciudadesUsr = false;
  id: string;
  latitudActual: any;
  longitudActual: any;
  ciudades: any;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public climaService: ClimaService,
    public platform: Platform,
    private geolocation: Geolocation,
    private navParams : NavParams
  ) {
    this.id = navParams.get('id');
    console.log(this.id);
    climaService.ciudadesFav(this.id);
    //console.log(this.climaService.userdb);
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
      //console.log(resp);
     }).catch((error) => {
       console.log('Error getting location', error);
     });


  }

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

  ngDoCheck() {
    //climaService.userdb.usr[0]['ciudadesFav']
    if(this.climaService.userdb!= undefined){
    this.ciudadesUsr = true;
    this.ciudades = this.climaService.userdb['ciudadesFav'];
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
