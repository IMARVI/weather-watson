import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { TarjetaModel } from '../../models/tarjeta-model'
import 'rxjs/Rx';

//Sirve como un controlador, aqui se especifican
//metodos y se inyecta a la vista en este caso la home-page
@Injectable()
export class ClimaService {

  public cardItems: any[];
  datos: JSON;
  userdb: JSON;
  cf:any[];

  constructor(private http:Http) {
   this.getTarjetas();
  }

  ciudadesFav(id:string){
    let promise = new Promise((resolve, reject) => {
      var header = new Headers({"Accept": "application/json" });
      let apiURL = 'http://localhost:3000/api/Usuarios/'+id;
      this.http.get(apiURL,{headers:header})
          .toPromise()
          .then(
              res => { // Success
                this.cf = res.json().ciudadesFav;
                var str = '' ;
                for(var i = 0; i < this.cf.length; i++){
                  str+='"'+this.cf[i]+'",';
               }
               str = str.slice(0, -1);
                this.getCf(str);
                resolve();
              },
              msg => { // Error
                reject(msg);
              }
          );
    });
  }

  getCf(str:string){
    this.buscarClimas(str).subscribe(
      (response) => this.userdb = response,
      (error) => console.log(error)
    );;
  }

  getTarjetas(){
    let promise = new Promise((resolve, reject) => {
      let apiURL = '../../assets/jsons/datos.json';
      this.http.get(apiURL)
          .toPromise()
          .then(
              res => { // Success
                this.cardItems = res.json();
                resolve();
              },
              msg => { // Error
                reject(msg);
              }
          );
    });
    return promise;
  }

  addTarjeta(tarjeta:TarjetaModel){
    this.cardItems.push(tarjeta);
  }


  buscarClima(ciudad: string){
    let query: string = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"+ ciudad +"%22)%20and%20u%3D%27c%27&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    return this.http.get(query).map(
      (response: Response) => {
        this.datos = response.json().query.results.channel;
        return this.datos;
      })
  }

  buscarClimas(ciudades: string){
    let query: string = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%20in%20("+ciudades+"))%20and%20u%3D%27c%27&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    return this.http.get(query).map(
      (response: Response) => {
        this.datos = response.json().query.results.channel;
        return this.datos;
      })
  }

  buscarClimaCoord(lat: string, long: string){
    let query: string = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(SELECT%20woeid%20FROM%20geo.places%20WHERE%20text%3D%22(" + lat + "%2C" + long + ")%22)%20and%20u%3D%27c%27&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    return this.http.get(query).map(
      (response: Response) => {
        this.datos = response.json().query.results.channel;
        return this.datos;
      })
  }
}
