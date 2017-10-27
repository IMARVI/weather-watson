import { Injectable } from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {TarjetaModel} from '../../models/tarjeta-model'
import 'rxjs/Rx';

//Sirve como un controlador, aqui se especifican
//metodos y se inyecta a la vista en este caso la home-page
@Injectable()
export class ClimaService {

  public cardItems: any[];
  datos: JSON;

  constructor(private http:Http) {
   this.getTarjetas();
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



  //https://www.wunderground.com/weather/api/d/docs?d=resources/code-samples&MR=1
  buscarClima(ciudad: string){
    return this.http.get("http://api.wunderground.com/api/261b9f4cf1ac1804/conditions/lang:SP/q/"+ciudad+".json").map(
      (response: Response) => {
        this.datos = response.json();
        return this.datos;
      })
  }

  buscarClimaCoord(lat: string, long: string){
    return this.http.get("http://api.wunderground.com/api/261b9f4cf1ac1804/conditions/lang:SP/q/"+lat+","+long+".json").map(
      (response: Response) => {
        this.datos = response.json();
        return this.datos;
      })
  }
}
