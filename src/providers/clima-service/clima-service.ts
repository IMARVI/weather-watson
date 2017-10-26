import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {TarjetaModel} from '../../models/tarjeta-model'

//Sirve como un controlador, aqui se especifican
//metodos y se inyecta a la vista en este caso la home-page
@Injectable()
export class ClimaService {

  public cardItems: TarjetaModel[];
  datos: JSON;

  constructor(private http:Http) {
   this.getTarjetas();
  }

  getTarjetas(){
    this.cardItems = [
      new TarjetaModel("Ciudad de Mexico","23°","day-sunny","10%","50%","14km/h" ),
      new TarjetaModel("Pachuca de Soto","18°","day-rain","10%","50%","14km/h" ),
      new TarjetaModel("Guadalajara","27°","day-sleet","10%","50%","14km/h" ),
      new TarjetaModel("Aguascalientes","13°","day-thunderstorm","10%","50%","14km/h" )
    ];
  }

  addTarjeta(tarjeta:TarjetaModel){
    this.cardItems.push(tarjeta);
  }

  //https://www.wunderground.com/weather/api/d/docs?d=resources/code-samples&MR=1
  buscarClima(ciudad: string){
    return this.http.get("http://api.wunderground.com/api/261b9f4cf1ac1804/conditions/lang:SP/q/Mexico/"+ciudad+".json").map(
      (response: Response) => {
        this.datos = response.json();
        console.log(this.datos + "datos dentro de service");
        return this.datos;
      })
  }
}
