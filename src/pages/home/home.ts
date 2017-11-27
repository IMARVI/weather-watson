import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Platform , ViewController} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { LoginPage } from '../login/login';

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
  wText: string;
  wOps = false;

  wResponse: any;

  ciudadesUsr = false;
  ciudades: JSON[];
  differ: any;

  id: string;
  data: any;

  latitudActual: any;
  longitudActual: any;


  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public climaService: ClimaService,
    public watsonService: WatsonService,
    public platform: Platform,
    private geolocation: Geolocation,
    private navParams : NavParams,
    private viewCtrl: ViewController
  ) {
    this.id = navParams.get('id');
    this.data = navParams.get('data');
    console.log(this.data);
    climaService.ciudadesFav(this.id);
    this.wText = "Bienvenido "+this.data.nombre;

  }

  showChatOps(bol:boolean){
    this.wOps = !this.wOps;
  }

  goToLogin(){
    this.id = null;
    this.navCtrl.push(LoginPage);
  }

  ngDoCheck() {

    if(this.datosClima != null){
      let nuevoClima = new TarjetaModel(
        this.datosClima.location.city + ", " + this.datosClima.location.region ,
        this.datosClima.item.condition.temp + "º",
        this.datosClima.item.condition.code,
        this.datosClima.atmosphere.pressure + " " + this.datosClima.units.pressure ,
        this.datosClima.atmosphere.humidity + "%",
        this.datosClima.wind.speed + " " + this.datosClima.units.speed,
        this.datosClima.item.forecast,
        this.datosClima.astronomy.sunrise,
        this.datosClima.astronomy.sunset
      );
      this.showFullInfo(nuevoClima, true);
      this.datosClima = null;
    }

    if(this.latitudActual!= null){
      this.callWeatherApiLatLong(this.latitudActual, this.longitudActual);
      if(this.datosClima != null){
      let nuevoClima = new TarjetaModel(
        this.datosClima.location.city + ", " + this.datosClima.location.region ,
        this.datosClima.item.condition.temp + " º" + this.datosClima.units.temperature,
        this.datosClima.item.condition.code,
        this.datosClima.atmosphere.pressure + " " + this.datosClima.units.pressure ,
        this.datosClima.atmosphere.humidity,
        this.datosClima.wind.speed + " " + this.datosClima.units.speed,
        this.datosClima.item.forecast,
        this.datosClima.astronomy.sunrise,
        this.datosClima.astronomy.sunset
      );
      this.showFullInfo(nuevoClima, true);
    }

      this.datosClima = null;
      this.latitudActual= null;
    }

    if(this.wResponse != undefined ){

      //Clima de mi ubicacion
      if(this.wResponse.entities.length==0 &&
      this.wResponse.intents[0].intent == "GiveMeWeatherToday"){
        this.geolocation.getCurrentPosition().then((resp) => {
          this.latitudActual =resp.coords.latitude;
          this.longitudActual=resp.coords.longitude;
         }).catch((error) => {
           console.log('Error getting location', error);
         });
      }

      //Clima de alguna ciudad
      if(this.wResponse.entities.length>0 && this.wResponse.intents[0].intent != "Addcity"){
        var ciudad =this.wResponse.entities[0].value;
        //console.log(ciudad);
        this.callWeatherApi(ciudad);
      }

        //saludando a weather-api
      if(this.wResponse.entities.length==0 && this.wResponse.intents[0].intent == "Greetings"){
          this.wText = this.wResponse.output.text[0];
          //.output.text[0]
        }

        //no se encontro nada
      if(this.wResponse.entities.length==0 && this.wResponse.intents[0].intent == "AnythingElse"){
        this.wText = this.wResponse.output.text[0];
      }

      //agregar ciudad desde chatbot
      if(this.wResponse.entities.length>0 && this.wResponse.intents[0].intent == "Addcity"){
        var city =this.wResponse.entities[0].value;
        console.log(this.ciudades);
        this.climaService.agregarCiudadWatson(city,this.id, this.ciudades);
        console.log(city);
      }

      this.wResponse = undefined;

    }

    if(this.climaService.userdb!= undefined){
      this.ciudadesUsr = true;

      if(this.climaService.userdb instanceof Array){
      this.ciudades = this.climaService.userdb;

      }else{
        this.ciudades = [];
        this.ciudades.push(this.climaService.userdb);
      }
    }


  }

  showFullInfo(item: TarjetaModel, agregar: boolean){
    var modal = this.modalCtrl.create(AddTaskModalPage,{
      item:item,
      agregar:agregar,
      id:this.id,
      ciudades:this.ciudades,
      data:this.data
    });
    modal.present();
    this.climaService.ciudadesFav(this.id);
    this.ciudades = null;
  }

  showFullInfo2(item: any, agregar: boolean){
    let nuevoClima = new TarjetaModel(
      item.location.city+", "+ item.location.region,
      item.item.condition.temp + "º",
      item.item.condition.code,
      item.atmosphere.pressure + " " + item.units.pressure ,
      item.atmosphere.humidity + "%",
      item.wind.speed + " " + item.units.speed,
      item.item.forecast,
      item.astronomy.sunrise,
      item.astronomy.sunset
    );
    var modal = this.modalCtrl.create(AddTaskModalPage,{item:nuevoClima,agregar:agregar,id:this.id, ciudades:this.ciudades,data:this.data});
    modal.present();
    this.climaService.ciudadesFav(this.id);
    this.ciudades = null;
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

  watsonConversation(mensaje:string){
    this.watsonService.mensaje(mensaje).subscribe(
      (response) => console.log(this.wResponse = response.json()),
      (error) => console.log(error)
    );

  }
}
